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
        document.validationForm.imgURL.value = checkUrl(document.validationForm.imgURL.value); //

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
    // Edit Button.
    $('.edit-button').on('click', function(e) {
        e.preventDefault();
        // do this
        $('.readable-modal-body').hide();
        $('.editable-modal-body').show();
        // don't do next thing, instead do above
        let msgId = $(this).attr('data-msg-id');
        $.ajax({
            method: 'GET',
            url: `/api/messages/${msgId}`,
            success: prepopulateForm,
            error: errorMessage
        });
        console.log(msgId);
    });
    // Update Button.
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
    // Delete Button.
    $('.delete-button').on('click', function(e){
        let confirmMsg = confirm('Are you sure you want to delete?');
        if (confirmMsg) {
            let msgId = $(e.target).attr('data-msg-id');
            $.ajax({
                url: `/api/messages/${msgId}`,
                method: 'DELETE',
                success: deleteMessage
            });
        }
    });

    // Stars Hover State.
    $('.create-form i.fa-star').hover( function() {
        $(this).closest('div').removeClass();
        $(this).css('cursor', 'pointer');
        let starId = $(this).attr('data-star-id');
        $(this).closest('div').addClass(`stars-rating-${starId}`);
    });
    $('.create-form i.fa-star').mouseleave( function() {
        $(this).closest('div').removeClass();
        let div = $(this).closest('div');
        let dataClickedValue = div.attr('data-clicked');
        if (dataClickedValue) {
            div.addClass(dataClickedValue);
        }
    });
    $('.create-form i.fa-star').on('click', function() {
        let starId = $(this).attr('data-star-id');
        $(this).closest('div').attr('data-clicked', `stars-rating-${starId}`);
        $('select').val(starId);
    });


}); // end of $(document).ready(function()).

// Validate Image URL in Create Form
function checkUrl(photoUrl) {
  if((photoUrl.match(/\.(jpeg|jpg|gif|png)$/) != null)) {
    console.log("this is photourl", photoUrl);
    return photoUrl;
  } else{
    return 'https://media.giphy.com/media/l1BgQJeWwxTgkVI6A/giphy.gif';
  }
};

///////////////// Global Scope Functions /////////////////
function renderSeedMessages(messagesArr) {
    messagesArr.forEach(function(messageObj) {
        displayMessage(messageObj);
    });
}
// Show One.
function displayMessage (messageObj) {
    let imgURL = messageObj.imgURL || 'https://media.giphy.com/media/3R1dpjYOfnzJm/giphy.gif';
    // Add a New Message to Message Board.
    let star = '<i class="fa fa-star fa-2x" aria-hidden="true"></i>';
    let starsHTML = `<p>
                        <div class='stars stars-rating-${messageObj.rating}'>
                            ${star}${star}${star}${star}${star}
                        </div>
                     </p>`
    $('#messageBoard').prepend(`
    <div id="${messageObj._id}" class='container msg-wrapper'>
        <img class='col-xs-12 col-sm-4 col-md-3 col-lg-4 msg-img' src='${imgURL}' >
        <div class='msg-content col-12 col-xs-12 col-sm-8 col-md-9 col-lg-8'>
            <h4>${messageObj.title}</h4>
            <p>${messageObj.address}</p>
            ${starsHTML}
            <p>${moment(messageObj.date).format('LLL')}</p>
        </div>
    </div>`);
    displayStars(messageObj);
    // When one message box gets clicked:
    $(`#${messageObj._id}`).on('click', function(e) {
        console.log('messageObj here: ', messageObj);

        $('.editable-modal-body').hide();
        $('.readable-modal-body').show();

        $('.readable-img').attr('src', `${messageObj.imgURL}`)
        $('.readable-title').html(messageObj.title);
        $('.readable-address').html(messageObj.address);
        $('.readable-rating').html(starsHTML);
        $('.readable-msg').html(messageObj.message);

        $('.edit-button').attr('data-msg-id', `${messageObj._id}`);
        $('.update-button').attr('data-msg-id', `${messageObj._id}`);
        $('.delete-button').attr('data-msg-id', `${messageObj._id}`);
        $('#messageModal').modal();
    });
};
// Display Rating Stars.
function displayStars(msgObj) {
    let empty = '<i class="fa fa-star-o fa-2x" aria-hidden="true"></i>'
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
// Edit.
function prepopulateForm(messageObj) {
    console.log('this is messageObj[0] ', messageObj[0]);
    $('input#title').attr('value', `${messageObj[0].title}`);
    $('input#address').attr('value', `${messageObj[0].address}`);
    $('input#imgURL').attr('value', `${messageObj[0].imgURL}`);
    $('div#stars').addClass(`stars-${messageObj[0]._id}`);
    $('textarea#message').text(`${messageObj[0].message}`);
    $('img#myImg').attr('src', `${messageObj[0].imgURL}`);
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
