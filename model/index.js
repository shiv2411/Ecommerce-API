const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/node-mongoapi",{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,},(error)=>{
    mongoose.Promise = global.Promise;
if(!error){
console.log("connection succeded")
}
else{
    console.log("connection failed")
}
})

const User=require("./users.model")
const News=require("./news.model")
const Category=require("./category.model")
const Offers=require("./offers.model")
const Cakes=require("./cakes.model")