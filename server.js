const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const poopRoute = require("./routes/poopRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/route', poopRoute);

// Serve the files in the public folder as static assets
app.use('/public', express.static('public'));

// Set up a route to handle requests to the root path
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server and listen for incoming requests
app.listen(4000, () => {
    console.log('Express app listening on port 4000');
});