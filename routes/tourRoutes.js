const express = require('express');
const fs = require('fs');
const tourController = require('../controllers/tourController');

const router = express.Router(); //creating a router middleware

router.param('id', tourController.checkID); //middleware to check if the id is valid or not before executing the route handler

/**so .param is the function provided by Express where you can access a certain parameter persent in the route and run  middleware only when that param is found */
router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);
//we write / because we are already in the /api/v1/tours route as router middleware is mounted on it
router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);



module.exports = router; //exporting the router middleware