$(document).ready(function() {
    // Click Header and Reload the page.
    $('header').on('click', function() {
        location.reload();
    })

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

    // Submit to Create a New Message.
    $('#message-form form').on('submit', function (e) {
        e.preventDefault();
        let isFormValid = true;
        $('#create-title, #create-address, #create-rating').each(function(idx, input) {
            let isInputValid = inputValidation(input);
            if (!isInputValid) {
                isFormValid = false;
            }
        });
        if (isFormValid) {
            document.validationForm.imgURL.value = checkUrl(document.validationForm.imgURL.value);
            let formData = $(this).serialize();
            $.ajax({
                method: 'POST',
                url: '/api/messages',
                data: formData,
                success: displayMessage
            });
            $(this).trigger("reset");
        }
    });
    // Edit Button.
    $('.edit-button').on('click', function() {
        let btnName = $(this).text();
        $('.update-button').show();
        if (btnName === 'Edit') {
            $('.readable-modal-body').hide();
            $('.editable-modal-body').show();
            $(this).text('Go Back');
            $('.update-button').prop('disabled', false);
        } else { // btnName === 'Go Back'
            $('.update-button').hide();
            $(this).text('Edit')
            $('.update-button').prop('disabled', true);
            $('.readable-modal-body').show();
            $('.editable-modal-body').hide();
        }
        
    });
    // Update Button.
    $('.update-button').on('click', function(e){
        let confirmMsg = confirm('Are you sure you want to save?');
        if (confirmMsg) {
            let isFormValid = true;
            $('#title, #address, #rating').each(function(idx, input) {
                let isInputValid = inputValidation(input);
                if (!isInputValid) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                let formData = $('.modal-form').serialize();
                let msgId = $(e.target).attr('data-msg-id');
                $.ajax({
                    url: `/api/messages/${msgId}`,
                    method: 'PUT',
                    data: formData,
                    success: updateMessage
                });
            }
        }  
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
    $('.star-form i.fa-star').hover( function () {
        $(this).closest('div').removeClass();
        $(this).css('cursor', 'pointer');
        let starId = $(this).attr('data-star-id');
        $(this).closest('div').addClass(`stars-rating-${starId}`);
    });
    $('.star-form i.fa-star').mouseleave( function () {
        $(this).closest('div').removeClass();
        let div = $(this).closest('div');
        let dataClickedValue = div.attr('data-clicked');
        if (dataClickedValue) {
            div.addClass(dataClickedValue);
        }
    });
    $('.star-form i.fa-star').on('click', function() {
        let starId = $(this).attr('data-star-id');
        $(this).closest('div').attr('data-clicked', `stars-rating-${starId}`);
        $('select').val(starId);
    });
    // Form Validation.
    $('#title, #address, #create-title, #create-address, #create-rating, #create-imgURL').blur(function(e) {
        inputValidation(e.target);
    });
}); // end of $(document).ready(function()).


///////////////// Global Scope Functions
function renderSeedMessages(messagesArr) {
    messagesArr.forEach(function(messageObj) {
        displayMessage(messageObj);
    });
}
// Show One.
function displayMessage (messageObj) {
    let imgURL = messageObj.imgURL || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png';
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
    // When one message box gets clicked:
    $(`#${messageObj._id}`).on('click', function(e) {
        $('.edit-button').text('Edit');
        $('.update-button').hide();
        $('.editable-modal-body').hide();
        $('.readable-modal-body').show();
        //change the modal's attributes
        $('.readable-img').attr('src', `${messageObj.imgURL}`)
        $('.readable-title').html(messageObj.title);
        $('.readable-address').html(messageObj.address);
        $('.readable-rating').html(starsHTML);
        $('.readable-msg').html(messageObj.message);
        //add the data from the obj to the buttons to use for other funtions.
        $('.edit-button').attr('data-msg-id', `${messageObj._id}`);
        $('.update-button').attr('data-msg-id', `${messageObj._id}`);
        $('.delete-button').attr('data-msg-id', `${messageObj._id}`);
        $('#messageModal').modal();
        prepopulateForm(messageObj);
    });
};
// Prepopulated Edit Form.
function prepopulateForm(messageObj) {
    $('input#title').val(messageObj.title);
    $('input#address').val(messageObj.address);
    $('input#imgURL').val(messageObj.imgURL);
    $('select#rating').val(`${messageObj.rating}`);
    $('#starsWrapper').addClass(`stars-rating-${messageObj.rating}`);
    $('#starsWrapper').attr('data-clicked', `stars-rating-${messageObj.rating}`);
    $('textarea#message').val(`${messageObj.message}`);
    $('img#myImg').attr('src', `${messageObj.imgURL}`);
}
// Update.
function updateMessage(data){
    $(`[ id="${data._id}" ]`).remove();
    displayMessage(data);
    $('#messageModal').modal('hide');
}
// Delete One.
function deleteMessage(data){
    var messageId = data._id;
    $(`#${messageId}`).remove();
}
// Create Validation
function checkUrl(photoUrl) {
  if (photoUrl.match(/\.(jpeg|jpg|svg|tiff|gif|png)$/) != null) {
    return photoUrl;
  } else{
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png';
  }
};
// Input Validation.
function inputValidation(input) {
    if (!(input.validity.valid)) {
        $(input).closest('.star-div').addClass('invalid');
        return false;
    } else {
        $(input).closest('.star-div').removeClass('invalid');
        return true;
    }
}
//error message for Ajax routes.
function errorMessage (error) {
    alert(error);
}
