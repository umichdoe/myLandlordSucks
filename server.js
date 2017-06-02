let express = require('express'),
    app = express();


app.use(express.static(__dirname + '/public'));

app.get('/', function homepage (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// Index of Messages
//app.get('/api/messages', function index (req, res) {
//    db.Message.find({}, function(err, allMessages) {
//        res.json(allMessages);
//    });
//});

app.get('/api', function apiIndex(req, res, next) {
    res.json({
        project: "My Landlord Sucks App",
        message: "Welcome to My Landlord Sucks App api. Here is what you need to know.",
        documentationUrl: "https://github.com/younjiwoo/myLandlordSucks/blob/master/readme.md",
        baseUrl: "https://boiling-earth-58583.herokuapp.com/",
        endpoints: [
            {method: "GET", path: "/api", description: "Describes all available endpoints."},
            {method: "GET", path: "/api/messages", description: "Index of all the messages and complaints of unhappy tenants."}, // DONE #3
            {method: "POST", path: "/api/messages", description: "Create or add a new message"}, // DONE #4
            {method: "PUT", path: "/api/messages/:id", description: "Edit a message and update it."}, //  DONE #5
            {method: "DELETE", path: "/api/messages/:id", description: "Destroy a message."} // #6
        ]
    })
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Express server is running on http://localhost:3000/');
});