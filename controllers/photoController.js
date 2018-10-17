const express = require('express');
const router = express.Router();

const Photo = require('../models/photoModel.js');
const User = require('../models/userModel.js');

// ********************************************************************
// ************************** RESTFUL ROUTES **************************
// ********************************************************************

// ******************** PHOTO INDEX ROUTE *********************

router.get('/', (req, res) => {
	Photo.find({}, (err, allPhotos) => {
		res.render('../views/photoViews/index.ejs', {
			photos: allPhotos
		});
	});
});


// ******************** PHOTO NEW ROUTE ***********************

router.get('/new', (req, res) => {
	User.find({}, (err, allUsers) => {
			res.render('../views/photoViews/new.ejs', {
      users: allUsers
    });
	});
});

// ******************** PHOTO SHOW ROUTE **********************
// ******************** PHOTO EDIT ROUTE **********************
// ******************** PHOTO CREATE ROUTE ********************

router.post('/', (req, res) => {
	User.findById(req.body.userId, (err, foundUser) => {
		Photo.create(req.body, (err, createdPhoto) => {
			if (err) {console.log(`---------- Error ----------\n`, err);}	
			else {
				console.log(`---------- Created PHOTO ----------\n`, createdPhoto);
				foundUser.photos.push(createdPhoto);
				found.save((err, data)=>{
					res.redirect('/photos');					
				})
			}	
		})
	})
})

// ******************** PHOTO UPDATE ROUTE ********************
// ******************** PHOTO DELETE ROUTE ********************










module.exports = router;