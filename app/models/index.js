var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connectado ao DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");