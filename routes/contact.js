const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const {isLoggedIn} = require('../middleware')

// GET /contact
router.get('/contact', (req, res) => {
  res.render('contact/contact');   
});

// POST /contact
router.post('/contact', isLoggedIn,async (req, res) => {
  try {
    console.log("Form Data:", req.body); // Debugging

    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    req.flash('success', 'Thanks for reaching out! We’ll get back to you soon.');
    res.redirect('/contact');
  } catch (error) {
    console.error("Error saving contact:", error);
    req.flash('error', 'Something went wrong. Please try again.');
    res.redirect('/contact');
  }
});

module.exports = router;
