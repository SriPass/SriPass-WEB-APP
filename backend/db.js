// const mongoose = require("mongoose");

// var mongoURL = 'mongodb+srv://Imesh:Imesh1234@cluster0.ygreoof.mongodb.net/sripass'

// mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

// var db = mongoose.connection

// db.on('connected', () => {
//     console.log(`Mongodb Connection Success!`);
// })

// db.on('error', () => {
//     console.log(`Mongodb Connection failed!`);
// })

// module.exports = mongoose

const mongoose = require("mongoose");
// encapsulated the MongoDB connection logic within a Database class
class Database {
    constructor() {
        // Check if an instance of the Database class already exists

        if (!Database.instance) {
            this.mongoURL = 'mongodb+srv://Imesh:Imesh1234@cluster0.ygreoof.mongodb.net/sripass';

            // Establish the MongoDB connection using Mongoose
            mongoose.connect(this.mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

            // Access the MongoDB connection object
            this.db = mongoose.connection;

            this.db.on('connected', () => {
                console.log(`MongoDB Connection Success!`);
            });

            this.db.on('error', (err) => {
                console.error(`MongoDB Connection failed: ${err}`);
            });

            // Create an instance of the Database class
            Database.instance = this;
        }
        // Return the instance of the Database class
        return Database.instance;
    }
}
// Export a single instance of the Database class to be used throughout the MERN app
module.exports = new Database();
