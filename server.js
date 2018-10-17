// Express
const express = require('express');
const app = express();


// Database
require('./db/db.js');


// MiddleWare
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


// Controllers
const userController = require('./controllers/userController.js');
app.use('/users', userController);
const photoController = require('./controllers/photoController.js');
app.use('/photos', photoController);


// Home Page
app.get('/', (req, res) => {
	res.render("../views/home.ejs")
});


// PORT
app.listen(3000, () => {
	console.log(`Listening on port 3000`);
});