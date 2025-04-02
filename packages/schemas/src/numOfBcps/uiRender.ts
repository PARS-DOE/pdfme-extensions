import type * as CSS from 'csstype';
import type { Font as FontKitFont } from 'fontkit';
import { UIRenderProps, getDefaultFont } from '@pdfme/common';
import type { NumOfBcpsSchema } from './types.js';
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_ALIGNMENT,
  VERTICAL_ALIGN_TOP,
  VERTICAL_ALIGN_MIDDLE,
  VERTICAL_ALIGN_BOTTOM,
  DEFAULT_VERTICAL_ALIGNMENT,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_CHARACTER_SPACING,
  DEFAULT_FONT_COLOR,
  PLACEHOLDER_FONT_COLOR,
  BCP_POSITIVE_BACKGROUND_COLOR,
  BCP_NEGATIVE_BACKGROUND_COLOR,
} from './constants.js';
import {
  calculateDynamicFontSize,
  getFontKitFont,
  getBrowserVerticalFontAdjustments,
  isFirefox,
  checkBcps,
  formatBcpText,
} from './helper.js';
import { isEditable } from '../utils.js';

const replaceUnsupportedChars = (text: string, fontKitFont: FontKitFont): string => {
  const charSupportCache: { [char: string]: boolean } = {};

  const isCharSupported = (char: string): boolean => {
    if (char in charSupportCache) {
      return charSupportCache[char];
    }
    const isSupported = fontKitFont.hasGlyphForCodePoint(char.codePointAt(0) || 0);
    charSupportCache[char] = isSupported;
    return isSupported;
  };

  const segments = text.split(/(\r\n|\n|\r)/);

  return segments
    .map((segment) => {
      if (/\r\n|\n|\r/.test(segment)) {
        return segment;
      }

      return segment
        .split('')
        .map((char) => {
          if (/\s/.test(char) || char.charCodeAt(0) < 32) {
            return char;
          }

          return isCharSupported(char) ? char : '〿';
        })
        .join('');
    })
    .join('');
};

