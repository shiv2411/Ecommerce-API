const express = require('express');
const router = express.Router();
const connection = require("../model/index");
const app = express();
const mongoose = require("mongoose");
const CakesModel = mongoose.model("Cakes");
const Cakes = connection.Cakes;
// routes
router.get("/getall",function(req,res){
    CakesModel.find().then(list=>res.json(list))
    .catch(err=>res.status(500).json(" Sever Error"))
})
    
    
router.post('/cakesregister', app.post("/cakesregister", (req, res) => {
    console.log(req.body);
    var cakes = new CakesModel();
    cakes.Category = req.body.category;
    cakes.SubCategory = req.body.subcategory;
    cakes.Text = req.body.text;
    cakes.Image = req.body.image;
    cakes.Shape = req.body.shape;
    cakes.Price = req.body.price;
    cakes.Type = req.body.type;

    cakes.save();
    res.send("Cakes Registered Successfully");

}));


module.exports = router;

router.post('/update/:id', app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    CakesModel.findOne({ _id: id }, function (err, cakes) {
        if (err) {
            console.log(err)
            res.status(500).send()
        }
        else {
            if (!cakes) {
                res.status(404).send("Cake Not Found")
            } else {
                if (req.body.category) {
                    cakes.Category = req.body.category;
                }

                if (req.body.subcategory) {
                    cakes.SubCategory = req.body.subcategory;

                }
                if (req.body.text) {
                    cakes.Text = req.body.text;
                }
                if (req.body.image) {
                    cakes.Image = req.body.image;
                }
                if (req.body.shape) {
                    cakes.Shape = req.body.shape;
                }
                if (req.body.price) {
                    cakes.Price = req.body.price;
                }

                cakes.save(function (err, updatedObject) {
                    if (err) {
                        res.status(500).send("Update Unsuccesfull")
                    }
                    else {
                        res.status(200).send(updatedObject);
                    }
                })
            }
        }
    })

}
)
);
router.post('/delete/:id', app.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    CakesModel.findOneAndRemove({ _id: id }, function (err) {
        if (err) {
            console.log(err)
            res.status(500).send()
        }
        else {
            res.status(200).send("Deleted Succesfully");
        }
       

}
)
}))
