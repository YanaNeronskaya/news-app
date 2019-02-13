const mongoose = require('mongoose');

function connect(uri) {
    mongoose.connect(uri, { useNewUrlParser: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('MongoDB connected');
    });
}

module.exports.connect = connect;
