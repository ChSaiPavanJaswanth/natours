const path = require('path');
const fs = require('fs');
const Tour = require('./../models/tourModel');
const mongoose = require('mongoose');
const { match } = require('assert');
const APIFeatures = require('./../utils/apiFeatures');

// let dataPath = path.join(__dirname, `../dev-data/data`);
// const toursAll = JSON.parse(fs.readFileSync(`${dataPath}/tours-simple.json`));

// exports.checkBody = (req, res, next) => {
//    //This function is no longer needed, because mongoDb itself checks all of it and looks for errors
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'failed',
//       message: 'name and price are required',
//     });
//   }
//   next();
// };

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,-price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // EXECUTE QUERY

    const features = new APIFeatures(Tour.find(), req.query) // USING THE tour.find() we passed in the query object
      .filter()
      .sort()
      .fieldLimit()
      .paginate();

    const allTours = await features.query;

    res.status(200).json({
      status: 'success',
      result: allTours.length,
      data: {
        tours: allTours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //ELSE WE CAN WRITE IT SIMILAR TO THE MONGODB LEARNING COURSE
    //Tour.findOne({_id: req.params.id})
    //THE ABOVE ONE ALSO RETURNS THE SAME RESULT
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // console.log(req.body);
    const newTour = await Tour.create(req.body);
    res.status(201); //which means created
    res.json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400);
    res.json({
      status: 'fail',
      msg: 'invalid data sent',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'invalid request',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    //IN A RESTFUL API, ITS NOT A COMMON PRACTICE TO SEND
    //DATA, BACK TO THE CLIENT
    console.log('hello');
    await Tour.deleteOne({ _id: req.params.id });
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'invalid id',
    });
  }
};
