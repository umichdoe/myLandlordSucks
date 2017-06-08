var db = require("./models");

// lodash for the times do util function
var _ = require('lodash');

// this will fill the messageList with 20 objects that you can turn into models
var messageList = [];

messageList.push({
  title: "My landord painted a rainbow on my house.",
  address: "San Francisco, CA 94104",
  rating: 5,
  imgURL: "https://s-media-cache-ak0.pinimg.com/736x/d3/68/74/d36874eee05c8b7500747cc849cb9c34.jpg",
  message: "I love it! :)"
});
messageList.push({
  title: "The house is sinking into the ground like the leaning tower of Pisa",
  address: "San Francisco, CA 94103",
  rating: 1,
  imgURL: "http://noehill.com/sf/landmarks/haight/delano_house_thumb.jpg",
  message: "I keep falling off my bed because I keep rolling to one side."
});
messageList.push({
  title: "The landlord's drunk friend showed up and slept in my room",
  address: "Berkeley, CA 94101",
  rating: 2,
  imgURL: "https://static01.nyt.com/images/2010/11/22/nyregion/22cityroom-ready/22cityroom-ready-blog480.jpg",
  message: "I will pay you to live here."
});
messageList.push({
  title: "The oven smokes like a barbeque pit.",
  address: "Redwood City, CA 94321",
  rating: 3,
  imgURL: "https://media.giphy.com/media/3o6ZsUW74p4cvyD2ow/giphy.gif",
  message: "If this oven doesn't get fixed soon, I'm afraid the house will burn down.",
});
messageList.push({
  title: "There's a man dancing on our roof.",
  address: "San Diego, CA 92111",
  rating: 5,
  imgURL: "https://media.giphy.com/media/TjbN05AFbgOnm/giphy.gif",
  message: "I wanna have a conversation with him but he wouldn't come down.",
});
messageList.push({
  title: "My house is on fire.",
  address: "Los Angeles, CA",
  rating: 1,
  imgURL: "https://media.giphy.com/media/3oeSAQoA5PLG4jLTos/giphy.gif",
  message: "and I can't contact my landlord.",
});
messageList.push({
  title: "My landlord's dog slapped me in the face.",
  address: "New York, NY 10001",
  rating: 2,
  imgURL: "https://media.giphy.com/media/AtwrcuevjPsys/giphy.gif",
  message: "and it hurt.",
});
messageList.push({
  title: "It's a cute cat but I'm allergic to cats",
  address: "San Jose, CA",
  rating: 2,
  imgURL: "http://www.pixatu.com/wp-content/uploads/2017/03/wallpaper-cat-images-a%C2%B7-stock-photos-with-animal-emage-high-resolution-for-laptop.jpg",
  message: "The landlord's cat kept staring at me.",
});
messageList.push({
  title: "My landlord's pet monkey took down my drone.",
  address: "Mountain View, CA",
  rating: 2,
  imgURL: "https://media.giphy.com/media/moF5QkzLJGD04/giphy.gif",
  message: "The landlord's monkey took my drone down.",
});
messageList.push({
  title: "Look how dirty the bathroom is!",
  address: "Sausalito, CA 94110",
  rating: 1,
  imgURL: "https://media-cdn.tripadvisor.com/media/photo-s/07/1e/49/10/disgusting-bathrooms.jpg",
  message: "She's never around."
});

//funtion to seed database with messages. This will delete all esisting messages before seeding.
db.Message.remove({}, function(err, removed){

  db.Message.create(messageList, function(err, created){
    if (err) { console.log('ERROR' + err); }
    process.exit();
  });

});
