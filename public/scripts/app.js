// this is our app.js file for the browser
// this is line 2

$(document).ready(function() {
    console.log('sanity check!');

    $.ajax({
        method: 'GET',
        url: '/api/messages',
        success: renderSeedMessages,
        error: errorMessage
    });

    $('#message-form form').on('submit', function (e) {
        e.preventDefault();
        let formData = $(this).serialize();
//        let formDataJson = JSON.parse('{"' + decodeURI(formData.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
        console.log('formData here: ', formData);
       
        $.ajax({
            method: 'POST',
            url: '/api/messages',
            data: formData,
            success: displayMessage
        })
        // empties the form.
        $(this).trigger("reset");
    });
});

function renderSeedMessages(messagesArr) {
    messagesArr.forEach(function(messageObj) {
        displayMessage(messageObj);
    });
}

function displayMessage (messageObj) {
        console.log('messageObj is: ', messageObj)
        $('#messageBoard').append(`
        <div class='container'>
            <h4>Title:</h4> <p>${messageObj.title}</p>
            <h4>Address:</h4> <p>${messageObj.address}</p>
            <h4>Rating:</h4> <p>${messageObj.rating}</p>
            <h4>Date:</h4> <p>${messageObj.date}</p>
            <button class='btn btn-primary'>Read Message</button>
        </div>
        `);
};

function errorMessage (error) {
    console.log(err);
}




//{ title: req.body.title,
//address: req.body.address,
//
//}
