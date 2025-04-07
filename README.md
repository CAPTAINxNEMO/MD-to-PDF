# Markdown Editor with Live Preview and PDF Export

A full-featured markdown editor with real-time preview and PDF export functionality. This React application allows you to write markdown content and see the rendered HTML instantly. When you're ready, you can convert your document to a PDF with a single click.

![Markdown Editor](https://via.placeholder.com/800x400)

## Features

- **Split-screen Interface**: Edit markdown on the left, see rendered HTML on the right
- **Real-time Preview**: Instantly see changes as you type
- **Syntax Highlighting**: Code blocks with syntax highlighting using highlight.js
- **PDF Export**: Convert your markdown to professionally formatted PDFs
- **MathJax Support**: Include mathematical formulas using LaTeX syntax
- **Tab Support**: Automatically insert spaces when pressing Tab
- **Modern UI**: Clean interface with Tailwind CSS styling

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Express.js
- **PDF Generation**: Puppeteer
- **Markdown Parsing**: marked
- **Syntax Highlighting**: highlight.js
- **Math Rendering**: MathJax

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/markdown-editor.git
   cd markdown-editor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   This will start both the React frontend and Express backend using concurrently.

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. Type or paste markdown content in the left panel
2. See the rendered HTML in the right panel
3. Click the "Convert to PDF" button to generate and download a PDF version

### Supported Markdown Features

- Headers (# H1, ## H2, etc.)
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Links and images
- Bold and italic text
- Blockquotes
- Tables
- Mathematical equations using LaTeX syntax

### Example Markdown

```markdown
# My Document

## Introduction
This is a **bold statement** and *italicized text*.

## Code Example
```javascript
function helloWorld() {
  console.log("Hello, world!");
}
```

## Math Example
When $a \ne 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$

## Project Structure

```
markdown-editor/
├── public/                 # Static files
├── server/                 # Express backend
│   ├── server.js           # Server entry point
│   ├── github-dark.css     # Syntax highlighting styles
│   └── markdown.css        # PDF styling
├── src/                    # React frontend
│   ├── components/         # React components
│   │   ├── markdown.js     # Main markdown editor component
│   │   └── markdown.css    # Styling for the preview
│   ├── App.js              # Main application component
│   ├── App.css             # Application styling
│   └── index.js            # React entry point
└── package.json            # Project dependencies and scripts
```

## Development

### Available Scripts

- `npm start`: Starts the React development server
- `npm run build`: Builds the app for production
- `npm run server`: Starts the Express server
- `npm run dev`: Runs both the client and server concurrently

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [marked](https://github.com/markedjs/marked) - Markdown parser and compiler
- [highlight.js](https://highlightjs.org/) - Syntax highlighting
- [Puppeteer](https://pptr.dev/) - Headless Chrome Node.js API
- [MathJax](https://www.mathjax.org/) - Mathematics rendering
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework