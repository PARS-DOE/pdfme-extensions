# PDFme Extensions Product Context

## Why This Project Exists
PDFme is a powerful library for generating and editing PDF documents with a focus on templating and form capabilities. While the core library offers text, image, and barcode schemas, many users require additional schemas for specific use cases. This project exists to fill that gap by providing additional schemas that extend PDFme's functionality.

## Problems It Solves
1. **Limited Schema Types**: Currently, PDFme only offers text, image, and barcode (QR code) schemas out of the box. Users who need additional schema types have to create them from scratch.
2. **Duplication of Effort**: Many PDFme users are independently creating similar schemas for common use cases.
3. **Inconsistent Implementation**: Without a central repository of well-maintained schemas, users may implement schemas with varying levels of quality and compatibility.
4. **Learning Curve**: Creating custom schemas requires understanding PDFme's plugin architecture and the underlying PDF rendering libraries, which can be challenging for some users.

## How It Should Work
The PDFme Extensions package should:
1. Be installable via npm (`npm install @pdfme/extensions` or similar)
2. Provide a collection of ready-to-use schemas that follow PDFme's plugin architecture
3. Allow users to import only the schemas they need, minimizing bundle size
4. Include comprehensive documentation and examples for each schema
5. Maintain compatibility with PDFme's API and architecture

## User Experience Goals
1. **Simplicity**: Users should be able to add new schemas to their PDFme projects with minimal code changes and configuration.
2. **Discoverability**: The package should clearly document all available schemas and their capabilities.
3. **Flexibility**: Users should be able to customize the schemas to fit their specific needs.
4. **Reliability**: The schemas should work consistently across different browsers and environments.
5. **Performance**: The schemas should be optimized for performance, particularly when generating multiple PDFs.

## Target Users
1. **PDFme Users**: Developers who are already using PDFme and need additional schema types
2. **PDF Application Developers**: Developers building applications that generate or manipulate PDFs
3. **Form Builders**: Developers creating form-based applications that need to generate PDFs