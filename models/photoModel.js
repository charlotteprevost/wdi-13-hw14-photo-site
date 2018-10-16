const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
	title: String,
	url: {type: String, required: true},
});

/* Here maybe use https://stackoverflow.com/questions/14588032/mongoose-password-hashing
for user authentifications. Look up hash and SALT_WORK_FACTOR */

module.exports = mongoose.model('Photo', photoSchema);