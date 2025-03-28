import { PropPanel } from '@pdfme/common';
import type { ProgressBarSchema } from './types.js';
import {
  DEFAULT_BAR_COLOR,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_TEXT_COLOR,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_SHOW_PERCENTAGE
} from './constants.js';
import { DEFAULT_OPACITY, HEX_COLOR_PATTERN } from '../constants.js';

export const propPanel: PropPanel<ProgressBarSchema> = {
  schema: ({ i18n }) => ({
    barColor: {
      title: i18n('schemas.color') || 'Bar Color',
      type: 'string',
      widget: 'color',
      props: {
        disabledAlpha: true,
      },
      required: true,
      rules: [{ pattern: HEX_COLOR_PATTERN, message: i18n('validation.hexColor') }],
    },
    backgroundColor: {
      title: i18n('schemas.bgColor') || 'Background Color',
      type: 'string',
      widget: 'color',
      props: {
        disabledAlpha: true,
      },
      required: true,
      rules: [{ pattern: HEX_COLOR_PATTERN, message: i18n('validation.hexColor') }],
    },
    showPercentage: {
      title: 'Show Percentage',
      type: 'boolean',
      widget: 'switch',
    },
    textColor: {
      title: i18n('schemas.textColor') || 'Text Color',
      type: 'string',
      widget: 'color',
      props: {
        disabledAlpha: true,
      },
      required: true,
      rules: [{ pattern: HEX_COLOR_PATTERN, message: i18n('validation.hexColor') }],
      hidden: '{{!showPercentage}}',
    },
    borderRadius: {
      title: 'Border Radius',
      type: 'number',
      widget: 'inputNumber',
      props: { min: 0, max: 20 },
    },
  }),
  defaultSchema: {
    name: '',
    type: 'progressBar',
    content: '50',  // Default to 50%
    position: { x: 0, y: 0 },
    width: 150,
    height: 20,
    rotate: 0,
    barColor: DEFAULT_BAR_COLOR,
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    showPercentage: DEFAULT_SHOW_PERCENTAGE,
    textColor: DEFAULT_TEXT_COLOR,
    borderRadius: DEFAULT_BORDER_RADIUS,
    opacity: DEFAULT_OPACITY,
  },
};
