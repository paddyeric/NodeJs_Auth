const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //import (bcrypt) to hash passwords
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



const User = mongoose.model('User', userSchema);

module.exports = {User}; //export from user.js to server.js