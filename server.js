// npm packages needed to install
// npm init -y
// npm install mongoose express axios morgan concurrently -S
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080; // which port to start the server on

// MongoDB Atlas connection (make sure this isn't exposed, dw about it rn)
// User: bobaAdmin
// Pass: iloveboba
// db: boba_db
// cluster: BobaCluster
const MONGODB_URI = 'mongodb+srv://bobaAdmin:iloveboba@bobacluster.hgeik.azure.mongodb.net/boba_db?retryWrites=true&w=majority';

// have mongoose connect to a server
// if using personal mongodb, make sure to have mongodb on
mongoose.connect(MONGODB_URI || 'mongodb://localhost/boba_storage', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
 
// message to say if connected, if don't see, mongoose is not connected
mongoose.connection.on('connected', () => {
    console.log('Mongoose succesfully connected!!');
});


// Schema
// how data should be stored
const Schema = mongoose.Schema;
const bobaSchema = new Schema({
    name: String,
    location: {
        latitude: String,
        longitude: String,
    }
});

// Models
// reference to specific Schema
const bobaModel = mongoose.model('bobaModel', bobaSchema);


const data = {
    name: "Boba Guys",
    location: {
        latitude: "31.24124",
        longitude:"-42.4124"
    }
};
/*
// instance the model
const newBobaModel = new bobaModel(data);
// .save() data into the database
newBobaModel.save((error) => {
    if(error) {
        console.log('Something wrong happened and data was not saved');
    } else {
        console.log('Data has been saved!');
    }
});
*/

// HTTP request logger
// any HTTP request will be logged into the console
app.use(morgan('tiny'));

// example routes 
// in URL do: localhost:8080/...
app.get('/name', (req, res) => {
    const data = {
        name: 'Alex',
        age: '21'
    }
    res.json(data); // return data as json when at route
});

app.get('/name/blah', (req, res) => {
    const data = {
        stuff: 'blah',
        things: 'blah'
    }
    res.json(data); // return data as json when at route
});

app.get('/data', (req, res) => {

    bobaModel.find({ }) 
        .then((data) => {
            console.log('Data: ', data);
            res.json(data); // return data as json when at route
        })
        .catch((error) => {
            console.log('error');
        });
    
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