export const uiRender = async (arg: UIRenderProps<NumOfBcpsSchema>) => {
  const { schema, mode, tabIndex, options, _cache } = arg;
  
  const font = options?.font || getDefaultFont();
  const fontKitFont = await getFontKitFont(
    schema.fontName,
    font,
    _cache as Map<string, import('fontkit').Font>,
  );
  
  // Get variables from options if available
  const inputs = options?.inputs as Array<Record<string, string>> | undefined;
  const variables = inputs && inputs.length > 0 ? inputs[0] : undefined;
  
  // Get the value from the schema content or default to empty string
  const value = schema.content || '';
  
  // Format the display text based on BCP count
  const displayText = formatBcpText(value, variables, schema.bcpField);
  
  // Determine background color based on BCP count
  const { hasBcps } = checkBcps(value, variables, schema.bcpField);
  const bgColor = hasBcps ? BCP_POSITIVE_BACKGROUND_COLOR : BCP_NEGATIVE_BACKGROUND_COLOR;
  
  const textBlock = buildStyledTextContainer(
    arg,
    fontKitFont,
    displayText,
    bgColor,
  );

  const processedText = replaceUnsupportedChars(displayText, fontKitFont);

  if (!isEditable(mode, schema)) {
    // Read-only mode
    textBlock.innerHTML = processedText
      .split('')
      .map(
        (l, i) =>
          `<span style="letter-spacing:${
            processedText.length === i + 1 ? 0 : 'inherit'
          };">${l}</span>`,
      )
      .join('');
    return;
  }

  makeElementPlainTextContentEditable(textBlock);
  textBlock.tabIndex = tabIndex || 0;
  textBlock.innerText = mode === 'designer' ? displayText : processedText;

  if (schema.dynamicFontSize) {
    let dynamicFontSize: undefined | number = undefined;

    textBlock.addEventListener('keyup', () => {
      setTimeout(() => {
        // Use a regular function instead of an async one since we don't need await
        (() => {
          if (!textBlock.textContent) return;
          dynamicFontSize = calculateDynamicFontSize({
            textSchema: schema,
            fontKitFont,
            value: textBlock.textContent,
            startingFontSize: dynamicFontSize,
          });
          textBlock.style.fontSize = `${dynamicFontSize}pt`;

          const { topAdj: newTopAdj, bottomAdj: newBottomAdj } = getBrowserVerticalFontAdjustments(
            fontKitFont,
            dynamicFontSize ?? schema.fontSize ?? DEFAULT_FONT_SIZE,
            schema.lineHeight ?? DEFAULT_LINE_HEIGHT,
            schema.verticalAlignment ?? DEFAULT_VERTICAL_ALIGNMENT,
          );
          textBlock.style.paddingTop = `${newTopAdj}px`;
          textBlock.style.marginBottom = `${newBottomAdj}px`;
        })();
      }, 0);
    });
  }

  if (mode === 'designer') {
    setTimeout(() => {
      textBlock.focus();
      // Set the focus to the end of the editable element when you focus, as we would for a textarea
      const selection = window.getSelection();
      const range = document.createRange();
      if (selection && range) {
        range.selectNodeContents(textBlock);
        range.collapse(false); // Collapse range to the end
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    });
  }
};

export const buildStyledTextContainer = (
  arg: UIRenderProps<NumOfBcpsSchema>,
  fontKitFont: FontKitFont,
  value: string,
  backgroundColor: string,
) => {
  const { schema, rootElement, mode } = arg;

  let dynamicFontSize: undefined | number = undefined;

  if (schema.dynamicFontSize && value) {
    dynamicFontSize = calculateDynamicFontSize({
      textSchema: schema,
      fontKitFont,
      value,
      startingFontSize: dynamicFontSize,
    });
  }

  // Depending on vertical alignment, we need to move the top or bottom of the font to keep
  // it within it's defined box and align it with the generated pdf.
  const { topAdj, bottomAdj } = getBrowserVerticalFontAdjustments(
    fontKitFont,
    dynamicFontSize ?? schema.fontSize ?? DEFAULT_FONT_SIZE,
    schema.lineHeight ?? DEFAULT_LINE_HEIGHT,
    schema.verticalAlignment ?? DEFAULT_VERTICAL_ALIGNMENT,
  );

  const topAdjustment = topAdj.toString();
  const bottomAdjustment = bottomAdj.toString();

  const container = document.createElement('div');

  const containerStyle: CSS.Properties = {
    padding: 0,
    resize: 'none',
    backgroundColor: backgroundColor,
    border: '2px solid #000000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: mapVerticalAlignToFlex(schema.verticalAlignment),
    width: '100%',
    height: '100%',
    cursor: isEditable(mode, schema) ? 'text' : 'default',
  };
  Object.assign(container.style, containerStyle);
  rootElement.innerHTML = '';
  rootElement.appendChild(container);

  // text decoration
  const textDecorations = [];
  if (schema.strikethrough) textDecorations.push('line-through');
  if (schema.underline) textDecorations.push('underline');

  const textBlockStyle: CSS.Properties = {
    // Font formatting styles
    fontFamily: schema.fontName ? `'${schema.fontName}'` : 'inherit',
    color: schema.fontColor ? schema.fontColor : DEFAULT_FONT_COLOR,
    fontSize: `${dynamicFontSize ?? schema.fontSize ?? DEFAULT_FONT_SIZE}pt`,
    letterSpacing: `${schema.characterSpacing ?? DEFAULT_CHARACTER_SPACING}pt`,
    lineHeight: `${schema.lineHeight ?? DEFAULT_LINE_HEIGHT}em`,
    textAlign: schema.alignment ?? DEFAULT_ALIGNMENT,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    // Block layout styles
    resize: 'none',
    border: 'none',
    outline: 'none',
    marginBottom: `${bottomAdjustment}px`,
    paddingTop: `${topAdjustment}px`,
    backgroundColor: 'transparent',
    textDecoration: textDecorations.join(' '),
  };

  const textBlock = document.createElement('div');
  textBlock.id = 'text-' + String(schema.id);
  Object.assign(textBlock.style, textBlockStyle);

  container.appendChild(textBlock);

  return textBlock;
};

/**
 * Firefox doesn't support 'plaintext-only' contentEditable mode, which we want to avoid mark-up.
 * This function adds a workaround for Firefox to make the contentEditable element behave like 'plaintext-only'.
 */
export const makeElementPlainTextContentEditable = (element: HTMLElement) => {
  if (!isFirefox()) {
    element.contentEditable = 'plaintext-only';
    return;
  }

  element.contentEditable = 'true';
  element.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.execCommand('insertLineBreak', false, undefined);
    }
  });

  element.addEventListener('paste', (e: ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData?.getData('text');
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(paste || ''));
    selection.collapseToEnd();
  });
};

export const mapVerticalAlignToFlex = (verticalAlignmentValue: string | undefined) => {
  switch (verticalAlignmentValue) {
    case VERTICAL_ALIGN_TOP:
      return 'flex-start';
    case VERTICAL_ALIGN_MIDDLE:
      return 'center';
    case VERTICAL_ALIGN_BOTTOM:
      return 'flex-end';
  }
  return 'flex-start';
};
