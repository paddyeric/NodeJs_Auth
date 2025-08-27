const mongoose = require('mongoose');

//hash password imports
const bcrypt = require('bcrypt');
const SALT_I = 10;


const userSchema = mongoose.Schema({
    email:{
        type: String,
        require: true,
        trim: true,
        unique: 1,
    },
    password:{
        type: String,
        require: true,
        minlength: 6,
    }
})

// //hash password functions
userSchema.pre('save',function(next){
    var user = this; 

    bcrypt.genSalt(SALT_I, function(err,salt){
        if(err) return next(err);

        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            user.password = hash;
            next();
        })
    })
})



const User = mongoose.model('User', userSchema);

module.exports = {User}; //export from user.js to server.js