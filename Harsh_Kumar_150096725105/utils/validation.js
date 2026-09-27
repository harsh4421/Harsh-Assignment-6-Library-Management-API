const { body, param, query } = require('express-validator');

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must contain at least 2 characters.'),
  body('email').trim().isEmail().withMessage('A valid email is required.').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must contain at least 6 characters.'),
  body('role').optional().isIn(['student','librarian']).withMessage('Role must be student or librarian.'),
];

const loginValidation = [
  body('email').trim().isEmail().withMessage('A valid email is required.').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required.'),
];

const profileValidation = [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must contain at least 2 characters.'),
  body('email').optional().trim().isEmail().withMessage('A valid email is required.').normalizeEmail(),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must contain at least 6 characters.'),
];

const bookValidation = [
  body('title').trim().notEmpty().withMessage('Title is required.'),
  body('author').trim().notEmpty().withMessage('Author is required.'),
  body('isbn').trim().isLength({ min: 10, max: 17 }).withMessage('ISBN must be 10 to 17 characters.'),
  body('category').trim().notEmpty().withMessage('Category is required.'),
  body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer.'),
];

const updateBookValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty.'),
  body('author').optional().trim().notEmpty().withMessage('Author cannot be empty.'),
  body('isbn').optional().trim().isLength({ min: 10, max: 17 }).withMessage('ISBN must be 10 to 17 characters.'),
  body('category').optional().trim().notEmpty().withMessage('Category cannot be empty.'),
  body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer.'),
];

const idValidation = [param('id').trim().notEmpty().withMessage('Id is required.')];
const roleValidation = [
  param('id').trim().notEmpty().withMessage('User id is required.'),
  body('role').isIn(['student','librarian']).withMessage('Role must be student or librarian.'),
];
const bookQueryValidation = [
  query('title').optional().trim(), query('author').optional().trim(), query('category').optional().trim(),
  query('status').optional().isIn(['available','borrowed']).withMessage('Status must be available or borrowed.'),
];
const searchValidation = [query('q').trim().notEmpty().withMessage('Search query q is required.')];

module.exports = { registerValidation, loginValidation, profileValidation, bookValidation, updateBookValidation, idValidation, roleValidation, bookQueryValidation, searchValidation };
