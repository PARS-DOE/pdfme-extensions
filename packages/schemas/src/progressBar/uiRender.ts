import { UIRenderProps } from '@pdfme/common';
import type { ProgressBarSchema } from './types.js';
import {
  DEFAULT_BAR_COLOR,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_TEXT_COLOR,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_SHOW_PERCENTAGE
} from './constants.js';
import { isEditable } from '../utils.js';

export const uiRender = async (props: UIRenderProps<ProgressBarSchema>) => {
  const { schema, value, onChange, rootElement, mode } = props;
  
  // Get values or use defaults
  const percentage = Math.min(Math.max(parseFloat(value) || 0, 0), 100);
  const barColor = schema.barColor || DEFAULT_BAR_COLOR;
  const backgroundColor = schema.backgroundColor || DEFAULT_BACKGROUND_COLOR;
  const showPercentage = schema.showPercentage !== false;
  const textColor = schema.textColor || DEFAULT_TEXT_COLOR;
  const borderRadius = schema.borderRadius || DEFAULT_BORDER_RADIUS;
  
  // Create container
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.position = 'relative';
  container.style.backgroundColor = backgroundColor;
  container.style.borderRadius = `${borderRadius}px`;
  container.style.overflow = 'hidden';
  
  // Create progress bar
  const bar = document.createElement('div');
  bar.style.width = `${percentage}%`;
  bar.style.height = '100%';
  bar.style.backgroundColor = barColor;
  bar.style.position = 'absolute';
  bar.style.left = '0';
  bar.style.top = '0';
  bar.style.transition = 'width 0.3s ease';
  container.appendChild(bar);
  
  // Create percentage text if enabled
  let textElement: HTMLDivElement | null = null;
  if (showPercentage) {
    textElement = document.createElement('div');
    textElement.textContent = `${Math.round(percentage)}%`;
    textElement.style.position = 'absolute';
    textElement.style.left = '0';
    textElement.style.top = '0';
    textElement.style.width = '100%';
    textElement.style.height = '100%';
    textElement.style.display = 'flex';
    textElement.style.alignItems = 'center';
    textElement.style.justifyContent = 'center';
    textElement.style.color = textColor;
    textElement.style.fontWeight = 'bold';
    textElement.style.fontSize = `${Math.min(schema.height * 0.7, schema.width / 5)}px`;
    container.appendChild(textElement);
  }
  
  // If in form or designer mode and not readonly, make it interactive
  if (isEditable(mode, schema)) {
    // Create input for editing
    const input = document.createElement('input');
    input.type = 'range';
    input.min = '0';
    input.max = '100';
    input.value = percentage.toString();
    input.style.position = 'absolute';
    input.style.width = '100%';
    input.style.height = '100%';
    input.style.opacity = '0';
    input.style.cursor = 'pointer';
    
    // Update value when input changes
    input.addEventListener('input', (e) => {
      const newValue = (e.target as HTMLInputElement).value;
      bar.style.width = `${newValue}%`;
      if (showPercentage && textElement) {
        textElement.textContent = `${Math.round(parseFloat(newValue))}%`;
      }
      onChange?.({ key: 'content', value: newValue });
    });
    
    container.appendChild(input);
  }
  
  rootElement.appendChild(container);
};
