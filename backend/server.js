const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const driversRoute = require('./routes/DriverRoute');
const busRoutesRoute = require('./routes/RouteforBusRoute'); // Import your busRoutes routes
const busSchedulesRouter = require('./routes/BusSchedulesRoute'); // Import your busSchedules routes
const localPassengersRouter = require('./routes/localPassengersRoute'); // Import your localPassengers routes
const busInspectorsRouter = require('./routes/BusInspectorsRoute'); // Import your busInspectors routes
const busesRoute = require('./routes/BusRoute'); // Import busroute routes
const passengerTravelHistoryRoutes = require('./routes/PassengerTravelHistoryRoute'); // Replace with the actual path
const transportManagerRoute = require('./routes/TransportManagerRoute'); // Replace with the actual path

const app = express();
const db = require('./db')
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use('/api/driver', driversRoute);
app.use('/api/busroutes', busRoutesRoute);
app.use('/api/bus-schedules', busSchedulesRouter);
app.use('/api/localpassengers', localPassengersRouter);
app.use('/api/businspectors', busInspectorsRouter);
app.use('/api/bus', busesRoute);
app.use('/api/travelhistory', passengerTravelHistoryRoutes);
app.use('/api/bus', busesRoute);
app.use('/api/manager', transportManagerRoute);

app.get("/", (req, res) => {
    const authors = [
        { name: "Darshi Buddhini", github: "https://github.com/darshibuddhini" },
        { name: "Kimuthu Gamage", github: "https://github.com/kimuthuug" },
        { name: "Dinithi Mendis", github: "https://github.com/dinithi27" },
        { name: "Imesh Pasinda", github: "https://github.com/imeshpasinda" }
    ];

    const authorList = authors.map(author => `
        <li>
            <a href="${author.github}" target="_blank">${author.name}</a>
        </li>
    `).join('');

    const mitLicenseText = `
    MIT License

    Copyright (c) 2023 SriPass

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    `;

    const responseMessage = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: 'Helvetica', sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
            }
            .container {
                text-align: center;
                margin: 50px auto;
                max-width: 800px;
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .title {
                font-size: 32px;
                font-weight: bold;
                color: #333;
            }
            .authors {
                list-style-type: none;
                padding: 0;
            }
            .authors li {
                margin: 10px 0;
                font-size: 18px;
                color: #555;
            }
            .license {
                margin-top: 20px;
                white-space: pre-line;
                font-size: 14px;
                color: #777;
            }
            .active {
                color: green;
            }
        </style>
    </head>
    <body>
        <div class="container">
        <img src="https://github.com/SriPass/SriPass-WEB-APP-BACKEND/blob/main/logo.png?raw=true" alt="Logo" width="150"> <!-- Add this line for the logo -->
            <div class="title">SriPass Backend Server</div>
            <h2><span class="active">Active</span></h2>
            <h2>Code Authors:</h2>
            <ul class="authors">
                ${authorList}
            </ul>
            <div class="license">
                ${mitLicenseText}
            </div>
            <p>GitHub Repository: <a href="https://github.com/SriPass/SriPass-WEB-APP-BACKEND" target="_blank">https://github.com/SriPass/SriPass-WEB-APP-BACKEND</a></p> <!-- Add this line for the GitHub repo link -->
        </div>
    </body>
    </html>
    `;

    res.send(responseMessage);
});




const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);