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
        // Empties the form.
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
    $('.update-button').on('click', function(e){
        e.preventDefault();
        console.log("click working!!");
        let formData = $('.modal-form').serialize();
        console.log('formData here: ', formData);

        let msgId = $(e.target).attr('data-msg-id');

        console.log(`msgID here: ${msgId}`, );

        $.ajax({
            url: `/api/messages/${msgId}`,
            method: 'PUT',
            data: formData,
            success: updateMessage
        });
    });




}); // end of $(document).ready(function()).







///////////////// Global Scope Functions /////////////////
function renderSeedMessages(messagesArr) {
    messagesArr.forEach(function(messageObj) {
        displayMessage(messageObj);
    });
}
// Show One.
function displayMessage (messageObj) {
    let imgURL = messageObj.imgURL || 'https://media.giphy.com/media/3R1dpjYOfnzJm/giphy.gif';
    // Add this to Message Board.
    $('#messageBoard').prepend(`
    <div id="${messageObj._id}" class='container msg-wrapper'>
        <img class='col-xs-12 col-sm-4 col-md-3 col-lg-3 msg-img' src='${imgURL}' >
        <div class='msg-content col-12 col-xs-12 col-sm-8 col-md-5 col-lg-5'>
            <h4>${messageObj.title}</h4>
            <p>${messageObj.address}</p>
            <p><div class='stars-${messageObj._id}'></div></p>
            <p>${moment(messageObj.date).format('LLL')}</p>
        </div>
    </div>`);
    displayStars(messageObj);
    // When one message box gets clicked:
    $(`#${messageObj._id}`).on('click', function(e) {
        $('input#title').attr('value', `${messageObj.title}`);
        $('input#address').attr('value', `${messageObj.address}`);
        $('input#imgURL').attr('value', `${imgURL}`);
        $('div#stars').addClass(`stars-${messageObj._id}`);
        $('textarea#message').text(`${messageObj.message}`);
        $('img#myImg').attr('src', `${messageObj.imgURL}`)

        displayStars(messageObj);
        $('.update-button').attr('data-msg-id', `${messageObj._id}`);
        $('.delete-button').attr('data-msg-id', `${messageObj._id}`);
        $('#messageModal').modal();
    });
};
// Display Rating Stars.
function displayStars(msgObj) {
    let empty = '<i class="fa fa-star-o fa-2x" aria-hidden="true"></i>';
    let full = '<i class="fa fa-star fa-2x" aria-hidden="true"></i>';
    switch (msgObj.rating) {
        case 0:
            $(`.stars-${msgObj._id}`).html(`<span>${empty}</span><span>${empty}</span><span>${empty}</span><span>${empty}</span><span>${empty}</span>`);
            break;
        case 1:
            $(`.stars-${msgObj._id}`).html(`<span>${full}</span><span>${empty}</span><span>${empty}</span><span>${empty}</span><span>${empty}</span>`);
            break;
        case 2:
            $(`.stars-${msgObj._id}`).html(`<span>${full}</span><span>${full}</span><span>${empty}</span><span>${empty}</span><span>${empty}</span>`);
            break;
        case 3:
            $(`.stars-${msgObj._id}`).html(`<span>${full}</span><span>${full}</span><span>${full}</span><span>${empty}</span><span>${empty}</span>`);
            break;
        case 4:
            $(`.stars-${msgObj._id}`).html(`<span>${full}</span><span>${full}</span><span>${full}</span><span>${full}</span><span>${empty}</span>`);
            break;
        case 5:
            $(`.stars-${msgObj._id}`).html(`<span>${full}</span><span>${full}</span><span>${full}</span><span>${full}</span><span>${full}</span>`);
            break;
    }
}
// Update.
function updateMessage(data){
    $(`[ id="${data._id}" ]`).remove();
    displayMessage(data);
    $('#messageModal').modal('hide');
}
// Delete One.
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
