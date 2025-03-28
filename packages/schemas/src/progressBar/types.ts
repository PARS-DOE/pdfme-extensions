import type { Schema } from '@pdfme/common';

export interface ProgressBarSchema extends Schema {
  barColor: string;
  backgroundColor: string;
  showPercentage: boolean;
  textColor: string;
  borderRadius: number;
}
