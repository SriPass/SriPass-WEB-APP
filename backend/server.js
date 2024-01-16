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
        <p class="author">
            <a href="${author.github}" target="_blank" style="text-decoration: none; color: inherit;">${author.name}</a>
        </p>
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
                    font-size: 10px;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 20px;
                }
                .status {
                    font-size: 16px;
                    color: green;
                    margin-bottom: 10px;
                }
                .author {
                    font-size: 14px;
                    color: #555;
                    margin: 5px 0;
                }
                .license {
                    margin-top: 20px;
                    white-space: pre-line;
                    font-size: 12px;
                    color: #777;
                }
                .logo {
                    display: block;
                    margin: 0 auto;
                    width: 150px;
                }
                .repo-link {
                    font-size: 12px; /* Reduce the font size for the repository link */
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img class="logo" src="https://github.com/SriPass/SriPass-WEB-APP/blob/dev/logo.png?raw=true" alt="Logo">
                <div class="title">SriPass Backend Server (c) 2023 SriPass</div>
                <div class="status">Active</div>
                <h5>Code Authors</h5>
                <div class="authors">
                    ${authorList}
                </div>
                <div class="license">
                    ${mitLicenseText}
                </div>
                <p class="repo-link">GitHub Repository: <a href="https://github.com/SriPass/SriPass-WEB-APP-BACKEND" target="_blank">https://github.com/SriPass/SriPass-WEB-APP-BACKEND</a></p>
            </div>
        </body>
        </html>
    `;

    res.send(responseMessage);
});







const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);