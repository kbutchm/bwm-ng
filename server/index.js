const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const Rental = require('./models/rental');
const FakeDB = require('./models/fake-db');

const rentalRoutes = require('./routes/rentals');

//MongoClient.connect(config.DB_URI, function (err, db) {
//    if (err) throw err;
//    console.log("Database created!");
//    db.close();
//});

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
    const fakeDb = new FakeDB();
    fakeDb.seedDb();
});


const app = express();

// routes
app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
    console.log('server running on port ' + PORT);
});