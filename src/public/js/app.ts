import { DrawingCanvas } from './DrawingCanvas';
import { DrawingBeautifier } from './DrawingBeautifier';
import { ProblemViewer, Problem } from './ProblemViewer';

class DrawingApp {
    private canvas: DrawingCanvas;
    private beautifier: DrawingBeautifier;
    private problemViewer!: ProblemViewer;

    constructor() {
        this.canvas = new DrawingCanvas('drawingCanvas');
        this.beautifier = new DrawingBeautifier();
        this.loadProblem();
        this.initializeControls();
    }

    private async loadProblem() {
        try {
            const response = await fetch('/problems/problem1.json');
            const problem: Problem = await response.json();
            this.problemViewer = new ProblemViewer(problem);
        } catch (error) {
            console.error('Error loading problem:', error);
        }
    }

    private initializeControls() {
        const clearButton = document.getElementById('clear');
        const beautifyButton = document.getElementById('beautify');
        const submitButton = document.getElementById('submit');
        const convertButton = document.getElementById('convert');
        const smoothingInput = document.getElementById('smoothing') as HTMLInputElement;
        const fontStyleSelect = document.getElementById('fontStyle') as HTMLSelectElement;

        clearButton?.addEventListener('click', () => {
            this.canvas.clear();
        });

        beautifyButton?.addEventListener('click', () => {
            const points = this.canvas.getPoints();
            const beautifiedPoints = this.beautifier.beautify(points);
            // In a real implementation, we would redraw the canvas with beautified points
            console.log('Beautified points:', beautifiedPoints);
        });

        convertButton?.addEventListener('click', () => {
            const selectedFont = fontStyleSelect.value;
            if (selectedFont !== 'none') {
                this.canvas.convertToFont(selectedFont);
            }
        });

        submitButton?.addEventListener('click', () => {
            this.submitSolution();
        });

        smoothingInput?.addEventListener('input', (e) => {
            const value = (e.target as HTMLInputElement).value;
            this.beautifier.setSmoothing(parseInt(value));
        });
    }

    private submitSolution() {
        const codeEditor = document.getElementById('codeEditor') as HTMLTextAreaElement;
        const code = codeEditor.value;
        const points = this.canvas.getPoints();

        // In a real implementation, this would send the solution to a server for evaluation
        console.log('Submitting solution:', {
            code,
            points
        });

        // Show submission feedback
        alert('Solution submitted! In a real implementation, this would be evaluated by the server.');
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DrawingApp();
}); 