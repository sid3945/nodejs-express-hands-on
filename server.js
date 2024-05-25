const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const mongoose = require('mongoose');
const DB = process.env.DATABASEURL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {  
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log("Database connection successful!");
});

//mongoose is an Object Data Modelling (ODM) library 

//mongoose is all about models, to create a document in the collection, we need to create a model and model is created using schema
//A schema in Mongoose is a structure that defines the shape of the data in MongoDB. It specifies the fields available in the documents along with their types, default values, validators, etc.

//A model, on the other hand, is a constructor compiled from the Schema definitions. An instance of a model represents a document in MongoDB. You can create, read, update, and delete documents in the database using models.
// const tourSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: [true, 'A tour must have a name'],
//         unique: true
//     },
//     rating:{
//         type: Number,
//         default: 4.5
//     },
//     price:{
//         type: Number,
//         required: [true, 'A tour must have a price']
//     }
// }); 
//the above snippet for tourSchema is moved to models/tourModel.js where all the schemas are defined

// const Tour = mongoose.model('Tour', tourSchema);

// const testTour = new Tour({
//     name: 'The Park Camper',
//     price: 997
// }).save().then(doc => {
//     console.log(doc);
// }).catch(err => {
//     console.log('Error:', err);
// })
// the above code creates a new document in the collection testTour that is created from the model Tour whose schema is tourSchema

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`
    ----------------------------------
    | Server is running on port ${port} |
    ----------------------------------`);
});