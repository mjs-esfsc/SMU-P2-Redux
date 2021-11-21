$(document).ready(function(){
    let user = $.get("/api/user_data").then(function(data){
        console.log('user.email: ', data.email);
        console.log('user.id: ', data.id);
        return data;
    });
});

// This function will do a GET request for user's account and display the user's input on the homepage