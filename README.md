# Angular Forms Designer

A dynamic form builder application built with **Angular 21**, **Angular Material**, **Tailwind CSS**, and **CDK Drag & Drop**. This tool allows users to visually design forms by dragging and dropping field components, configuring their properties, and generating responsive, accessible forms.

Live app: [Dynamic form builder](https://azadnio.github.io/dynamic-form-builder/)

## Features

- **Visual Form Designer**: Drag-and-drop interface to design forms without writing code
- **Dynamic Field Types**: Support for multiple field types (Text Fields, Checkboxes, etc.)
- **Real-time Configuration**: Edit field properties in a side panel
- **Angular Material Integration**: Use Material components for professional UI
- **Tailwind CSS Styling**: Modern, responsive design with Tailwind CSS
- **Accessible Design**: Built with accessibility best practices
- **Component-based Architecture**: Modular, maintainable codebase

## Project Structure

```
src/app/
├── components/
│   ├── field-settings/           # Panel for configuring field properties
│   ├── field-types/              # Reusable field type components
│   │   ├── text-field/
│   │   └── checkbox-field/
│   ├── form-elements-menu/       # Available field types menu
│   └── main-canvas/              # Main form editor area
├── models/                        # TypeScript interfaces
│   ├── field.ts                  # Form field definitions
│   └── form.ts                   # Form structure models
└── services/                      # Application services
    ├── field-types.ts            # Field type registry
    └── form.ts                   # Form management logic
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 10.9.2+
- Angular CLI 21.1.1+

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start a local development server:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory. The production build optimizes the application for performance and speed.

## Testing

To execute unit tests using Vitest:

```bash
npm test
```

## Technologies Used

- **Angular 21** - Frontend framework
- **Angular Material** - UI component library
- **Angular CDK** - Drag-and-drop functionality
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming library
- **Vitest** - Unit testing framework

## Architecture

The application follows Angular best practices with:

- **Standalone Components**: Modern Angular component architecture
- **Signal-based State Management**: Reactive data binding using Angular signals
- **Service-based Architecture**: Separation of concerns with injectable services
- **Modular Design**: Components organized by feature for scalability

## Learn More

For more information about Angular, visit the [Angular Documentation](https://angular.dev).
