const admin = require('firebase-admin');

function getCredential() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    return admin.credential.cert(serviceAccount);
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return admin.credential.applicationDefault();
  }
  return admin.credential.applicationDefault();
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: getCredential(),
    projectId: process.env.FIREBASE_PROJECT_ID || undefined,
  });
}

const db = admin.firestore();
const usersCollection = db.collection('library_users');
const booksCollection = db.collection('library_books');
const transactionsCollection = db.collection('library_transactions');

module.exports = { admin, db, usersCollection, booksCollection, transactionsCollection };
