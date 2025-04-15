import { pdfRender } from './pdfRender.js';
import { propPanel } from './propPanel.js';
import { uiRender } from './uiRender.js';
import { TextCursorInput } from 'lucide';
import { createSvgStr } from '../utils.js';
const textThresholdSchema = {
    pdf: pdfRender,
    ui: uiRender,
    propPanel,
    icon: createSvgStr(TextCursorInput),
};
export default textThresholdSchema;
//# sourceMappingURL=index.js.map