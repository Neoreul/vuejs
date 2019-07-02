let MongoClient = require('mongodb').MongoClient;
let config      = require('./config');

let state = {
    db: null
};

exports.connect = function(done){
    if(state.db) return done();

    MongoClient.connect(config.mongo_uri, {
        useNewUrlParser: true
    }, function(err, client){
        if(err) return done(err);
        const db = client.db(config.dbName);
        state.db = db;
        done();
    });
};

exports.get     = function(){
    return state.db;
};

exports.close   = function(done){
    if(state.db){
        state.db.close(function(err, result){
            state.db = null;
            done(err);
        });
    }
};