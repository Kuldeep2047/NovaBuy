const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     name : {
        type : String,
        trim : true,
        required : true
     },
     img : {
        type : String,
        trim : true,
        
     },
     price : {
        type : Number,
        min : 0,
        required : true
     },
     desc :{
        type : String,
        trim : true
     },
     reviews :[
         {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Review'
         }
      ],
      author :{
         type : mongoose.Schema.Types.ObjectId,
         ref : 'User'
      }
})

//middleware jo operation kerwane per use hota hai. iske ander pre and post middleware hai
productSchema.post('findOneAndDelete', async function(product){
   if(product.reviews.length > 0){
      await Reviews.deleteMany({_id : {$in : product.reviews}})
   }
})


let Product = mongoose.model('Product',productSchema)

module.exports = Product;








