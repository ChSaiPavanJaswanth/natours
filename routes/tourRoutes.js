const express = require('express');
// const {getAllTours,getTour,createTour,updateTour} = require('./../controllers/tourController');
const tourController = require('./../controllers/tourController');
// console.log(tourController);
// console.log(typeof(tourController));
const router = express.Router();
const app = require('./../app');
router.param('id', (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  next();
});

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour);

module.exports = router;
