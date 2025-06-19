const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

// Initialize the Admin SDK (uses built-in creds on deploy)
admin.initializeApp();

const db = admin.firestore();
const app = express();

// Middleware: increment count in Firestore, then redirect
app.use(async (req, res, next) => {
  const cleanPath = req.path.replace(/^\/+/, '');
  console.log(`QR Code Accessed: ${cleanPath}`);

  try {
    const docRef = db.collection('lml-qr-code-madness').doc(cleanPath);
    await docRef.set({
      uuid: cleanPath,
      count: admin.firestore.FieldValue.increment(1)
    }, { merge: true });
    console.log('Firestore document updated/inserted');
  } catch (err) {
    console.error('Error updating Firestore:', err);
  }

  const url = `https://lml.live/?dateRange=thisWeek&venues=${cleanPath}`;
  res.redirect(url);
});

// Export as an HTTP (Express) Cloud Function
exports.app = functions.https.onRequest(app);
