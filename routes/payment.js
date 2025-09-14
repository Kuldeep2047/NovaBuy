const express = require('express');
const router = express.Router(); 


router.get('/checkout', (req, res) => {
    res.render('checkout/payment'); // Render the EJS page
});

module.exports = router;