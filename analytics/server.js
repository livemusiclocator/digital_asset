const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000; // Default to port 3000

// Middleware to log every request
app.use((req, res, next) => {
    console.log(`QR Code Accessed: ${req.path}`);
    res.send(`You accessed: ${req.path}`);
    next();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
