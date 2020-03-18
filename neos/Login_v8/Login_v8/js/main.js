
$("#loginBtn").click(function() {
    $.ajax({
        url: 'http://localhost:3000/Admin/' + 1,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if ($("#username").val() == data.username && $("#password").val() == data.password) {
                $(location).attr('href', '../../restart/index.html');
            }
        }
    })
})