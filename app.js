require('dotenv').config();

const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const seedDB = require('./seed')
const ejsMate = require('ejs-mate')
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/User')


const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart') 
const paymentRoutes = require('./routes/payment') 
const aboutRoutes = require('./routes/about') 
const homeRoutes = require('./routes/home')
const contactRoutes = require('./routes/contact')




//session config
let configSession  = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie :{
    httpOnly: true,
    expires: Date.now() + 1000*60*60*24*7, //1 week
    maxAge: 1000*60*60*24*7
  }
}

app.engine('ejs', ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(session(configSession))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session());



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.currentUser = req.user;    
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next()
})

//PASSPORT
passport.use(new LocalStrategy(User.authenticate()));

// mongoose.connect('mongodb://127.0.0.1:27017/product')
// .then(()=>{
//     console.log("Connected to DB")
// })
// .catch((err)=>{
//     console.log("DB error");
//     console.log(err)
// })



mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => console.error("❌ DB error:", err));

//seeding database
// seedDB();

app.use(productRoutes)
app.use(reviewRoutes)
app.use(authRoutes)
app.use(cartRoutes)
app.use(paymentRoutes)
// app.use(aboutRoutes);

app.use('/about', aboutRoutes);
app.use('/', homeRoutes);
app.use(contactRoutes);

app.get('/', (req, res) => {
    res.redirect('/home');
});


app.listen(8080,()=>{
    console.log("server connected at 8080")
})





