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

var messageList = [];

messageList.push({
    title: "My Landlords dog attacked me!",
    address: "225 Bush St. 5th Floor, San Francisco, CA 94104",
    rating: 0,
    message: "I was statying at an AirBnB"
});
messageList.push({
    title: "My Lan22222222dlords dog attacked me!",
    address: "225 Bush St. 5th Floor, San Francisco, CA 94104",
    rating: 0,
    message: "I was statying at an AirBnB"
});
messageList.push({
    title: "My Landlords 3333 dog attacked me!",
    address: "225 Bush St. 5th Floor, San Francisco, CA 94104",
    rating: 0,
    message: "I was statying at an AirBnB"
});
messageList.push({
    title: "My Landlords 44444 dog attacked me!",
    address: "225 Bush St. 5th Floor, San Francisco, CA 94104",
    rating: 0,
    message: "I was statying at an AirBnB"
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