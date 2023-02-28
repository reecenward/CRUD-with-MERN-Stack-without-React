const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./Middleware/authMiddleware');
const UserItems = require('./model/UserItems');

const adminRoute = require("./routes/adminRoutes");
const loginRoute = require("./routes/loginRoutes");
const signupRoute = require("./routes/signupRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/adminRoute', adminRoute);
app.use('/loginRoute', loginRoute);
app.use('/signupRoute', signupRoute);

app.use('/public', express.static('public'));

app.get("*", checkUser);

app.get('/username', (req, res) => {
    if (res.locals.user) {
        res.send({ username: res.locals.user.username });
    } else {
        res.send({ username: null });
    }
});

app.get('/', requireAuth, (req, res) => {
    res.sendFile(__dirname + '/public/admin/index.html');
});

// app.get('/user', (req, res) => {
//     res.sendFile(__dirname + '/public/user/index.html');
// });

app.get('/user/:username', (req, res) => {
    var username = req.params.username;
    res.locals = { username: username };
    UserItems.findOne({ username: username }, (err, userItems) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Internal server error' });

        } else {
            res.sendFile(__dirname + '/public/user/index.html');
            console.log(userItems.items)
        }
    });
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login/index.html');
});

app.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login')
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup/index.html');
});

//404 page
app.get('*', checkUser, (req, res) => {
        res.sendFile(__dirname + '/public/404.html');
    })
    // Start the server and listen for incoming requests
const server = app.listen(4000, () => {
    console.log('Express app listening on port 4000');
});

const wss = new WebSocket.Server({ server: server });
wss.on('connection', function connection(ws) {
    console.log('a new client connected');

    ws.on('message', function incoming(message) {
        try {
            const data = JSON.parse(message);
            console.log(data.lastPart);
            console.log(data.data);
            UserItems.findOne({ username: data.lastPart }, (err, userItems) => {
                if (err) {
                    console.log(err);
                    ws.send('Error: Internal server error');
                } else {
                    // Filter the items based on the message
                    const filteredItems = userItems.items.filter(item => item.name.includes(data.data));
                    const itemNames = filteredItems.map(item => item.name);
                    ws.send(JSON.stringify(itemNames));
                }
            });
        } catch (err) {
            console.error("Invalid JSON: ", err);
        }
    });
});