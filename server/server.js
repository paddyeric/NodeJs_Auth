const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth');

const {User} = require('./models/user'); //import from user.js
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


 //function to find or compare email and password in the database to check if it matches or not
app.post('/api/user/login',(req, res)=>{

    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) res.json({message: 'auth failed, user not found'});

        user.comparePassword(req.body.password, (err,isMatch)=>{
            if(err) throw err;
            if(!isMatch) return res.status(400).json({
                message:'wrong password'
            });

            res.status(200).send(isMatch);
        })
    })
})



const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`started on port ${port}`);
})