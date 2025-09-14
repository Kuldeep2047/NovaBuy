const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const User = require('../models/User')
const {isLoggedIn} = require('../middleware')



//route to see the cart
router.get('/user/cart', isLoggedIn, async (req,res)=>{
    let user = await User.findById(req.user._id).populate('cart');
    res.render('cart/cart',{user})
})


//actually adding the product to the cart
router.post('/user/:productId/add',isLoggedIn, async (req,res)=>{
    let {productId} = req.params;
    let userId = req.user._id;
    let product = await Product.findById(productId);
    let user = await User.findById(userId);
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart');
})

// DELETE a specific item from the cart
router.delete('/user/cart/:productId', isLoggedIn, async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);

        // Filter out only the clicked product
        user.cart = user.cart.filter(item => item._id.toString() !== productId);

        await user.save();
        res.redirect('/user/cart');
    } catch (err) {
        console.error(err);
        res.redirect('/user/cart');
    }
});


module.exports = router;
 