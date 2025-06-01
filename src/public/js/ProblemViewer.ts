export interface Problem {
    id: string;
    title: string;
    difficulty: string;
    description: string;
    examples: {
        input: string;
        explanation: string;
    }[];
    constraints: string[];
    template: string;
}

export class ProblemViewer {
    private problem: Problem;

    constructor(problem: Problem) {
        this.problem = problem;
        this.render();
    }

    private render() {
        // Update problem title and difficulty
        document.getElementById('problemTitle')!.textContent = this.problem.title;
        const difficultyElement = document.getElementById('problemDifficulty')!;
        difficultyElement.textContent = this.problem.difficulty;
        difficultyElement.className = `difficulty ${this.problem.difficulty.toLowerCase()}`;

        // Update problem description
        document.getElementById('problemDescription')!.innerHTML = this.problem.description;

        // Update examples
        const examplesContainer = document.getElementById('problemExamples')!;
        examplesContainer.innerHTML = this.problem.examples.map((example, index) => `
            <div class="example">
                <h4>Example ${index + 1}:</h4>
                <p><strong>Input:</strong> ${example.input}</p>
                <p><strong>Explanation:</strong> ${example.explanation}</p>
            </div>
        `).join('');

        // Update constraints
        const constraintsContainer = document.getElementById('problemConstraints')!;
        constraintsContainer.innerHTML = this.problem.constraints.map(constraint => 
            `<li>${constraint}</li>`
        ).join('');

        // Update code editor with template
        const codeEditor = document.getElementById('codeEditor') as HTMLTextAreaElement;
        codeEditor.value = this.problem.template;
    }
} 