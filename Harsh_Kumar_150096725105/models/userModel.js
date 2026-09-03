const { usersCollection } = require('../Config/firebase');

function serialize(snap) { return { userId: snap.id, ...snap.data() }; }
async function findUserByEmail(email) {
  const snap = await usersCollection.where('email','==',email.toLowerCase()).limit(1).get();
  return snap.empty ? null : serialize(snap.docs[0]);
}
async function findUserById(id) {
  const snap = await usersCollection.doc(id).get();
  return snap.exists ? serialize(snap) : null;
}
async function createUser(data) {
  const ref = usersCollection.doc();
  const now = new Date();
  await ref.set({ ...data, email: data.email.toLowerCase(), createdAt: now, updatedAt: now });
  return findUserById(ref.id);
}
async function updateUser(id, updates) {
  await usersCollection.doc(id).update({ ...updates, updatedAt: new Date() });
  return findUserById(id);
}
async function findAllUsers(role) {
  let q = usersCollection.orderBy('createdAt','desc');
  if (role) q = usersCollection.where('role','==',role);
  const snap = await q.get();
  return snap.docs.map(serialize);
}
async function updateUserRole(id, role) { return updateUser(id, { role }); }
async function deleteUser(id) { await usersCollection.doc(id).delete(); }
module.exports = { findUserByEmail, findUserById, createUser, updateUser, findAllUsers, updateUserRole, deleteUser };
