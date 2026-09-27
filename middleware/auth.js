const { verifyToken } = require('../utils/jwt');
const { usersCollection } = require('../Config/firebase');

async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) return res.status(401).json({ message: 'Authentication token required.' });
    const decoded = verifyToken(header.slice(7));
    const snap = await usersCollection.doc(decoded.userId).get();
    if (!snap.exists) return res.status(401).json({ message: 'User account no longer exists.' });
    req.user = { userId: snap.id, ...snap.data() };
    next();
  } catch (err) {
    return res.status(401).json({ message: err.name === 'TokenExpiredError' ? 'Token has expired.' : 'Invalid authentication token.' });
  }
}
module.exports = auth;
