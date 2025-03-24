# PDFme Extensions Technical Context

## Technologies Used

### Core Technologies
- **TypeScript**: The project will be developed in TypeScript for type safety and better developer experience
- **pdf-lib**: Used for PDF rendering in PDFme and will be used in our custom schemas
- **form-render**: Used for property panel rendering in PDFme's Designer component
- **Node.js**: Runtime environment for development and building
- **npm/yarn**: Package management

### PDFme Ecosystem
- **@pdfme/common**: Common types and utilities used across PDFme packages
- **@pdfme/generator**: PDF generation functionality
- **@pdfme/ui**: UI components for template design and form filling
- **@pdfme/schemas**: Core schemas (text, image, barcodes) that we'll be extending

## Development Setup

### Environment Requirements
- Node.js (LTS version recommended)
- npm or yarn
- Git

### Project Structure
```
pdfme-extensions/
├── dist/               # Compiled output
├── src/                # Source code
│   ├── schemas/        # Individual schema implementations
│   │   ├── signature/  # Signature schema
│   │   ├── rating/     # Rating schema
│   │   └── ...         # Other schemas
│   ├── utils/          # Utility functions
│   └── index.ts        # Main entry point
├── examples/           # Example usage
├── tests/              # Test suite
├── memory-bank/        # Project documentation
└── package.json        # Project configuration
```

### Build System
- **TypeScript**: For transpilation
- **Rollup/esbuild**: For bundling (to be determined)
- **Jest**: For testing
- **ESLint**: For code linting
- **Prettier**: For code formatting

## Technical Constraints

### PDFme Plugin Architecture
- Must conform to PDFme's plugin structure:
  - pdf: Renderer for PDF generation using pdf-lib
  - ui: Renderer for DOM with different modes (viewer, form, designer)
  - propPanel: Property configuration panel for Designer

### Browser Compatibility
- Must support the same browsers as PDFme (modern browsers, IE11 not required)

### Bundle Size
- Schemas should be individually importable to minimize bundle size impact
- Consider code splitting and tree-shaking compatibility

### Performance
- PDF rendering should be optimized for performance
- Consider caching for expensive operations (similar to barcode rendering in PDFme)

## Dependencies

### Production Dependencies
- **@pdfme/common**: For type definitions and utilities
- **pdf-lib**: For PDF rendering
- Schema-specific dependencies (e.g., signature-pad for signature schema)

### Peer Dependencies
- **@pdfme/generator**: When used with Generator
- **@pdfme/ui**: When used with UI components

### Development Dependencies
- **TypeScript**: For type-checking and transpilation
- **Rollup/esbuild**: For bundling
- **Jest**: For testing
- **ESLint**: For linting
- **Prettier**: For formatting

## API Design

### Schema Interface
Each schema will implement the Plugin interface from @pdfme/common:

```typescript
interface Plugin {
  pdf: PDFRenderer;
  ui: UIRenderer;
  propPanel?: PropPanel;
}

interface PDFRenderer {
  render: (schema: Schema, options: RenderOptions) => Promise<void>;
}

interface UIRenderer {
  render: (schema: Schema, options: UIRenderOptions) => HTMLElement;
}

interface PropPanel {
  defaultSchema: Schema;
  schema: JSONSchema;
  uiSchema?: UISchema;
  widgets?: Record<string, Widget>;
}
```

### Export Structure
The package will export each schema individually for tree-shaking:

```typescript
// Example export structure
export { signature } from './schemas/signature';
export { rating } from './schemas/rating';
// ...
```

## Integration Points

### With PDFme Generator
```typescript
import { generate } from '@pdfme/generator';
import { text } from '@pdfme/schemas';
import { signature } from '@pdfme/extensions';

const pdf = await generate({
  template,
  inputs,
  plugins: {
    text,
    signature,
  },
});
```

### With PDFme UI
```typescript
import { Designer } from '@pdfme/ui';
import { text } from '@pdfme/schemas';
import { signature } from '@pdfme/extensions';

const designer = new Designer({
  domContainer,
  template,
  plugins: {
    text,
    signature,
  },
});