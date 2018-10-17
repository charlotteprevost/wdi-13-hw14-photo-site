const express = require('express');
const router = express.Router();

const User = require('../models/userModel.js');


// ********************************************************************
// ************************** RESTFUL ROUTES **************************
// ********************************************************************

// ******************** USER INDEX ROUTE ********************

router.get('/', (req, res) => {
	User.find({}, (err, allUsers) => {
		res.render('../views/userViews/index.ejs', {
			users: allUsers
		});
	})
});


// ******************** USER NEW ROUTE ***********************


// ******************** USER SHOW ROUTE **********************


// ******************** USER EDIT ROUTE **********************


// ******************** USER CREATE ROUTE ********************


// ******************** USER UPDATE ROUTE ********************


// ******************** USER DELETE ROUTE ********************





module.exports = router;