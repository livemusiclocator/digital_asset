// index.js
const functions = require('firebase-functions');
const admin     = require('firebase-admin');
const express   = require('express');
const cors      = require('cors');

admin.initializeApp();
const db  = admin.firestore();
const app = express();

// ─── Enable CORS for *any* origin ─────────────────────────
app.use(cors({ origin: true }));
app.options('*', cors({ origin: true }));

// ─── Catch *every* path and do your count+redirect ────
app.all('*', async (req, res) => {
  const cleanPath = req.path.replace(/^\/+/, '');
  console.log(`QR Code Accessed: ${cleanPath}`);

  try {
    await db
      .collection('lml-qr-code-madness')
      .doc(cleanPath)
      .set(
        { uuid: cleanPath, count: admin.firestore.FieldValue.increment(1) },
        { merge: true }
      );
  } catch (err) {
    console.error('Firestore write error:', err);
  }

  return res.redirect(
    `https://lml.live/?dateRange=thisWeek&venues=${cleanPath}`
  );
});

// ─── Export a single function ───────────────────────────────
exports.app = functions.https.onRequest(app);


// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const express = require('express');
// const cors = require('cors');

// admin.initializeApp();  
// const db = admin.firestore();

// const app = express();

// app.use(cors({ origin: true }));  

// app.options('*', cors({ origin: true }));

// app.use(async (req, res, next) => {
//   const cleanPath = req.path.replace(/^\/+/, '');
//   console.log(`QR Code Accessed: ${cleanPath}`);

//   try {
//     const docRef = db.collection('lml-qr-code-madness').doc(cleanPath);
//     await docRef.set({
//       uuid: cleanPath,
//       count: admin.firestore.FieldValue.increment(1)
//     }, { merge: true });
//   } catch (err) {
//     console.error('Error updating Firestore:', err);
//   }

//   res.redirect(`https://lml.live/?dateRange=thisWeek&venues=${cleanPath}`);
// });

// exports.app = functions.https.onRequest(app);
