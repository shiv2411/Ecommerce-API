const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Category: { type: String },
	SubCategory: { type: String },
	Type:{type:String},
	Shape: { type: String },
    Name: { type: String },
    Price: { type: String },
    image: { type: String },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Cakes', schema,'cakes');