$(document).ready(function() {
    console.log('sanity check!');
    
    $.ajax({
        method: 'GET',
        url: '/api/messages',
        success: displayMessages,
        error: errorMessage
    });
});

function displayMessages (data) {
    data.forEach(function (oneMessageObj) {
        $('#messageBoard').append(`
        <p>Title: ${oneMessageObj.title}</p>
        <p>Address: ${oneMessageObj.address}</p>
        <p>Rating: ${oneMessageObj.rating}</p>
        <p>Message: ${oneMessageObj.message}</p>
        `);
    })
}

function errorMessage (error) {
    console.log(err);
}