# PDFme Extensions by DOE

<h4 align="center">
  A fork of <a href="https://pdfme.com/">PDFme</a> with enhanced schema capabilities
</h4>

<p align="center">
  <a href="https://github.com/PARS-DOE/pdfme-extensions/blob/main/LICENSE.md">
    <img src="https://img.shields.io/badge/license-CC0--1.0-blue.svg" alt="pdfme-extensions is released as a public domain work under CC0 1.0 Universal." />
  </a>
</p>

<p align="center">
  A fork of the PDFme library with extended schema capabilities, developed by a team at the US Department of Energy primarily for internal reporting needs but published open-source for the community's benefit.
</p>

## Overview

This repository extends the excellent [PDFme](https://pdfme.com/) library with additional schema capabilities focusing on enhanced text formatting and display options. Our primary focus is on addressing limitations in the current implementation for reporting use cases. While this github repository contains a full fork of the pdfme repository for ease of development, modifications will be limited to the schemas.

## Key Extensions

- **Enhanced Text Schema**:
  - Conditional formatting based on field values
  - Improved numerical formatting (currency, percentages)
  - Border options for text elements

- **Dedicated Label Schema**:
  - Readonly by default (vs text schema where readonly is a toggle)

- **Table Display Schema**:
  - Non-dynamic tables for display purposes
  - True table structures with aligned cells and borders
  - Simplified layout for static content

- **Conditional Elements**:
  - Schema elements with conditional visibility
  - Support for showing/hiding based on data values

## Documentation

The extended schemas follow the same plugin architecture as the original PDFme library. You can use them as plugins in the same way you would use the built-in schemas.

For complete documentation on the core PDFme functionality, please refer to the [Getting Started](https://pdfme.com/docs/getting-started) guide.

For documentation specific to the extensions in this fork, please refer to the documentation in the packages/schemas directory.

## Examples

Examples of using the extended schemas can be found in the playground directory, which contains a React application for testing and demonstrating the functionality.

## Development

If you're looking to contribute to this project, please follow these steps:

1. Clone the repository
2. Install dependencies with `npm install`
3. Build the packages with `npm run build`

```cmd
[in pdfme-extensions dir] $ npm install
[in pdfme-extensions dir] $ npm run build
```

To verify the build is successful, run the tests:

```cmd
[in pdfme-extensions dir] $ npm run test
```

Then, run development mode for the relevant packages:

```cmd
[in pdfme-extensions/packages/common dir] $ npm run dev
[in pdfme-extensions/packages/schemas dir] $ npm run dev
[in pdfme-extensions/packages/ui dir] $ npm run dev
[in pdfme-extensions/packages/generator dir] $ npm run dev
```

For testing in the browser, use the playground:

```cmd
[in pdfme-extensions/playground dir] $ npm install
[in pdfme-extensions/playground dir] $ npm run dev
```

## About This Fork

This fork was created by a team at the US Department of Energy to address specific reporting needs, but we're publishing it as open-source to benefit the broader community. While developed primarily for internal use, we welcome community contributions and feedback.

## License

As a work of the United States government, this project is in the public domain within the United States of America. Additionally, we waive copyright and related rights in the work worldwide through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).

You can copy, modify, distribute, and perform the work, even for commercial purposes, all without asking permission. See [LICENSE.md](LICENSE.md) for more details.

## Original Project

This project is a fork of [PDFme](https://github.com/pdfme/pdfme), a TypeScript-based PDF generator and React-based UI created by [hand-dot](https://github.com/hand-dot) and contributors. We extend our gratitude to the original developers for creating such a powerful and flexible library.

## Special Thanks

- [pdf-lib](https://pdf-lib.js.org/): Used for PDF generation.
- [fontkit](https://github.com/foliojs/fontkit): Used for font rendering.
- [PDF.js](https://mozilla.github.io/pdf.js/): Used for PDF viewing.
- [React](https://reactjs.org/): Used in building the UI.
- [form-render](https://xrender.fun/form-render): Used in building the UI.
- [antd](https://ant.design/): Used in building the UI.
- [react-moveable](https://daybrush.com/moveable/), [react-selecto](https://github.com/daybrush/selecto), [@scena/react-guides](https://daybrush.com/guides/): Used in the Designer UI.
- [dnd-kit](https://github.com/clauderic/dnd-kit): Used in the Designer UI.
- [Lucide](https://lucide.dev/): Used in the Designer UI and Schema's icon.

We are grateful to the developers of both PDFme and these underlying libraries that make our work possible.
