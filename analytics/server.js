const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000; // Default to port 3000

// Middleware to log every request
app.use((req, res, next) => {
    const cleanPath = req.path.replace(/^\/+/, ''); // Remove leading slash
    console.log(`QR Code Accessed: ${cleanPath}`);

    // Google Analytics integration can be added here
    //
    //
    //
    //
    //
    //
    //

    const url = `https://lml.live/?dateRange=thisWeek&venues=${cleanPath}`;
    res.redirect(url);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

