const bcrypt = require('bcrypt');
//import (crypto-js) to setup the token
const {MD5} = require('crypto-js');
//import (jsonwebtoken) to setup
const jwt = require('jsonwebtoken');


// bcrypt.genSalt(10,(err,salt)=>{
//     if(err) return next(err);

//     bcrypt.hash('password123',salt,(err,hash)=>{
//         if(err) return next(err);
//         console.log(hash);
//     })
// })

//how to generate a token password
// const secret = 'mysecretpassword';
// const seretSalt = 'djekdjjejnnfjenn';

// const user = {
//     id:1,
//     token: MD5('SDFSFSDFSDF').toString() + seretSalt
// }

// const receivedToken = 'bc18c7df1f4df074829b453f0db4757ddjekdjjejnnfjenn';
// if(receivedToken === user.token){
//     console.log('move forward')
// }
// console.log(user);

//How to use the (jsonwebtoken) 
const id = '1000'
const secret = 'supersecret'

const receivedToken = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y';

const token = jwt.sign(id,secret); //encode
const decodeToken = jwt.verify(receivedToken, secret) //decode to check if the token is correct

console.log(decodeToken);