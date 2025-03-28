import type { Plugin } from '@pdfme/common';
import { pdfRender } from './pdfRender.js';
import { propPanel } from './propPanel.js';
import { uiRender } from './uiRender.js';
import type { TextThresholdSchema } from './types.js';
import { TextCursorInput } from 'lucide';
import { createSvgStr } from '../utils.js';

const textThresholdSchema: Plugin<TextThresholdSchema> = {
  pdf: pdfRender,
  ui: uiRender,
  propPanel,
  icon: createSvgStr(TextCursorInput),
};

export default textThresholdSchema;
