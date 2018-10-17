const mongoose = require('mongoose');

const Photo = require('./photoModel.js')

const userSchema = new mongoose.Schema({
	username: {type: String, require: true, index: {unique: true}},
	password: {type: String, required: true},
	location: String,
	dob: String,
	photos: [Photo.schema]
});

/* Here maybe use https://stackoverflow.com/questions/14588032/mongoose-password-hashing
for user authentifications. Look up hash and SALT_WORK_FACTOR */

module.exports = mongoose.model('User', userSchema);