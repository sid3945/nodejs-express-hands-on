const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); //middleware; to modify the incoming data

const hotels = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'));

console.log(typeof hotels);

app.get('/api/v1/hotels', (req, res)=>{
    res.status(200).json({
        status: 'success',
        data: {
            hotels: hotels
        }
    });
});

app.get('/api/v1/hotels/:id', (req, res)=>{
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
});

app.post('/api/v1/hotels', (req, res)=>{
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
});

app.patch('/api/v1/hotels/:id', (req, res)=>{
    
})

const port = 3000;
app.listen(port, () => {
    console.log(`
    ----------------------------------
    | Server is running on port ${port} |
    ----------------------------------`);
});