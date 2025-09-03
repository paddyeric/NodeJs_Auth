const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //import (bcrypt) to hash passwords
const jwt = require('jsonwebtoken'); //import (jsonwebtoken) to create a token
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
    },
    token:{
        type:String
    }
})

//hash password function
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

//function to compare if the password matches or not
userSchema.methods.comparePassword = function(candidatePassword, cb){

    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
            if(err) throw cb(err);
            cb(null,isMatch)
        })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'supersecret');

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user)
    })
}



const User = mongoose.model('User', userSchema);

module.exports = {User}; //export from user.js to server.js