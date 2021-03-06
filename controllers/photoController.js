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
		console.log(`allUsers\n`,allUsers);
			res.render('../views/photoViews/new.ejs', {
      users: allUsers
    });
	});
});


// ******************** PHOTO SHOW ROUTE **********************

router.get('/:id', (req, res) => {
	Photo.findById(req.params.id, (err, foundPhoto) => {
		User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
			if (err) {console.log(`---------- Error ----------\n`, err);}	
			else {
				console.log(`---------- foundUser ----------\n`, foundUser);
				res.render('../views/photoViews/show.ejs', {
					photo: foundPhoto,
					user: foundUser
				})
			}
		});
	});
});


// ******************** PHOTO EDIT ROUTE **********************

router.get('/:id/edit', (req, res) => {
	Photo.findById(req.params.id, (err, foundPhoto) => {
		User.find({}, (err, allUsers) => {
			User.findOne({'photos._id': req.params.id}, (err, foundPhotoUser) => {
				if (err) {console.log(`---------- Error ----------\n`, err);}	
				else {
					console.log(`---------- foundPhotoUser ----------\n`, foundPhotoUser);
					res.render('../views/photoViews/edit.ejs', {
						photo: foundPhoto,
						users: allUsers,
						photoUser: foundPhotoUser
					});
				}
			});
		});
	});
});


// ******************** PHOTO CREATE ROUTE ********************

router.post('/', (req, res) => {
	User.findById(req.body.userId, (err, foundUser) => {
		Photo.create(req.body, (err, createdPhoto) => {
			if (err) {console.log(`---------- Error ----------\n`, err);}	
			else {
				console.log(`---------- Created PHOTO ----------\n`, createdPhoto);
				foundUser.photos.push(createdPhoto);
				foundUser.save((err, data)=>{
					res.redirect('/photos');					
				});
			}	
		});
	});
});


// ******************** PHOTO UPDATE ROUTE ********************

router.put('/:id', (req, res) => {
	Photo.findByIdAndUpdate(req.params.id, (err, updatePhoto) => {
		User.findById(req.body.userId, (err, foundUser) => {
			Photo.create(req.body, (err, createdPhoto) => {
				foundUser.photos.push(createdPhoto);
				foundUser.save((err, data) => {
					res.redirect('/photos')
				});
			});
		});
	});
});


// ******************** PHOTO DELETE ROUTE ********************

router.delete('/:id', (req, res) => {
	Photo.findByIdAndDelete(req.params.id, (err, deletedPhoto) => {
		if (err) {console.log(`---------- Error ----------\n`, err);}	
		else {
			console.log(`---------- Deleted PHOTO ----------\n`, deletedPhoto);

			// Find user and delete photo from that user
			User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
				foundUser.photos.id(req.params.id).remove();
					foundUser.save((err, data)=>{
						res.redirect('/photos');					
					});	
			});
		}	
	})
})








module.exports = router;