// Express
const express = require('express');
const app = express();

// MiddleWare
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Database
require('./db/db.js');


app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

// Add CSS through 'public' directory
app.use(express.static('public'));


// Controllers
const userController = require('./controllers/userController.js');
const photoController = require('./controllers/photoController.js');
app.use('/users', userController);
app.use('/photos', photoController);


// Home Page
app.get('/', (req, res) => {
	res.render("../views/home.ejs")
});


// PORT
app.listen(3000, () => {
	console.log(`Listening on port 3000`);
});