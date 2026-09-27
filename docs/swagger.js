/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a student or librarian account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name,email,password]
 *             properties:
 *               name: {type: string}
 *               email: {type: string}
 *               password: {type: string}
 *               role: {type: string, enum: [student,librarian]}
 *     responses: {201: {description: Registered}, 400: {description: Validation error}}
 * /auth/login:
 *   post:
 *     summary: Login and receive JWT
 *     responses: {200: {description: Login successful}}
 * /auth/profile:
 *   get:
 *     security: [{bearerAuth: []}]
 *     summary: Get current profile
 *     responses: {200: {description: Profile}}
 * /books:
 *   get:
 *     security: [{bearerAuth: []}]
 *     summary: List books
 *     responses: {200: {description: Book list}}
 *   post:
 *     security: [{bearerAuth: []}]
 *     summary: Add book (librarian)
 *     responses: {201: {description: Created}}
 * /books/search:
 *   get:
 *     security: [{bearerAuth: []}]
 *     summary: Search books by title or author
 *     parameters: [{name: q,in: query,required: true,schema: {type: string}}]
 *     responses: {200: {description: Search results}}
 * /books/{id}/borrow:
 *   post:
 *     security: [{bearerAuth: []}]
 *     summary: Borrow a book (student)
 *     parameters: [{name: id,in: path,required: true,schema: {type: string}}]
 *     responses: {201: {description: Borrowed}}
 * /books/{id}/return:
 *   post:
 *     security: [{bearerAuth: []}]
 *     summary: Return a book (student)
 *     parameters: [{name: id,in: path,required: true,schema: {type: string}}]
 *     responses: {200: {description: Returned}}
 * /transactions:
 *   get:
 *     security: [{bearerAuth: []}]
 *     summary: View all transactions (librarian)
 *     responses: {200: {description: Transaction ledger}}
 * /transactions/my:
 *   get:
 *     security: [{bearerAuth: []}]
 *     summary: View my transaction history
 *     responses: {200: {description: History}}
 * /users:
 *   get:
 *     security: [{bearerAuth: []}]
 *     summary: List users (librarian)
 *     responses: {200: {description: Users}}
 */
