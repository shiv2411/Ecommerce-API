const express = require('express');
const router = express.Router();
const connection = require("../model/index");
const app = express();
const mongoose = require("mongoose");
const PlaceOrderModel = mongoose.model("PlaceOrder");
const PlaceOrder = connection.PlaceOrder;
var fs = require('fs');
var mv = require('mv');
var formidable = require('formidable');
//var upload_path = "./Images/PlaceOrder/";
const multiparty = require('multiparty');
//const { createInvoice } = require('./invoice.controller');

// routes
router.get("/getall", function (req, res) {

    PlaceOrderModel.find().then(list => res.json(list))
        .catch(err => res.status(500).json(" Server Error"))
})


router.post('/placeorder', app.post("/placeorder", (req, res) => {
    //console.log(req.body);
    /*var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // console.log(fields)
        // oldpath : temporary folder to which file is saved to
        var oldpath = files.image.path;
        var newpath = upload_path + files.image.name;
        // console.log(files.image.type)
        // copy the file to a new location
        mv(oldpath, newpath, function (err) {
            if (err) throw err;
            // you may respond with another html page*/

    console.log(req.body);
    var now = new Date();

    var placeorder = new PlaceOrderModel(
    );
    placeorder.orderID = now.getDate() + '' + now.getMonth() + '' + now.getFullYear() + '' + req.body.User.userId + '' + now.getMilliseconds()
    placeorder.User = req.body.User;
    placeorder.Cakes = req.body.Cakes;
    placeorder.Address = req.body.Address;
    placeorder.Price = req.body.Price;
    placeorder.save()
        .then(result => {
            console.log('came here')
            console.log(result)
            //createInvoice(result, "./Images/invoice.pdf");
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });
    res.send("Order placed Successfully");

})
);


module.exports = router;

router.post('/update/:id', app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    PlaceOrderModel.findOne({ orderID: id }, function (err, PlaceOrder) {
        if (err) {
            console.log(err)
            res.status(500).send()
        }
        else {
            if (!PlaceOrder) {
                res.status(404).send("OrderId Not Found")
            } else {
                if (req.body.User) {
                    PlaceOrder.User = req.body.User;
                }

                if (req.body.Cakes) {
                    PlaceOrder.Cakes = req.body.Cakes;

                }
                if (req.body.Address) {
                    PlaceOrder.Address = req.body.Address;
                }
                if (req.body.Price) {
                    PlaceOrder.Price = req.body.Price;
                }

                PlaceOrder.save(function (err, updatedObject) {
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
/*router.get('/invoice/:id', app.post("/invoice/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    PlaceOrderModel.findOne({ orderID: id }, function (err, PlaceOrder) {
        if (err) {
            console.log(err)
            res.status(500).send()
        }
        else {
            if (!PlaceOrder) {
                res.status(404).send("OrderId Not Found")
            } else {
                //createInvoice(PlaceOrder, "invoice.pdf");
                res.send("pdf");
            }
        }
    })
})   ) */



/*router.post('/delete/:id', app.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    PlaceOrderModel.findOneAndRemove({ _id: id }, function (err) {
        if (err) {
            console.log(err)
            res.status(500).send()
        }
        else {
            res.status(200).send("Deleted Succesfully");
        }


    }
    )
})))*/