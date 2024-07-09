const path = require('path');
const fs = require('fs');

let dataPath = path.join(__dirname,`../dev-data/data`);
const toursAll = JSON.parse(fs.readFileSync(`${dataPath}/tours-simple.json`));


exports.checkBody = (req,res,next)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status:'failed',
            message:'name and price are required'
        })
    }
    next();
}



exports.getAllTours = (req,res)=>{
    console.log(req.requestTime);
    res.status(200);
    res.json({
        status: 'success',
        results: toursAll.length,
        requestedTime: req.requestTime,
        data:{
            tours: toursAll
        }
    })
}


exports.getTour = (req,res)=>{
    if(req.params.id>toursAll.length-1){
        res.status(404);
        res.json({
            status:'fail',
            message:'Invalid ID'
        })
        return;
    }
    const tour = toursAll.find((el)=>{
        return el.id == req.params.id
    })
    console.log(tour);
    console.log(typeof(tour));
    res.status(200);
    res.json({
        status: 'success',
        data: {
            tour
        }
    })
}

exports.createTour = (req,res)=>{
    const newId = toursAll[toursAll.length-1].id+1
    const newTour = Object.assign({id:newId},req.body);
    
    toursAll.push(newTour);
    fs.writeFile(`${dataPath}/tours-simple.json`,JSON.stringify(toursAll),(err)=>{
        res.status(201);//which means created
        res.json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
    // console.log(req.body);
    // res.send('done');
}

exports.updateTour = (req,res)=>{
    if(req.params.var>toursAll.length-1){
        res.status(404);
        res.json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    const patchTour = toursAll.find((element)=>{
        if(element.id==req.params.id){
            return element;
        }
    })
    const obj = req.body;
    const keys = Object.keys(obj);
    keys.forEach((key)=>{
        patchTour[key] = obj[key];
    })
    toursAll[req.params.var]=patchTour;
    fs.writeFile(`${dataPath}/tours-simple.json`,JSON.stringify(toursAll),(err)=>{
        if(err){
            console.log(err);
            res.status(500);
            res.json({
                status: 'fail',
                message: 'Internal server error'
            })
        }else{
            res.status(200);
            res.json({
                status: 'success',
                updated: 'yes',
                data: {
                    tour: patchTour
                }
            })
            
        }
    });
}  
