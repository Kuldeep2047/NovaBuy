

const express = require('express');
const Product = require('../models/Product');
const router = express.Router();  //mini instance
const {validateProduct, isLoggedIn,  isSeller,isProductAuthor} = require('../middleware')

//to show all the products
router.get('/products',async(req,res)=>{
    try{
        let products = await Product.find({})
        res.render('products/index',{products})
    }
    catch(e){
        res.status(500).render('error',{err:e.mssage})
    }
})


//to show form to add new project
router.get('/product/new',isLoggedIn,(req,res)=>{
    try{
        res.render('products/new')
    }
    catch(e){
        res.status(500).render('error',{err:e.mssage})
    }
})

//to actually add the products
router.post('/products', validateProduct,isLoggedIn, isSeller,async (req,res)=>{
    try{
        let { name, img, price, desc} = req.body;
        await Product.create({ name, img, price, desc, author : req.user._id});
        req.flash('success','Product added successfully')
        res.redirect('/products')
    }
    catch(e){
        res.status(500).render('error',{err:e.mssage})
    }
})  


//to show the particular product
router.get('/products/:id',isLoggedIn,async (req,res)=>{
    try{
        let {id} = req.params;
        let foundProduct  = await Product.findById(id).populate('reviews');
        res.render('products/show',{foundProduct, msg : req.flash('msg')});
    }
    catch(e){
        res.status(500).render('error',{err:e.mssage})
    }
})
 

//form to edit the products
router.get('/products/:id/edit',isLoggedIn,isProductAuthor,async (req,res)=>{
    try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit',{foundProduct});
    }
    catch(e){
        res.status(500).render('error',{err:e.mssage})
    }
})


//to actually edit in the db
router.patch('/products/:id', validateProduct, isLoggedIn,async(req,res)=>{
    try{
        let {id} = req.params;
        let {name,img,price,desc} = req.body;
        await Product.findByIdAndUpdate(id, {name,img,price,desc});
        req.flash('success','Product edited successfully')
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error',{err:e.mssage})
    }
})

//to delete a product
router.delete('/products/:id', isLoggedIn,isProductAuthor,async (req,res)=>{
    try{
        let {id} = req.params;
        await Product.findByIdAndDelete(id);
        req.flash('success','Product deleted successfully')
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.mssage})
    }
})
module.exports = router;
