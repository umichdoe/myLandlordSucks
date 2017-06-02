$(document).ready(function() {
    console.log('sanity check!');
    
    $.ajax({
        method: 'GET',
        url: '/api/messages',
        success: displayMessages,
        error: errorMessage
    });
    
    $('#message-form form').on('submit', function (e) {
        e.preventDefault();
        let formData = $(this).serialize();
        console.log(formData);
        $.post('/api/messages', formData, function(message) {
            console.log('album after POST', message);
            displayMessages(message);  //render the server's response
        });
        $(this).trigger("reset");
    });
});

function renderAllMessages(messages) {
  messages.forEach(function(message) {
    renderAlbum(message);
  });
}

function displayMessages (data) {
    data.forEach(function (oneMessageObj) {
        $('#messageBoard').append(`
        <div class='container'>
            <h4>Title:</h4> <p>${oneMessageObj.title}</p>
            <h4>Address:</h4> <p>${oneMessageObj.address}</p>
            <h4>Rating:</h4> <p>${oneMessageObj.rating}</p>
            <button class='btn btn-primary'>Read Message</button>
        </div>
        `);
    })
}

function errorMessage (error) {
    console.log(err);
}