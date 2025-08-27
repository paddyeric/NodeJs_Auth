const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth');

//imported file from user.js
const {User} = require('./models/user');
app.use(bodyPaser.json());


app.post('/api/user',(req,res)=>{

    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    user.save((err,doc)=>{
        if(err) res.status(400).send(err);
        res.status(200).send(doc)
    })
})


// //We created a new route for it ('/api/user/login')
app.post('/api/user/login',(req, res)=>{

    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) res.json({message: 'auth failed, user not found'});

        // //how to search or compare email and password in the database to check if it matches or not
        bcrypt.compare(req.body.password, user.password,(err,isMatch)=>{
            if(err) throw err;
            if(err) res.json(
                {message: 'auth failed, user not found'});

            if(!isMatch) return res.status(400).json(
                {message: 'wrong password'})
            res.status(200).send(isMatch)
        })
    })
})





const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`started on port ${port}`);
})