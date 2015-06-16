var apiKey = "DAKa8696003222b4812850342de17d0e267"; // Get from kandy.io 
var userId = "user1"; // Get from kandy.io 
var password = "1euminciduntconse1"; // Get from kandy.io 
var Kandy=require("kandy");
var kandy = new Kandy(apiKey);
 
kandy.getUserAccessToken(userId, password, function (data, response) {
        var dataJson = JSON.parse(data);
        console.log(dataJson);
    });
