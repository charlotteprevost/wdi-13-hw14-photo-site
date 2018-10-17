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

router.get('/new', (req, res) => {
	res.render('../views/userViews/new.ejs')
});


// ******************** USER SHOW ROUTE **********************

router.get('/:id', (req, res) => {
	User.findById(req.params.id,
		(err, foundUser) => {
			if (err) {console.log(`-------------------- Error --------------------\n`, err);}
			else {
				console.log(`-------------------- foundUser --------------------\n`, foundUser);
				res.render('../views/userViews/show.ejs', {
					user: foundUser
				});
			}
		})
})

// ******************** USER EDIT ROUTE **********************


// ******************** USER CREATE ROUTE ********************

router.post('/', (req, res) => {
	User.create(req.body,
		(err, createdUser) => {
			if (err) {console.log(`-------------------- Error --------------------\n`, err);}
			else {
				console.log(`-------------------- createdUser --------------------\n`, createdUser);
				res.redirect('/users');
			}
		})
})

// ******************** USER UPDATE ROUTE ********************


// ******************** USER DELETE ROUTE ********************





module.exports = router;