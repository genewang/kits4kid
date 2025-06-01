export class DrawingCanvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private isDrawing: boolean = false;
    private points: { x: number; y: number }[] = [];
    private currentColor: string = '#000000';
    private currentThickness: number = 2;
    private currentStyle: string = 'geometric';

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d')!;
        
        // Set canvas size
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        this.initializeEventListeners();
        this.initializeToolbarListeners();
    }

    private initializeEventListeners() {
        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
    }

    private initializeToolbarListeners() {
        const colorPicker = document.getElementById('penColor') as HTMLInputElement;
        const thicknessSlider = document.getElementById('penThickness') as HTMLInputElement;
        const styleSelect = document.getElementById('drawingStyle') as HTMLSelectElement;

        colorPicker.addEventListener('input', (e) => {
            this.currentColor = (e.target as HTMLInputElement).value;
        });

        thicknessSlider.addEventListener('input', (e) => {
            this.currentThickness = parseInt((e.target as HTMLInputElement).value);
        });

        styleSelect.addEventListener('change', (e) => {
            this.currentStyle = (e.target as HTMLSelectElement).value;
        });
    }

    private startDrawing(event: MouseEvent) {
        this.isDrawing = true;
        this.points = [];
        this.addPoint(event);
    }

    private draw(event: MouseEvent) {
        if (!this.isDrawing) return;
        this.addPoint(event);
        this.drawLine();
    }

    private stopDrawing() {
        this.isDrawing = false;
    }

    private addPoint(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        this.points.push({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        });
    }

    private drawLine() {
        if (this.points.length < 2) return;

        const lastPoint = this.points[this.points.length - 1];
        const previousPoint = this.points[this.points.length - 2];

        this.context.beginPath();
        this.context.moveTo(previousPoint.x, previousPoint.y);
        this.context.lineTo(lastPoint.x, lastPoint.y);
        this.context.strokeStyle = this.currentColor;
        this.context.lineWidth = this.currentThickness;
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        this.context.stroke();
    }

    public clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.points = [];
    }

    public getPoints() {
        return this.points;
    }

    public convertToFont(fontStyle: string) {
        // Create a temporary canvas for the conversion
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        const tempContext = tempCanvas.getContext('2d')!;

        // Copy the current drawing
        tempContext.drawImage(this.canvas, 0, 0);

        // Clear the main canvas
        this.clear();

        // Apply font conversion based on style
        switch (fontStyle) {
            case 'handwriting':
                this.applyHandwritingStyle(tempContext);
                break;
            case 'geometric':
                this.applyGeometricStyle(tempContext);
                break;
            case 'calligraphy':
                this.applyCalligraphyStyle(tempContext);
                break;
            case 'technical':
                this.applyTechnicalStyle(tempContext);
                break;
        }
    }

    private applyHandwritingStyle(tempContext: CanvasRenderingContext2D) {
        // Apply handwriting-like smoothing and style
        this.context.strokeStyle = this.currentColor;
        this.context.lineWidth = this.currentThickness;
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        this.context.globalAlpha = 0.8;
        this.context.drawImage(tempContext.canvas, 0, 0);
    }

    private applyGeometricStyle(tempContext: CanvasRenderingContext2D) {
        // Apply geometric style with straight lines and sharp angles
        this.context.strokeStyle = this.currentColor;
        this.context.lineWidth = this.currentThickness;
        this.context.lineCap = 'square';
        this.context.lineJoin = 'miter';
        this.context.drawImage(tempContext.canvas, 0, 0);
    }

    private applyCalligraphyStyle(tempContext: CanvasRenderingContext2D) {
        // Apply calligraphy style with varying line width
        this.context.strokeStyle = this.currentColor;
        this.context.lineWidth = this.currentThickness * 1.5;
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        this.context.globalAlpha = 0.9;
        this.context.drawImage(tempContext.canvas, 0, 0);
    }

    private applyTechnicalStyle(tempContext: CanvasRenderingContext2D) {
        // Apply technical drawing style with precise lines
        this.context.strokeStyle = this.currentColor;
        this.context.lineWidth = this.currentThickness;
        this.context.lineCap = 'butt';
        this.context.lineJoin = 'miter';
        this.context.drawImage(tempContext.canvas, 0, 0);
    }
} 