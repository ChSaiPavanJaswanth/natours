const fs = require('fs');
const path = require('path');
const express = require('express');
const { create } = require('domain');

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

const port = 3000
 

app.use((req,res,next)=>{
    console.log('hello from the middleware');
    //If we dont write next here, the request and response cycle will be stuck here
    next();
})      

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})
 

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);


module.exports = app