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
        <div class='container'>
            <h4>Title:</h4> <p>${messageObj.title}</p>
            <h4>Address:</h4> <p>${messageObj.address}</p>
            <h4>Rating:</h4> <p>${messageObj.rating}</p>
            <h4>Date:</h4> <p>${messageObj.date}</p>
            <button class='btn btn-primary' id='${messageObj._id}'>Read Message</button>
        </div>
        `);
        $(`#${messageObj._id}`).on('click', function(e){
        // $('#messageModal').append( `
        //     <div class="modal fade" id="messageModal">
        //       <div class="modal-dialog" role="document">
        //         <div class="modal-content">
        //           <div class="modal-header">
        //             <h5 class="modal-title">Modal title</h5>
        //             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //             <span aria-hidden="true">&times;</span>
        //           </button>
        //           </div>
        //           <div class="modal-body">
        //             <p>jkhjkhjkhjkhk</p>
        //           </div>
        //           <div class="modal-footer">
        //             <button type="button" class="btn btn-primary">Save changes</button>
        //             <button type="button" class="btn btn-danger" data-dismiss="modal">Delete</button>
        //           </div>
        //         </div>
        //       </div>
        //     </div>`);.
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
            $('#messageModal').modal()

          // let buttonId = $(this).attr('id');
          // alert(buttonId);
          // alert(`This is the
          //   ${messageObj._id},
          //   This is the date ${messageObj.date},${messageObj.rating},${messageObj.address},${messageObj.title}`);
        });

};



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
