let express = require('express');
let router  = express.Router();

// let todos   = require('../models/todos');
let MongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res) {
	// Connection URL
	const url = 'mongodb://localhost:27017';

	// Database Name
	const dbName = 'todos';

	// Use connect method to connect to the server
	MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
	  console.log("Connected successfully to server");

	  const db = client.db(dbName);

	  const collection = db.collection("todos");
	  collection.find({}).toArray().then(response => res.status(200).json(response)).catch(err => console.log(err));

	  client.close();
	});
});

module.exports = router;
