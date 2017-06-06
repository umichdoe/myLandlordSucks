//1. https://www.rentalutions.com/education/articles/when-renting-goes-wrong-6-tenant-horror-stories/

//2. https://consumerist.com/2015/09/08/san-francisco-landlord-charged-4kmonth-in-rent-for-rodent-infested-death-trap-apartments/

//3. http://www.sfchronicle.com/business/article/most-bizarre-airbnb-feud-story-6824921.php

//4. https://thebolditalic.com/craigslist-housing-horror-stories-the-bold-italic-san-francisco-3fb7df5d4203

//5. http://www.sfgate.com/bayarea/article/Landlord-nightmare-in-eviction-attempt-3849250.php

//6. https://thebillfold.com/san-francisco-airbnb-horror-story-recalls-pacific-heights-almost-perfectly-7b3810e4b2b0

//7. http://brokeassstuart.com/blog/2016/08/17/draft-sf-housing-crisis-horror-story-part-2/

//8. http://www.huffingtonpost.com/2014/07/29/airbnb-horror-stories_n_5614452.html

//9 https://handsontap.com/california-landlord-horror-stories/
var db = require("./models");

//empty array to add objects to.

// lodash for the times do util function
var _ = require('lodash');
//library to create fake https://www.npmjs.com/package/faker
// var faker = require('faker');

// this will fill the messageList with 20 objects that you can turn into models
var messageList = [];

messageList.push({
  title: "My landord painted a rainbow on my house",
  address: "225 Bush St. 5th Floor, San Francisco, CA 94104",
  rating: 5,
  imgURL: "https://s-media-cache-ak0.pinimg.com/736x/d3/68/74/d36874eee05c8b7500747cc849cb9c34.jpg",
  message: "I am getting weird visitors since this paint job. My landlord didn't even consult me."
});
messageList.push({
  title: "The house is sinking into the ground like the leaning tower of Pisa",
  address: "999 Main St., San Francisco, CA 94103",
  rating: 1,
  imgURL: "http://noehill.com/sf/landmarks/haight/delano_house_thumb.jpg",
  message: "I keep falling off my bed because I keep rolling to one side."
});
messageList.push({
  title: "The landlord's drunk friend showed up and slept in my room",
  address: "103 Harrison St. 19th Fl, San Francisco, CA 94101",
  rating: 2,
  imgURL: "https://static01.nyt.com/images/2010/11/22/nyregion/22cityroom-ready/22cityroom-ready-blog480.jpg",
  message: "I will pay you to live here."
});
messageList.push({
  title: "The oven smokes like a barbeque pit.",
  address: "1234 sunrise st. San Francisco, CA 94321",
  rating: 3,
  imgURL: "https://media.giphy.com/media/3o6ZsUW74p4cvyD2ow/giphy.gif",
  message: "If this oven doesn't get fixed soon, I'm afraid the house will burn down.",
});
messageList.push({
  title: "There's a man dancing on our roof.",
  address: "85 Texas st. San Diego, CA 92111",
  rating: 5,
  imgURL: "https://media.giphy.com/media/TjbN05AFbgOnm/giphy.gif",
  message: "I wanna have a conversation with him but he wouldn't come down.",
});
messageList.push({
  title: "My house is on fire.",
  address: "749 Baldwin Ave, San Francisco",
  rating: 1,
  imgURL: "https://media.giphy.com/media/3oeSAQoA5PLG4jLTos/giphy.gif",
  message: "and I can't contact my landlord.",
});
messageList.push({
  title: "My landlord's dog slapped me in the face.",
  address: "324 Second Ave. New York, NY 10001",
  rating: 2,
  imgURL: "https://media.giphy.com/media/AtwrcuevjPsys/giphy.gif",
  message: "It still hurts.",
});
messageList.push({
  title: "It's a cute cat but I'm allergic to cats",
  address: "1234 Street Ave.",
  rating: 2,
  imgURL: "http://www.pixatu.com/wp-content/uploads/2017/03/wallpaper-cat-images-a%C2%B7-stock-photos-with-animal-emage-high-resolution-for-laptop.jpg",
  message: "The landlord's cat kept staring at me.",
});
messageList.push({
  title: "My landlord's pet monkey took down my drone.",
  address: "52-43 Avenue St. Mountain View, CA",
  rating: 2,
  imgURL: "https://media.giphy.com/media/moF5QkzLJGD04/giphy.gif",
  message: "The landlord's monkey took my drone down.",
});
messageList.push({
  title: "Look how dirty the bathroom is!",
  address: "838 1st St. 5th Floor, San Francisco, CA 94110",
  rating: 1,
  imgURL: "https://media-cdn.tripadvisor.com/media/photo-s/07/1e/49/10/disgusting-bathrooms.jpg",
  message: "She's never around."
});

console.log('this is db.Message: ', db.Message);

db.Message.remove({}, function(err, removed){

  db.Message.create(messageList, function(err, created){
    if (err) { return console.log('ERROR', err); }
    console.log("all messages:", messageList);
    console.log("created", messageList.length, "messages.");
    process.exit();
  });

});
