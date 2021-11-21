const router = require('express').Router();
const Shopping = require('../../models/shopping');
const withAuth = require('../../utils/auth');

// Create a new shopping cart
router.post('/shopping-cart', withAuth, async (req, res) => {
    try {
        const newCart = await Shopping.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newCart);
    }   catch (err) {
        res.status(400).json(err);
    }
});
 // Update an existing shopping cart
router.put('/', withAuth, async (req, res) => {
    const cartData = await Shopping.update(
        {

        }
    )
})

// Delete current shopping cart
router.delete('/')

module.exports = router;