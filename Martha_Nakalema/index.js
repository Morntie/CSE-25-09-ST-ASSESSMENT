//1. dependencies
const express = require('express');
const flash = require('connect-flash');
const path = require("path")
const mongoose = require('mongoose');
require('dotenv').config();

//Routes imports declarations
const musicRoutes = require('./routes/musicRoute.js');


//2. Instantiations: This defines and insitialise "app" & port(Shd be at start of the app). 
const app = express();
const port = 3002;


//Database connections
mongoose.connect(process.env.MONGO_URI);
mongoose.connection
    .once('open', () => {
        console.log('mongoose connection open')
    })
    .on("error", (error) => {
        console.error(`connection error:${error.message}`)
    });


//4. Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


//set view engine to pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); 


//5. Routes
app.use('/', musicRoutes);


// Connect flash middleware
app.use(flash());

// Make flash messages available to all your view templates
app.use(flash());
app.use((req, res, next) => {
  res.locals.error_msg = req.flash('error_msg');
  res.locals.success_msg = req.flash('success_msg'); 
  next();
});

app.listen(port, () => console.log(`listening on port ${port}`));