let db = require('../db');

exports.find = (query) => {
	let col = db.get().collection("todos");

	return new Promise((resolve, reject) => {
		col.find(query).toArray().then(result => {
			resolve(result);
		}).catch(err => {
			reject(err);
		});
	});
};

exports.create = (data) => {
	let col = db.get().collection('todos');

	return new Promise((resolve, reject) => {
		col.insertOne(data).then(result => {
			resolve(result);
		}).catch(err => {
			reject(err);
		});
	});
};

exports.update = (data) => {
	let col = db.get().collection('todos');

	return new Promise((resolve, reject) => {
		col.findOneAndUpdate({_id: data._id}, {$set: data}).then(result => {
			resolve(result);
		}).catch(err => {
			reject(err);
		});
	});
};

exports.deleteByID = (id) => {
	let col = db.get().collection('todos');

	return new Promise((resolve, reject) => {
		col.deleteOne({_id: id}).then(result => {
			resolve(result);
		}).catch(err => {
			reject(err);
		});
	});
};