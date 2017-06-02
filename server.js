let express = require('express'),
    app = express(),
    db = require('./models'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.get('/', function homepage (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', function apiIndex(req, res, next) {
    res.json({
        project: "My Landlord Sucks App",
        message: "Welcome to My Landlord Sucks App api. Here is what you need to know.",
        documentationUrl: "https://github.com/younjiwoo/myLandlordSucks/blob/master/readme.md",
        baseUrl: "https://boiling-earth-58583.herokuapp.com/",
        endpoints: [
            {method: "GET", path: "/api", description: "Describes all available endpoints."},
            {method: "GET", path: "/api/messages", description: "Index of all the messages and complaints of unhappy tenants."},
            {method: "POST", path: "/api/messages", description: "Create or add a new message"},
            {method: "PUT", path: "/api/messages/:id", description: "Edit a message and update it."}, 
            {method: "DELETE", path: "/api/messages/:id", description: "Destroy a message."}
        ]
    })
});

// Index of Messages
app.get('/api/messages', function index (req, res) {
    db.Message.find({}, function(err, allMessages) {
        res.json(allMessages);
    });
});

// Post
app.post('/api/messages', function create (req, res) {
    db.Message.create(req.body, function (err, message) {
        if (err) { console.log('error', err); }
        res.json(message);
    })
})


app.listen(process.env.PORT || 3000, function () {
    console.log('Express server is running on http://localhost:3000/');
});