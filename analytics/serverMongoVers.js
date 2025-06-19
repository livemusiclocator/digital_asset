// const express = require("express");
// require('dotenv').config();      
// const { MongoClient } = require('mongodb');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Replace with your MongoDB Atlas connection string, or set it as an environment variable
// const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URI;;

// // Setup connection to MongoDB Atlas
// const client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
// let collection;

// async function connectToMongo() {
//     try {
//         await client.connect();
//         const db = client.db('lml'); // Replace with your database name if needed
//         collection = db.collection('lml-qr-code-madness'); // Replace with your collection name if needed
//         console.log("Connected to MongoDB Atlas");
//     } catch (error) {
//         console.error("Error connecting to MongoDB Atlas:", error);
//     }
// }

// // Connect to MongoDB once at startup
// connectToMongo();

// app.use(async (req, res, next) => {
//     const cleanPath = req.path.replace(/^\/+/, ''); // Remove leading slash
//     console.log(`QR Code Accessed: ${cleanPath}`);

//     // Update the document in MongoDB Atlas: if the document exists, increment count by 1; if not, insert with count 1
//     try {
//         await collection.updateOne(
//             { uuid: cleanPath },            // Filter: find document with this uuid (cleanPath)
//             { $inc: { count: 1 } },           // Update: increment count by 1
//             { upsert: true }                // Options: if not found, insert a new document with count: 1
//         );
//         console.log("Document updated/inserted in MongoDB Atlas");
//     } catch (error) {
//         console.error("Error updating MongoDB:", error);
//     }

//     // Redirect user to the final URL
//     const url = `https://lml.live/?dateRange=thisWeek&venues=${cleanPath}`;
//     res.redirect(url);
// });

// // Start the Express server
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}/`);
// });
