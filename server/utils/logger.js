(function() {

	const winston = require('winston');

	winston.add(winston.transports.File, {filename: 'error.log'});
	
	// winston.handleExceptions(new winston.transports.File({ 
	// 	filename: 'server/logs/exceptions.log', 
	// 	humanReadableUnhandledException: true
	// }));


	//winston.remove(winston.transports.Console);

	// let logger = new (winston.Logger)({
	// 	level: 'error',
	// 	transports: [
	// 		new (winston.transports.File)({filename: 'server/logs/error.log'})
	// 	]
	// });
	
	module.exports = winston;
}());