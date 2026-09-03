const { transactionsCollection } = require('../Config/firebase');
function serialize(snap) { return { transactionId: snap.id, ...snap.data() }; }
async function findTransactionById(id) { const snap = await transactionsCollection.doc(id).get(); return snap.exists ? serialize(snap) : null; }
async function createTransaction(data) { const ref = transactionsCollection.doc(); await ref.set({ ...data, createdAt: new Date() }); return findTransactionById(ref.id); }
async function findActiveBorrow(userId, bookId) {
  const snap = await transactionsCollection.where('userId','==',userId).where('bookId','==',bookId).where('status','in',['active','overdue']).limit(1).get();
  return snap.empty ? null : serialize(snap.docs[0]);
}
async function findAllTransactions() { const snap = await transactionsCollection.orderBy('borrowDate','desc').get(); return snap.docs.map(serialize); }
async function findTransactionsByUser(userId) { const snap = await transactionsCollection.where('userId','==',userId).orderBy('borrowDate','desc').get(); return snap.docs.map(serialize); }
async function markOverdueTransactions() {
  const now = new Date();
  const snap = await transactionsCollection.where('status','==','active').where('dueDate','<',now).get();
  if (snap.empty) return;
  const batch = transactionsCollection.firestore.batch();
  snap.docs.forEach(doc => batch.update(doc.ref, { status:'overdue', updatedAt:new Date() }));
  await batch.commit();
}
module.exports = { serialize, createTransaction, findTransactionById, findActiveBorrow, findAllTransactions, findTransactionsByUser, markOverdueTransactions };
