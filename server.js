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

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`
    ----------------------------------
    | Server is running on port ${port} |
    ----------------------------------`);
});