const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
var fs = require('fs');
var path = require('path');   

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();


// Put data to mongoDB
let rawdata = fs.readFileSync('../city_data.json');
let cities = JSON.parse(rawdata);



// this is our MongoDB database
const dbRoute =
  'mongodb+srv://reggiehsu111:abcd1234@m1631-cgddj.azure.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  async function transfer(){
    let transferData = {}
    await for (var key in cities) {
      transferData[key] = cities[key]['city']['geo'];
    }
    res.send(transferData);
  }
  
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create method
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { city, geo } = req.body;

  data.geo= geo;
  data.city = city;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
