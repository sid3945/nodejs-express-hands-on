    fs = require('fs');
const Tour = require('../models/tourModel');

//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/tours.json`)); commenting this bcz now we dont need dummy data from json

// Tour handlers
exports.getTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
    // Implement your delete logic here
};

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tours: tours
        }
    });
};

exports.createTour = (req, res) => {
    const newId = tours[tours.length-1].id + 1;
    const newTour = {
        id: newId,
        ...req.body
    };
    tours.push(newTour);
    fs.writeFile(`${__dirname}/../dev-data/data.json`, JSON.stringify(tours), err =>{
        res.status(201).json({
            status: 'success',
            data: {
                tours: "updated the new tour"
            }
        });
    });
};

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    if(val > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};