const express = require('express');
const router = express.Router();

const Photo = require('../models/photoModel.js');
const User = require('../models/userModel.js');


// ********************************************************************
// ************************** RESTFUL ROUTES **************************
// ********************************************************************

// ******************** USER INDEX ROUTE ********************

router.get('/', (req, res) => {
	User.find({}, (err, allUsers) => {
		if (err) {console.log(`-------------------- Error --------------------\n`, err);}
		else {
			console.log(`-------------------- allUsers --------------------\n`, allUsers);
			res.render('../views/userViews/index.ejs', {
				users: allUsers
			});
		}
	})
});


// ******************** USER NEW ROUTE ***********************

router.get('/new', (req, res) => {
	res.render('../views/userViews/new.ejs')
});


// ******************** USER SHOW ROUTE **********************

router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		if (err) {console.log(`-------------------- Error --------------------\n`, err);}
		else {
			console.log(`-------------------- foundUser --------------------\n`, foundUser);
			res.render('../views/userViews/show.ejs', {
				user: foundUser
			});
		}
	})
});


// ******************** USER EDIT ROUTE **********************

router.get('/:id/edit', (req, res) => {
	User.findById(req.params.id, (err, editUser) => {
		if (err){console.log(`-------------------- Error --------------------\n`, err);}
		else {
			console.log(`-------------------- editUser --------------------\n`, editUser);
			res.render('../views/userViews/edit.ejs', {
				user: editUser
			});
		}
	})
});


// ******************** USER CREATE ROUTE ********************

router.post('/', (req, res) => {
	User.create(req.body, (err, createdUser) => {
		if (err) {console.log(`-------------------- Error --------------------\n`, err);}
		else {
			console.log(`-------------------- createdUser --------------------\n`, createdUser);
			res.redirect('/users');
		}
	})
});


// ******************** USER UPDATE ROUTE ********************

router.put('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, (err, updateUser) => {
		if (err) {console.log(`-------------------- Error --------------------\n`, err);}
		else {
			console.log(`-------------------- updateUser --------------------\n`, updateUser);
			res.redirect('/users');
		}		
	})
});


// ******************** USER DELETE ROUTE ********************

router.delete('/:id', (req, res) => {
	User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
		if (err) {console.log(`-------------------- Error --------------------\n`, err);}
		else {
			console.log(`-------------------- deletedUser --------------------\n`, deletedUser);

			// Must also delete all photos associated to this user
			// Store those photoIds in a variable
			const photoIds = [];

			for (let i = 0; i < deletedUser.photos.length; i++){
				photoIds.push(deletedUser.photos[i].id);
			}

			Photo.deleteMany({_id: {$in: photoIds}});
			res.redirect('/users');
		}
	})
});
// WHY is THIS^ deleting the FIRST user?











module.exports = router;