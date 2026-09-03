const { booksCollection } = require('../Config/firebase');
function serialize(snap) { return { bookId: snap.id, ...snap.data() }; }
async function findBookById(id) { const snap = await booksCollection.doc(id).get(); return snap.exists ? serialize(snap) : null; }
async function createBook(data) { const ref = booksCollection.doc(); const now = new Date(); await ref.set({ ...data, createdAt: now, updatedAt: now }); return findBookById(ref.id); }
async function updateBook(id, data) { await booksCollection.doc(id).update({ ...data, updatedAt: new Date() }); return findBookById(id); }
async function deleteBook(id) { await booksCollection.doc(id).delete(); }
async function findAllBooks(filters={}) {
  const snap = await booksCollection.orderBy('createdAt','desc').get();
  return snap.docs.map(serialize).filter((b) =>
    (!filters.title || b.title.toLowerCase() === filters.title.toLowerCase()) &&
    (!filters.author || b.author.toLowerCase() === filters.author.toLowerCase()) &&
    (!filters.category || b.category.toLowerCase() === filters.category.toLowerCase()) &&
    (!filters.status || b.status === filters.status)
  );
}
async function searchBooks(q) {
  const needle = q.toLowerCase();
  const snap = await booksCollection.orderBy('createdAt','desc').get();
  return snap.docs.map(serialize).filter(b => b.title.toLowerCase().includes(needle) || b.author.toLowerCase().includes(needle));
}
module.exports = { serialize, findBookById, createBook, updateBook, deleteBook, findAllBooks, searchBooks };
