// Express
const express = require('express');
const app = express();

// Database
require('./db/db.js');

// MiddleWare
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


// Home Page
app.get('/', (req, res) => {
	res.render("../views/home.ejs")
});


// Controllers
const userController = require('./controllers/userController.js');
app.use('/users', userController);



// PORT
app.listen(3000, () => {
	console.log(`Listening on port 3000`);
});