const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

mongoose.connect('mongodb+srv://ruthvik:ruthvik@cluster1.onhko9g.mongodb.net/ecom');
const db = mongoose.connection;

const dataSchema = new mongoose.Schema({
  cn: String,
  clientName: String,
  name: String,
  cf: Number,
  ml: Number,
  jan: Number,
  feb: Number,
  mar: Number,
  apr: Number,
  may: Number,
  jun: Number,
  jul: Number,
  aug: Number,
  sep: Number,
  oct: Number,
  nov: Number,
  dec: Number,
  jan_ml: Number,
  feb_ml: Number,
  mar_ml: Number,
  apr_ml: Number,
  may_ml: Number,
  jun_ml: Number,
  jul_ml: Number,
  aug_ml: Number,
  sep_ml: Number,
  oct_ml: Number,
  nov_ml: Number,
  dec_ml: Number,
  aLeaves: Number,
  mLeaves: Number,
});

const InputData = mongoose.model('InputData', dataSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/search', (req, res) => {
    const searchName = req.body.search_name;
  
    InputData.findOne({ name: searchName }).exec()
      .then(result => {
        if (result) {
          res.render('result', { result: result });
        } else {
          res.render('result', { error: "No data found for the given name." });
        }
      })
      .catch(err => {
        res.render('Please check the spelling');
      });
  }); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
