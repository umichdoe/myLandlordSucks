$(document).ready(function() {
    console.log('sanity check!');

    // Create New Form.
    $('.btn-new-msg').click(function() {
        $('.create-form').toggle('slow');
        $('span.close-msg').toggle('slow');
        $('span.new-msg').toggle('slow');
        $(this).toggleClass('btn-danger');
    });
    
    // Sort By Date When Loading.
    $.ajax({
        method: 'GET',
        url: '/api/messages?sort=date&direction=desc',
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
    <div class='container msg-wrapper'>
        <img class='${messageObj._id} col-xs-12 col-sm-4 col-md-3 col-lg-3 msg-img' src='https://eurlog.files.wordpress.com/2008/10/falling-down-house1.jpg' >
        <div class='msg-content col-12 col-xs-12 col-sm-8 col-md-5 col-lg-5'>
            <h4 class='${messageObj._id}'>${messageObj.title}</h4>
            <p>${messageObj.address}</p>
            <p>${messageObj.rating}</p>
            <p>${moment(messageObj.date).format('LLL')}</p>
        </div>
    </div>`);
    $(`.${messageObj._id}`).on('click', function(e){
        $('.modal-body').html(`
          <form class='form-horizontal'>
            <div class="form-group">
                <label for='title' class='col-xs-2'>Title</label>
                <input id='title' name='title' class='col-xs-9' value='${messageObj.title}'>
            </div>
            <div class="form-group">
                <label for='address' class='col-xs-2'>Address</label>
                <input id='address' name='address' class='col-xs-9' value='${messageObj.address}'>
            </div>
            <div class="form-group">
                <label for='rating' class='col-xs-2'>Rating</label>
                <input id='rating' name='rating' class='col-xs-9' value='${messageObj.rating}'>
            </div>
            <div class="form-group">
                <label for='message' class='col-xs-2'>Message</label>
                <textarea id='message' name='message' class='col-xs-9'>${messageObj.message}</textarea>
            </div>
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
