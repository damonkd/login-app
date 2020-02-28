const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const User = require('./models/User.js');
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get('/api/home', function(req, res) {
    res.send('Welcome!');
  });
  app.get('/api/secret', function(req, res) {
    res.send('The password is potato');
  });

  // POST route to register a user
app.post('/api/register', function(req, res) {
    const { email, password } = req.body;
    const user = new User({ email, password });
    user.save(function(err) {
      if (err) {
        res.status(500)
          .send("Error registering new user please try again.");
      } else {
        res.status(200).send("Welcome to the club!");
      }
    });
  });



const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost/react-auth';
mongoose.connect(mongo_uri, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});