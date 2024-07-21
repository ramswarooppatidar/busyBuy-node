const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    "name" : {
        type : String
    },
    "username" : {
        type : String
    },
    "password" : {
        type : String
    },
    "cart" : {
        type : Array
    },
    "myOrder":{
        type : Array
    }
})

const User = mongoose.model('user', userSchema);
module.exports = {User}