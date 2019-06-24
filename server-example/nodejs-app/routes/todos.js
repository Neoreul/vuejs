let express = require('express');
let router  = express.Router();

let todos   = require('../models/todos');

router.get('/', function(req, res) {
	todos.find({}).then(doc => {
		res.send(docs);
	}).catch(err => {
		res.status(400).send(err);
	});
});

module.exports = router;
