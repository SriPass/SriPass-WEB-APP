const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");



const app = express();
const db = require('./db')
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());




app.get("/", (req, res) => {

    res.send("Server Working!");

});



const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);