import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get problem data
app.get('/api/problems/:id', (req, res) => {
    const problemId = req.params.id;
    res.sendFile(path.join(__dirname, 'public', 'problems', `${problemId}.json`));
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}); 