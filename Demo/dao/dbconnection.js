var mysql = require('mysql'),dbconnection,
	env="development";

if(env=="development") {
	dbconnection = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    password: 'lionking',
	    port: '3306'});
} else if(env=="production") {
	dbconnection = mysql.createConnection({
	    host: 'aa1whtjkwjb5isz.cndorxuubkhh.us-east-1.rds.amazonaws.com',
	    user: 'root',
	    password: 'lionking',
	    port: '3306'});
}

dbconnection.query('USE smallslate');
module.exports = dbconnection;