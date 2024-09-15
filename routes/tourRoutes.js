const express = require('express');
// const {getAllTours,getTour,createTour,updateTour} = require('./../controllers/tourController');
const tourController = require('./../controllers/tourController');
// console.log(tourController);
// console.log(typeof(tourController));
const router = express.Router();
const app = require('./../app');
// router.param('id', (req, res, next, val) => {
//   console.log(`Tour id is ${val}`);
//   next();
// });

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  // .post(tourController.checkBody, tourController.createTour);
  .post(tourController.createTour, tourController.updateTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
