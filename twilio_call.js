// Twilio Credentials 
var accountSid = 'id'; 
var authToken = 'token'; 
 
//require the Twilio module and create a REST client 
var clientTwilio = require('twilio')(accountSid, authToken); 
 
clientTwilio.calls.create({ 
	to: "+num", 
	from: "+othnum", 
	url: "fileurl",  
	method: "GET",  
	fallbackMethod: "GET",  
	statusCallbackMethod: "GET",    
	record: "false" 
}, function(err, call) { 
	if(err)
		console.log(err);
	console.log(call.sid); 
});
