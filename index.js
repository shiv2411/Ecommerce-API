const connection = require("./model");
var session = require('express-session');
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const UserModel = mongoose.model("User");
const NewsModel = mongoose.model("News");
const CategoryModel = mongoose.model("Category");
const errorHandler = require('./helpers/error-handlers');

app.use(bodyParser.urlencoded({ extended: true }));

// global error handler
app.use(errorHandler);

app.listen("3000", () => {
    console.log("Server started");
}
);
app.use('/news', require('./news/news.controller'));
app.use('/offers', require('./offers/offers.controller'));
app.use('/cakes', require('./cakes/cakes.controller'));
app.use(session({
    secret: 'k344kk44k4k4h44',
    resave: true,
    saveUninitialized: true
}));

app.get("/", (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})
app.get("/register.html", (req, res) => {
    res.sendFile('register.html', { root: __dirname })
})
app.get("/login.html", (req, res) => {
    res.sendFile('login.html', { root: __dirname })
})


app.post("/register", (req, res) => {
    console.log(req.body);
    var newuser = new UserModel();
    newuser.email = req.body.email;
    newuser.hash = req.body.password;
    newuser.firstName = req.body.fname;
    newuser.lastName = req.body.lname;

    newuser.save();
    res.send("User Registered Successfully");

})

/*app.post("/newsregister", (req, res) => {
    console.log(req.body);
    var news = new NewsModel();
    news.Heading = req.body.heading;
    news.Subheading = req.body.subheading;
    news.Text = req.body.text;
    news.image = req.body.image;
   news.save();
    res.send("News Registered Successfully");

})*/

app.post("/categoryregister", (req, res) => {
    console.log(req.body);
    var category = new CategoryModel();
    category.Category = req.body.category;
    category.Price = req.body.price;
    category.Name = req.body.name;
    category.image = req.body.image;
    category.save();
    res.send("Category Registered Successfully");

})
app.get("/getall", (req, res) => {
    
    var newuser = new UserModel();
    UserModel.find({},function(err,foundData){
        if(err){
            res.status(404).send();
        }
        else
        res.send(foundData)

    })
    

})
app.post('/auth', function (req, res) {
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
        UserModel.findOne({ email: email, hash: password }, function (err, user) {

            if (err) {
                console.log(err)
                res.status(500).send()
            }
            if (!user) {
                res.send("Either Username or Password is Incorrect")
            }
            else {

                req.session.loggedin = true;
                req.session.email = email;
                res.redirect('/');
            }
        }
        )
    }
});