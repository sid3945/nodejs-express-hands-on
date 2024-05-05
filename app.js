const fs = require('fs');
const express = require('express');

const app = express();
const tourRouter  = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes'); //so we import router frm routes file and mount it over a specific route 

app.use(express.json()); //middleware; to modify the incoming data

/**app.use((req, res, next)=>{
    console.log('Hello from the middleware, middleware stack strictly follows the order of the code while being executed');
    req.requestTime = new Date().toISOString();
    next();
});

app.use((req, res, next)=>{
    console.log('Hello from the second middleware');
    console.log(req);
    next();
}); */

const hotels = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/users.json`, 'utf-8'));


getAllHotels = (req, res)=>{
    res.status(200).json({
        status: 'success',
        data: {
            hotels: hotels
        }
    });
};

getHotel = (req, res)=>{
    console.log(req.params);
    const id = parseInt(req.params.id);
    const hotel = hotels.find(el => el.id === id);

    if(id>hotels.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    if(!hotel){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            hotel: hotel
        }
    });
};

updateHotels = (req, res)=>{
    console.log(req.body);
    const newId = hotels[hotels.length-1].id + 1;
    const newHotel = {
        id: newId,
        ...req.body
    };
    hotels.push(newHotel);
    fs.writeFile(`${__dirname}/dev-data/data.json`, JSON.stringify(hotels), err =>{
        res.status(201).json({
            status: 'success',
            data: {
                hotels: "updated the new hotel"
            }
        });
    });
};

updateHotel= (req, res)=>{
    if(req.params.id > hotels.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            hotel: 'Updated hotel'
        }
    });
};

app.get('/api/v1/hotels', getAllHotels);

app.get('/api/v1/hotels/:id', getHotel);

app.post('/api/v1/hotels', updateHotels);

app.patch('/api/v1/hotels/:id', updateHotel)


// an even better way to write the above code is:

app.route('/api/v1/hotels')
.get(getAllHotels)
.post(updateHotels);

app.route('/api/v1/hotels/:id')
.get(getHotel)
.patch(updateHotel);
//in essence we have separated the handler functions of the routes from the routes


app.use('/api/v1/tours', tourRouter); //mounting the app over the tourRouter middleware
    /**so we are using the middleware called tourRouter for the route '/api/v1/tours' */
app.use('/api/v1/users', userRouter);

module.exports = app; //exporting the app module to server file where the express will be started