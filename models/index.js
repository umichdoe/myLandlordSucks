let mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/messageDB", { useMongoClient: true } );

let Message = require('./message');
module.exports.Message = Message;
