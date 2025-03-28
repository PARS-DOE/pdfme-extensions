import type { Plugin } from '@pdfme/common';
import { pdfRender } from './pdfRender.js';
import { propPanel } from './propPanel.js';
import { uiRender } from './uiRender.js';
import type { ProgressBarSchema } from './types.js';
import { BarChart } from 'lucide';
import { createSvgStr } from '../utils.js';

const progressBarSchema: Plugin<ProgressBarSchema> = {
  pdf: pdfRender,
  ui: uiRender,
  propPanel,
  icon: createSvgStr(BarChart),
};

export default progressBarSchema;
