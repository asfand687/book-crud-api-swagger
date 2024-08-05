const express = require('express');
const router = express.Router();

// Mock database
let authors = [];

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *         - bio
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the author
 *         name:
 *           type: string
 *           description: The name of the author
 *         bio:
 *           type: string
 *           description: The biography of the author
 */

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: The authors managing API
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Returns the list of all the authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: The list of the authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 */
router.get('/', (req, res) => {
  res.json(authors);
});

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: The author was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 */
router.post('/', (req, res) => {
  const author = { id: authors.length + 1, ...req.body };
  authors.push(author);
  res.status(201).json(author);
});

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get the author by id
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author id
 *     responses:
 *       200:
 *         description: The author description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: The author was not found
 */
router.get('/:id', (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (!author) return res.status(404).send('Author not found');
  res.json(author);
});

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update the author by the id
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: The author was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: The author was not found
 */
router.put('/:id', (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (!author) return res.status(404).send('Author not found');

  author.name = req.body.name;
  author.bio = req.body.bio;
  res.json(author);
});

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Remove the author by id
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author id
 *     responses:
 *       200:
 *         description: The author was deleted
 *       404:
 *         description: The author was not found
 */
router.delete('/:id', (req, res) => {
  const authorIndex = authors.findIndex(a => a.id == req.params.id);
  if (authorIndex === -1) return res.status(404).send('Author not found');

  authors.splice(authorIndex, 1);
  res.status(200).send('Author deleted');
});

module.exports = router;
