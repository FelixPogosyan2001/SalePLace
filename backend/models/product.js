const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    views : {
        type : Number,
        required : true
    },
    likes : {
        type : Number,
        required:true
    },
    category : {
        type : String,
        required : true
    },
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
})

module.exports = mongoose.model("Product",productSchema)