let MongoClient = require('mongodb').MongoClient;

let state = {
    db: null
};

exports.connect = function(done){
    if(state.db) return done();

    MongoClient.connect("mongodb://localhost:27017/todos", {
        useNewUrlParser: true,
        useCreateIndex: true
    }, function(err, db){
        if(err) return done(err);
        
        state.db = db;
        done();
    });
};

exports.get    = function(){
    return state.db;
};

exports.close  = function(done){
    if(state.db){
        state.db.close(function(err, result){
            state.db = null;
            done(err);
        });
    }
};