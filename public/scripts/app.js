// this is our app.js file for the browser
// this is line 2

$(document).ready(function() {
    console.log('sanity check!');

// Create form is hidden on load. Clicking 'New Message' button will show it.
    $('.btn-new-msg').click(function() {
        $('.create-form').toggle('slow');
        $('span.close-msg').toggle('slow');
        $('span.new-msg').toggle('slow');
        $(this).toggleClass('btn-danger');
    });


    $.ajax({
        method: 'GET',
        url: '/api/messages',
        success: renderSeedMessages,
        error: errorMessage
    });

    $('#message-form form').on('submit', function (e) {
        e.preventDefault();
        let formData = $(this).serialize();
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







}); // end of document ready

function renderSeedMessages(messagesArr) {
    messagesArr.forEach(function(messageObj) {
        displayMessage(messageObj);
    });
}

function displayMessage (messageObj) {
    console.log('messageObj is: ', messageObj)
    $('#messageBoard').append(`
    <div class='container msg-wrapper' data-message-id="${messageObj._id}">
        <img class='${messageObj._id} col-xs-2 msg-img' src='https://eurlog.files.wordpress.com/2008/10/falling-down-house1.jpg' >
        <div class='msg-content col-xs-8'>
            <h4 class='${messageObj._id}'>${messageObj.title}</h4>
            <p>${messageObj.address}</p>
            <p>${messageObj.rating}</p>
            <p>${moment(messageObj.date).format('LLL')}</p>
        </div>
    </div>`);
    $(`.${messageObj._id}`).on('click', function(e){
        $('p#messageBody').html("").append(`
          <form>
            <label for='title'>Title</label>
            <input id='title' name='title' value='${messageObj.title}'>
            <label for='address'>Address</label>
            <input id='address' name='address' value='${messageObj.address}'>
            <label for='rating'>Rating</label>
            <input id='rating' name='rating' value='${messageObj.rating}'>
            <label for='message'>Message</label>
            <input id='message' name='message' value='${messageObj.message}'>
          </form>`);

        $('#messageModal').modal();
        $('.delete-button').on('click', function(e){
          $.ajax({
            url: `/api/messages/${messageObj._id}`,
            method: 'DELETE',
            success: deleteMessage

          });
        });console.log(`ajax url is ${messageObj._id}`)

    });
}; // end of DisplayMessage function.
function deleteMessage(data){
  debugger
  console.log(data)
  var messageId = data._id;
  console.log("data._id = " +  messageId);
  $(`div[data-message-id="${messageId}"]`).remove();

}


function errorMessage (error) {
    console.log(err);
}

function testButton(e){
  e.preventDefault();

}


//{ title: req.body.title,
//address: req.body.address,
//
//}
