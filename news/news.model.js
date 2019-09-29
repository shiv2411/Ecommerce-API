const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Heading: { type: String },
    Subheading: { type: String },
    Text: { type: String },
    image: { type: String },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('News', schema,'news');