// This file will provide a set of routes for displaying book data and saving to the db
const router = require('express').Router();
const Book = require('../../models/Book');

// Get all books 
router.get('/browse', async (_req, res) => {
    const bookData = await Book.findAll();
    return res.json(bookData);
});

// Get a specific book by 
router.get('/:id', async (req, res) => {
    const bookData = await Book.findByPk(req.params.id);
    return res.json(bookData);
  });
  
// Add a new book to the db
router.post('/', async (req, res) => {
    const bookData = await Book.create(req.body);
    return res.json(bookData);
  });

// Update book data
router.put('/:book_id', async (req, res) => {
    const bookData = await Book.update(
      {
        title: req.body.title,
        book_description: req.body.book_description,
        genre: req.body.genre,
        author: req.body.author,
      },
      {
        where: {
          book_id: req.params.book_id,
        },
      }
    );
  
    return res.json(bookData);
  });

// Delete a book 
router.delete('/:book_id', async (req, res) => {
    const bookData = await Book.destroy({
      where: {
        book_id: req.params.book_id,
      },
    });
  
    return res.json(bookData);
  });
  

module.exports = router;



