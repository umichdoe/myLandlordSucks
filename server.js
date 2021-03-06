let express = require('express'),
    app = express(),
    db = require('./models'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    _ = require('lodash');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

//takes you to index page.
app.get('/', function homepage (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

//route directory that lists all route outputs.
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
    let sortField = req.query.sort;
    let direction = req.query.direction;
    if (sortField && direction === 'desc') {
        sortField = '-' + sortField;
    }
    db.Message.find({}).sort(sortField).exec(function(err, allMessages) {
         res.json(allMessages);
    });
});


// Show One
app.get('/api/messages/:id', function index (req, res) {
    db.Message.find({ _id: req.params.id}, function(err, foundMessage){
        res.json(foundMessage);
    })
});

// Post
app.post('/api/messages', function create (req, res) {
    db.Message.create(req.body, function (err, message) {
        if (err) { console.log('error' + err); }
        res.json(message);
    });
});

//Delete
app.delete('/api/messages/:id', function (req,res){
  var messageId = req.params.id;
  db.Message.findOneAndRemove({ _id: messageId })
  .exec(function(err, foundMessage){
    res.json(foundMessage);
  });
});


// PUT update
app.put('/api/messages/:id', function update(req, res){
  req.body.date = Date.now();
  db.Message.findByIdAndUpdate({_id: req.params.id},req.body).then(function(message) {
    db.Message.findOne({_id: req.params.id}).then(function (message) {
      res.send(message);
    });
  });
});

var port = 3000;

//listen on this frequency.
app.listen(port, function () {
});
