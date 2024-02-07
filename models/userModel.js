const mongoose = require('mongoose');

const usertSchema = mongoose.Schema({
username: {
    type: String,
    required:[true, "please add the username"]
},
email: {
    type: String,
    required:[true, "please add the email"],
    unique: [true, "email already taken"]
},
password: {
    type: String,
    required:[true, "please add the password"]
}


},
{
    timestamps: true,
},

);


module.exports = mongoose.model('User', usertSchema);