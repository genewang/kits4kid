# LeetCode Drawing Tool

An interactive drawing tool for solving LeetCode-style problems that require visual solutions.

## Features

- Interactive drawing canvas with mouse and touch support
- Color picker and pen thickness control
- Font conversion options:
  - Handwriting: Smooth, natural-looking strokes
  - Geometric: Clean, straight lines with sharp angles
  - Calligraphy: Elegant, varying line width
  - Technical: Precise, technical drawing style
- Undo/Redo functionality
- Problem description and examples viewer
- Code editor for solution implementation

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Start production server:
   ```bash
   npm start
   ```

## Usage

1. Open http://localhost:3000 in your browser
2. Read the problem description and examples
3. Use the drawing tools to create your solution:
   - Select colors using the color picker
   - Adjust pen thickness with the slider
   - Choose a font style and convert your drawing
4. Write your code in the code editor
5. Submit your solution

## Project Structure

```
leetcode-drawing-tool/
├── src/
│   ├── server.ts
│   ├── public/
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── problems/
│   │   │   └── problem1.json
│   │   └── js/
│   │       ├── DrawingCanvas.ts
│   │       ├── DrawingBeautifier.ts
│   │       ├── ProblemViewer.ts
│   │       └── app.ts
├── dist/
├── tsconfig.json
└── package.json
```

## Contributing

Feel free to submit issues and enhancement requests!
