var mysql = require('mysql'),dbconnection,
	env="development";

if(env=="development") {
	dbconnection = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    password: 'lionking',
	    port: '3306'});
}

dbconnection.query('USE smallslate');
module.exports = dbconnection;