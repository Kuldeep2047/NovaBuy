

const {productSchema, reviewSchema} = require('./schema')

const validateProduct = (req,res,next)=>{
    const {name,img,price,desc} = req.body;
    const {err} = productSchema.validate({name,img,price,desc})
    if(err){
        return res.render('error')
    }
    next();
}


const validateReview = (req,res,next)=>{
    const {rating, comment} = req.body;
    const {err} = reviewSchema.validate({rating, comment})
    if(err){
        return res.render('error')
    }
    next();
}


const isLoggedIn = (req,res,next)=>{
    if(! req.isAuthenticated()){
        req.flash('error','You must be signed in first!')
        return res.redirect('/login');
    }
    next(); 
}

const isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error','You do not have the permission to do that!')
        return res.redirect('/products');
    }else if(req.user.role !== 'seller'){
        req.flash('error','You do not have the permission to do that!')
        return res.redirect('/products');
    }
    next();
}



// const isProductAuthor = async (req,res,next)=>{
    
//     let {id} = req.params;
//     let Product = await Product.findById(id);
//     if( ! Product.author.equals(req.user._id)){
//         req.flash('error','You are not the authorised user!')
//         return res.redirect('/products');
//     }
//     next();
// }
const Product = require('./models/Product');  // make sure path is correct

const isProductAuthor = async (req,res,next)=> {
    try {
        let {id} = req.params;
        let product = await Product.findById(id);

        if (!product) {
            req.flash('error','Product not found!');
            return res.redirect('/products');
        }

        if (!product.author.equals(req.user._id)) {
            req.flash('error','You are not the authorised user!');
            return res.redirect('/products');
        }

        next();
    } catch (err) {
        console.error(err);
        req.flash('error','Something went wrong!');
        res.redirect('/products');
    }
}


module.exports = {isLoggedIn,validateProduct, validateReview, isSeller, isProductAuthor}






