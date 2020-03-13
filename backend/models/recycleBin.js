const mongoose = require('mongoose');

const recycleSchema = new mongoose.Schema({
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('RecycleBin',recycleSchema);

