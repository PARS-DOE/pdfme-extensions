# PDFme Extensions System Patterns

## System Architecture

```mermaid
flowchart TD
    PDFme[PDFme Core Library] --> Plugins[Plugin System]
    Plugins --> ExtensionPackage[PDFme Extensions Package]
    
    subgraph ExtensionPackage
        Manager[Schema Manager] --> Schema1[Schema 1]
        Manager --> Schema2[Schema 2]
        Manager --> SchemaX[Schema X...]
        
        Schema1 --> PDFRenderer1[PDF Renderer]
        Schema1 --> UIRenderer1[UI Renderer]
        Schema1 --> PropPanel1[Property Panel]
        
        Schema2 --> PDFRenderer2[PDF Renderer]
        Schema2 --> UIRenderer2[UI Renderer]
        Schema2 --> PropPanel2[Property Panel]
    end
    
    ExtensionPackage --> UserApp[User Application]
```

## Plugin Structure
Each schema in the PDFme Extensions package follows the plugin structure defined by PDFme:

1. **PDF Renderer**: Responsible for rendering the schema into a PDF document using pdf-lib
2. **UI Renderer**: Renders the schema in the DOM with different modes:
   - **Viewer Mode**: Preview that matches the PDF rendering
   - **Form Mode**: Interactive form for user input
   - **Designer Mode**: WYSIWYG editor for schema configuration
3. **Property Panel**: Configurable property editor that appears in the Designer sidebar

```mermaid
flowchart LR
    Schema[Schema Definition] --> PDF[PDF Renderer]
    Schema --> UI[UI Renderer]
    Schema --> PropPanel[Property Panel]
    
    UI --> ViewerMode[Viewer Mode]
    UI --> FormMode[Form Mode]
    UI --> DesignerMode[Designer Mode]
    
    PDF --> PDFLib[pdf-lib]
    PropPanel --> FormRender[form-render]
```

## Design Patterns

### Factory Pattern
Schemas are created using a factory pattern, allowing for consistent instantiation and configuration.

```mermaid
flowchart TD
    SchemaFactory[Schema Factory] --> TextSchema[Text Schema]
    SchemaFactory --> ImageSchema[Image Schema]
    SchemaFactory --> CustomSchema1[Custom Schema 1]
    SchemaFactory --> CustomSchema2[Custom Schema 2]
```

### Plugin Pattern
The entire system is built around a plugin architecture, allowing users to selectively include only the schemas they need.

### Caching Pattern
Performance-critical operations like rendering barcodes or processing images implement caching to optimize repeated operations.

## Component Relationships

### Schema Components
Each schema consists of three main components that work together:

```mermaid
flowchart TD
    SchemaDefinition[Schema Definition] --> PDFRenderer[PDF Renderer Component]
    SchemaDefinition --> UIRenderer[UI Renderer Component]
    SchemaDefinition --> PropPanel[Property Panel Component]
    
    PDFRenderer -- Renders to --> PDF[PDF Document]
    UIRenderer -- Renders to --> DOM[DOM Element]
    PropPanel -- Configures --> SchemaDefinition
```

### Integration with PDFme
The PDFme Extensions package integrates with PDFme through its plugin system:

```mermaid
flowchart LR
    UserApp[User Application] --> PDFme[PDFme Core]
    UserApp --> Extensions[PDFme Extensions]
    
    Extensions -- Registers Plugins --> PDFme
    
    PDFme --> Generator[Generator]
    PDFme --> UI[UI Components]
    
    Generator -- Uses --> Plugins[Registered Plugins]
    UI -- Uses --> Plugins
```

## Technical Implementation

### Schema Registration
Schemas are registered with PDFme's plugin system by providing the appropriate renderers and property panels:

```javascript
// Example registration
import { text } from '@pdfme/schemas';
import { signature, rating } from '@pdfme/extensions';

// Register with Generator
const pdf = await generate({
  template,
  inputs,
  plugins: {
    text,
    signature,
    rating
  },
});

// Register with UI components
const designer = new Designer({
  domContainer,
  template,
  plugins: {
    text,
    signature,
    rating
  },
});
```

### Extensibility
The architecture is designed to be extensible, allowing for future schemas to be added without modifying existing code.