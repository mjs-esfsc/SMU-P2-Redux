const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');
const shoppingCartRoutes = require('./shoppingCartRoutes');

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/cart', shoppingCartRoutes);

module.exports = router;