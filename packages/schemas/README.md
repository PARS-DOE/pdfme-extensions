# @pars-doe/pdfme-extensions

## Overview

This package extends the schemas from [@pdfme/schemas](https://www.npmjs.com/package/@pdfme/schemas) with enhanced formatting capabilities for improved reporting and document generation. Developed by a team at the US Department of Energy primarily for internal reporting needs but published open-source for the community's benefit.

## Extensions and Enhancements

Our extensions focus on addressing limitations in the current PDFme schemas, particularly for reporting use cases:

### Enhanced Text Schema
- Conditional formatting based on field values
- Improved numerical formatting (currency, percentages)
- Border options for text elements

### Dedicated Label Schema
- Readonly by default (vs text where readonly is a toggle)
- More formatting options
- Optimized for display purposes

### Table Display Schema
- True table structures with aligned cells and borders
- Non-dynamic tables for display purposes
- Simplified layout for static content

### Conditional Elements
- Elements with conditional visibility
- Support for showing/hiding based on data values

## Usage

These schemas follow the same plugin architecture as the original PDFme library. You can use them as plugins in [@pdfme/ui](https://www.npmjs.com/package/@pdfme/ui) and [@pdfme/generator](https://www.npmjs.com/package/@pdfme/generator), where they are interpreted by UI components and the PDF generator.

### Installation

```bash
npm install @pars-doe/pdfme-extensions
```

### Using with Generator

```javascript
import type { Template } from '@pdfme/common';
import { text } from '@pdfme/schemas';
import { enhancedText, label, table } from '@pars-doe/pdfme-extensions';
import { generate } from '@pdfme/generator';

const template: Template = {
  // Your template using the extended schemas
};

const inputs = [
  // Your data inputs
];

const pdf = await generate({
  template,
  inputs,
  plugins: {
    text,                  // Original text schema
    enhancedText,          // Our enhanced text schema
    label,                 // Our dedicated label schema
    table                  // Our table schema
  },
});
```

### Using with UI Components

```javascript
import type { Template } from '@pdfme/common';
import { text } from '@pdfme/schemas';
import { enhancedText, label, table } from '@pars-doe/pdfme-extensions';
import { Designer } from '@pdfme/ui';

const domContainer = document.getElementById('container');
const template: Template = {
  // Your template using the extended schemas
};

const designer = new Designer({
  domContainer,
  template,
  plugins: {
    text,                  // Original text schema
    enhancedText,          // Our enhanced text schema
    label,                 // Our dedicated label schema
    table                  // Our table schema
  },
});
```

## Documentation

### Enhanced Text Schema

The enhanced text schema extends the original text schema with additional properties:

```typescript
interface EnhancedTextSchema extends TextSchema {
  // Additional properties for enhanced formatting
  borderWidth?: number;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  numberFormat?: {
    type: 'currency' | 'percentage' | 'decimal';
    decimalPlaces?: number;
    currencySymbol?: string;
  };
  conditionalFormatting?: {
    conditions: Array<{
      field: string;
      operator: '==' | '!=' | '>' | '<' | '>=' | '<=';
      value: any;
      style: {
        backgroundColor?: string;
        color?: string;
        fontWeight?: string;
      };
    }>;
  };
}
```

### Label Schema

A dedicated readonly display schema:

```typescript
interface LabelSchema {
  type: 'label';
  position: Position;
  width: number;
  height: number;
  rotate: number;
  content: string;
  fontName?: string;
  fontSize?: number;
  fontColor?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  padding?: number | [number, number, number, number];
  borderWidth?: number;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted';
}
```

### Table Schema

A schema for displaying tabular data:

```typescript
interface TableSchema {
  type: 'table';
  position: Position;
  width: number;
  height: number;
  rotate: number;
  headers?: string[];
  rows: string[][];
  cellPadding?: number;
  borderWidth?: number;
  borderColor?: string;
  headerBackgroundColor?: string;
  headerFontColor?: string;
  evenRowBackgroundColor?: string;
  oddRowBackgroundColor?: string;
}
```

### Conditional Element Schema

Any element with conditional visibility:

```typescript
interface ConditionalVisibility {
  visibilityCondition?: {
    field: string;
    operator: '==' | '!=' | '>' | '<' | '>=' | '<=';
    value: any;
  };
}

// Can be added to any schema
interface TextSchemaWithConditionalVisibility extends TextSchema, ConditionalVisibility {}
```

## Examples

Examples of using these extended schemas can be found in the [playground](https://github.com/PARS-DOE/pdfme-extensions/tree/main/playground) directory of the repository.

## License

As a work of the United States government, this project is in the public domain within the United States of America. Additionally, we waive copyright and related rights in the work worldwide through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).

You can copy, modify, distribute, and perform the work, even for commercial purposes, all without asking permission.