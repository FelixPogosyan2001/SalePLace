const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    lastname: String,
    gender: String,
    avatar: String,
    dialogs: Array,
    createdProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

module.exports = mongoose.model("User", userSchema);