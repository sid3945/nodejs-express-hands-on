const express = require('express');
const fs = require('fs');

const router = express.Router(); //creating a router middleware

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/tours.json`, 'utf-8'));

// Tour handlers
getTour = (req, res) => {
    const id = parseInt(req.params.id);
    const tour = tours.find(el => el.id === id);

    if(id > tours.length || !tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    });
};

updateTour = (req, res) => {
    if(req.params.id > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: 'Updated tour'
        }
    });
};

deleteTour = (req, res) => {
    // Implement your delete logic here
};

getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tours: tours
        }
    });
};

createTour = (req, res) => {
    const newId = tours[tours.length-1].id + 1;
    const newTour = {
        id: newId,
        ...req.body
    };
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data.json`, JSON.stringify(tours), err =>{
        res.status(201).json({
            status: 'success',
            data: {
                tours: "updated the new tour"
            }
        });
    });
};

router
    .route('/')
    .get(getAllTours)
    .post(createTour);
//we write / because we are already in the /api/v1/tours route as router middleware is mounted on it
router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);



module.exports = router; //exporting the router middleware