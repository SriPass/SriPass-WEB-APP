const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://Imesh:Imesh1234@cluster0.ygreoof.mongodb.net/sripass'

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var db = mongoose.connection

db.on('connected', () => {
    console.log(`Mongodb Connection Success!`);
})

db.on('error', () => {
    console.log(`Mongodb Connection failed!`);
})

module.exports = mongoose