const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth');

app.use(bodyPaser.json());


app.get('/api/movies',(req,res)=>{
    const movie ={
        title: 'Titanic',
        actor: 'jake',
        genre: 'drama',
        location: 'america'
    }
    res.send(movie)
})

app.post('/api/movies',(req,res)=>{
    console.log(req.body)
    res.sendStatus(200)
})


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`started on port ${port}`);
})