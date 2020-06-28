var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb+srv://TiagoKuste:hash71460goorm@cluster0-qlt5s.mongodb.net/test?retryWrites=true', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connectado ao DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");