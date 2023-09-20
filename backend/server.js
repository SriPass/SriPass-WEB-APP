const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const driversRoute=require('./routes/DriverRoute');
const busRoutesRoute = require('./routes/RouteforBusRoute'); // Import your busRoutes routes
const busSchedulesRouter = require('./routes/busSchedulesRoute'); // Import your busSchedules routes

const app = express();
const db = require('./db')
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use('/api/driver', driversRoute); 
app.use('/api/busroutes', busRoutesRoute); // Mount the busRoutes routes at '/api/bus-routes'
app.use('/api/bus-schedules', busSchedulesRouter); // Mount the busSchedules route

app.get("/", (req, res) => {

    res.send("Server Working!");

});



const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);