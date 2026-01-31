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

This project is organized so new contributors can quickly map features to folders and understand how data moves through the UI. The app is a single-page Angular application built from standalone components, with feature folders that keep UI, behavior, and models grouped together.

**Core ideas**

- **Standalone components** provide isolated, reusable UI building blocks.
- **Services** hold shared state and operations so components stay focused on presentation.
- **Signals** drive reactive updates whenever form or field state changes.
- **Feature folders** keep related components together for easy navigation.

### Application Structure

```
src/app/
├── app.ts                        # Root component
├── app.config.ts                 # Application configuration & providers
├── app.routes.ts                 # Route definitions
│
├── components/                   # Feature components
│   ├── main-canvas/              # Primary editor container
│   │   ├── main-canvas.ts        # Main canvas component
│   │   ├── form-editor/          # Form editing interface
│   │   │   └── form-editor.ts
│   │   ├── form-preview/         # Real-time form preview
│   │   │   └── form-preview.ts
│   │   ├── form-field/           # Individual field renderer
│   │   │   └── form-field.ts
│   │   └── field-preview/        # Field preview in editor
│   │       └── field-preview.ts
│   │
│   ├── form-elements-menu/       # Field type selector
│   │   ├── form-elements-menu.ts
│   │   └── field-button/         # Individual field type button
│   │       └── field-button.ts
│   │
│   ├── field-settings/           # Property configuration panel
│   │   └── field-settings.ts
│   │
│   ├── field-types/              # Reusable field components
│   │   ├── text-field/
│   │   │   └── text-field.ts
│   │   ├── checkbox-field/
│   │   │   └── checkbox-field.ts
│   │   ├── select-field/
│   │   │   └── select-field.ts
│   │   └── [custom fields]
│   │
│   └── dynamic-options/          # Dynamic field options UI
│       └── dynamic-options.ts
│
├── models/                       # Data models & interfaces
│   ├── field.ts                  # Field interface & type definitions
│   └── form.ts                   # Form interface & structure
│
├── services/                     # Business logic & state management
│   ├── field-types.ts            # Field type registry & metadata
│   ├── form.ts                   # Form state & operations
│   └── [additional services]
│
├── public/                       # Static assets
└── styles.css                    # Global styles
```

### Component Responsibilities

- **Main Canvas**: Orchestrates the editor layout and coordinates child components.
- **Form Editor**: Owns the form structure and manages add/remove/reorder actions.
- **Form Elements Menu**: Lists available field types and triggers insert actions.
- **Field Settings**: Edits properties of the currently selected field.
- **Field Preview / Form Preview**: Renders live output of the current form state.
- **Field Type Components**: Encapsulate rendering and behavior for each field type.

### Data & Interaction Flow

1. A user action (drag-and-drop, click, edit) is captured in a component.
2. The component calls a method on a service (for example, the form service).
3. The service updates state using Angular signals.
4. Any component consuming those signals updates automatically.
5. The preview components re-render to reflect the new form state.

### Styling Strategy

- **Tailwind CSS** provides layout and utility styling for rapid iteration.
- **Angular Material** supplies accessible UI components and consistent theming.
- **material-theme.scss** defines Material design tokens.
- **styles.css** contains global styles and app-wide overrides.

## Learn More

For more information about Angular, visit the [Angular Documentation](https://angular.dev).
