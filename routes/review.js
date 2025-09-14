const express = require('express');
const router = express.Router();  //mini instance
const Product = require('../models/Product')
const Review = require('../models/Review')
const {validateReview, isLoggedIn} = require('../middleware')



// Add review
router.post('/products/:id/review', isLoggedIn, validateReview, async (req, res) => {
    try {
        let { id } = req.params;
        let { rating, comment } = req.body;

        const product = await Product.findById(id);
        const review = new Review({
            rating,
            comment,
            username: req.user.username,   // optional
            author: req.user._id           // ✅ logged-in user as author
        });

        product.reviews.push(review);
        await review.save();
        await product.save();

        req.flash('success', 'Review added successfully');
        res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});


// delete a review
// router.delete('/products/:id/reviews/:reviewId', async (req, res) => {
//     try {
//         let { id, reviewId } = req.params;
//         await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

//         await Review.findByIdAndDelete(reviewId);

//         req.flash('success', 'Review deleted successfully');
//         res.redirect(`/products/${id}`);
//     } catch (e) {
//         res.status(500).render('error', { err: e.message });
//     }
// });
// Delete review (only author can delete)
router.delete('/products/:id/reviews/:reviewId', isLoggedIn, async (req, res) => {
    try {
        const { id, reviewId } = req.params;

        const review = await Review.findById(reviewId);
        if (!review) {
            req.flash('error', 'Review not found!');
            return res.redirect(`/products/${id}`);
        }

        // ✅ Check if logged in user is the author
        if (!review.author || !review.author.equals(req.user._id)) {
            req.flash('error', 'You are not allowed to delete this review!');
            return res.redirect(`/products/${id}`);
        }

        // Remove review reference from product
        await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

        // Delete review
        await Review.findByIdAndDelete(reviewId);

        req.flash('success', 'Review deleted successfully');
        res.redirect(`/products/${id}`);
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});


module.exports = router;