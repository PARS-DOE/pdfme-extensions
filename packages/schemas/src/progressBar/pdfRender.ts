import { PDFRenderProps } from '@pdfme/common';
import type { ProgressBarSchema } from './types.js';
import {
  DEFAULT_BAR_COLOR,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_TEXT_COLOR,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_SHOW_PERCENTAGE
} from './constants.js';
import { convertForPdfLayoutProps, hex2PrintingColor } from '../utils.js';

export const pdfRender = async (props: PDFRenderProps<ProgressBarSchema>) => {
  const { value, pdfDoc, pdfLib, page, options, schema } = props;
  
  // Get values or use defaults
  const percentage = Math.min(Math.max(parseFloat(value) || 0, 0), 100);
  const barColor = schema.barColor || DEFAULT_BAR_COLOR;
  const backgroundColor = schema.backgroundColor || DEFAULT_BACKGROUND_COLOR;
  const showPercentage = schema.showPercentage !== false;
  const textColor = schema.textColor || DEFAULT_TEXT_COLOR;
  const borderRadius = schema.borderRadius || DEFAULT_BORDER_RADIUS;
  const { colorType } = options;
  
  // Calculate dimensions
  const pageHeight = page.getHeight();
  const {
    width,
    height,
    rotate,
    position: { x, y },
    opacity,
  } = convertForPdfLayoutProps({ schema, pageHeight });
  
  // Draw background
  page.drawRectangle({
    x,
    y,
    width,
    height,
    color: hex2PrintingColor(backgroundColor, colorType),
    opacity,
    rotate,
  });
  
  // Draw progress bar
  if (percentage > 0) {
    const progressWidth = (width * percentage) / 100;
    page.drawRectangle({
      x,
      y,
      width: progressWidth,
      height,
      color: hex2PrintingColor(barColor, colorType),
      opacity,
      rotate,
    });
  }
  
  // Draw percentage text if enabled
  if (showPercentage) {
    const font = Object.entries(options.font || {}).find(([_, v]) => v.fallback)?.[0];
    if (font) {
      const pdfFont = await pdfDoc.embedFont(font);
      const fontSize = height * 0.7;
      const text = `${Math.round(percentage)}%`;
      const textWidth = pdfFont.widthOfTextAtSize(text, fontSize);
      
      page.drawText(text, {
        x: x + (width - textWidth) / 2,
        y: y + height / 2 - fontSize / 3,
        size: fontSize,
        font: pdfFont,
        color: hex2PrintingColor(textColor, colorType),
        opacity,
        rotate,
      });
    }
  }
};
