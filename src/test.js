
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Serve static files (for frontend HTML form)
app.use(express.static('public'));
app.use(express.static('template'));


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to store uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Route to handle form submission
app.post('/submit-review', upload.single('reviewPhoto'), (req, res) => {
    const reviewText = req.body.reviewText;
    const photoPath = req.file.path;

    console.log('Review:', reviewText);
    console.log('Photo Path:', photoPath);

    // You can store reviewText and photoPath in a database if desired

    res.send("Review submitted successfully!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
