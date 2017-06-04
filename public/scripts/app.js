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
        url: '/api/messages?sort=date',
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
        });
        // empties the form.
        $(this).trigger("reset");
    });

    $('.delete-button').on('click', function(e){
        let msgId = $(e.target).attr('data-msg-id');
        $.ajax({
            url: `/api/messages/${msgId}`,
            method: 'DELETE',
            success: deleteMessage
        });
    });




}); // end of document ready

function renderSeedMessages(messagesArr) {
    messagesArr.forEach(function(messageObj) {
        displayMessage(messageObj);
    });
}

// Show One.
function displayMessage (messageObj) {
    let imgURL = messageObj.imgURL || 'https://media.giphy.com/media/3R1dpjYOfnzJm/giphy.gif';
    $('#messageBoard').prepend(`
    <div id="${messageObj._id}" class='container msg-wrapper'>
        <img class='${messageObj._id} col-xs-12 col-sm-4 col-md-3 col-lg-3 msg-img' src='${imgURL}' >
        <div class='msg-content col-12 col-xs-12 col-sm-8 col-md-5 col-lg-5'>
            <h4 class='${messageObj._id}'>${messageObj.title}</h4>
            <p>${messageObj.address}</p>
            <p>${messageObj.rating}</p>
            <p>${moment(messageObj.date).format('LLL')}</p>
        </div>
    </div>`);
    // <img> and <h4>
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
                <label for='imgURL' class='col-xs-2'>Image URL</label>
                <input id='imgURL' name='imgURL' class='col-xs-9' value='${imgURL}'>
            </div>
            <div class="form-group">
                <label for='message' class='col-xs-2'>Message</label>
                <textarea id='message' name='message' class='col-xs-9'>${messageObj.message}</textarea>
            </div>
          </form>`);
        $('.delete-button').attr('data-msg-id', `${messageObj._id}`);
        $('#messageModal').modal();
    });

}; // end of DisplayMessage function.


function deleteMessage(data){
    console.log(data);
    var messageId = data._id;
    console.log("data._id = ",  messageId);
    $(`#${messageId}`).remove();
}


function errorMessage (error) {
    console.log(err);
}

function testButton(e){
  e.preventDefault();
}

//scroll up and down function
// https://www.aspsnippets.com/Articles/jQuery-Scroll-to-Bottom-Button-Smooth-Animated-Scroll-to-Bottom-of-page-example-using-jQuery.aspx
$(function () {
            $('#scrollToBottom').bind("click", function () {
                $('html, body').animate({ scrollTop: $(document).height() }, 1200);
                return false;
            });
            $('#scrollToTop').bind("click", function () {
                $('html, body').animate({ scrollTop: 0 }, 1200);
                return false;
            });
        });
