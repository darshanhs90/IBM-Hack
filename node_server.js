'use strict';

//Module declaration
var request=require('request');
var https=require('https');
var cors = require('cors')
var express=require('express');
var app = express();
app.use(cors());
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'LmNp3JwAQZnuBr4SQFaM7UZG3',
  consumer_secret: 'Xps6ziqIhZ0exAPoIAeyqj7myu7L78ZLHQDni67dzD9koJQTAD',
  access_token_key: '151128859-F4Wk8KebqH4ZDwp8tMWY8PkoTQzfiEJrN1t2Knfc',
  access_token_secret: 'czQre16YZKoC4Csi18gGufu8PxF733aL5VnzbhurlGvHw'
});
var watson = require('watson-developer-cloud');
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('7b6bf4773c39c9e271f6bd999fea5df5179a6dad');
var apiKey = "DAKa8696003222b4812850342de17d0e267"; // Get from kandy.io 
var userId = "user1"; // Get from kandy.io 
var password = "1euminciduntconse1"; // Get from kandy.io 
var Kandy=require("kandy");
var kandy = new Kandy(apiKey);
var userAccessToken;
kandy.getUserAccessToken(userId, password, function (data, response) {
        var dataJson = JSON.parse(data);
        console.log(dataJson.result.user_access_token);
        userAccessToken=dataJson.result.user_access_token;
});

kandy=new Kandy();
var sendgrid  = require('sendgrid')('hsdars', 'Darshanhs90-');
var accountSid = 'AC07275e4294f1b0d42623c3ec9559911e'; 
var authToken = '650d049a9bd99323fb899ce4b9e84fcc'; 
var clientTwilio = require('twilio')(accountSid, authToken); 

//company ip declaration

// var ips=['0','23.13.169.35','23.196.118.201','23.195.87.224','64.233.183.105',
// '31.13.71.1','23.195.91.218','208.54.70.10','209.99.98.33','23.195.80.170','208.54.70.10','159.153.103.209',
// '72.172.89.185','23.13.163.95','208.54.70.8'];
// var cid=['0','1864','162479','1066','1441','10667','1497','2018','5617','1063','1481','162717','5329','164215','1053'];
// var ipname=['','3M','Apple Inc','Motorola Mobility','Google Inc','Facebook','AMD','Applied Materials',
// 'Cirrus Logic','Cisco Systems','eBay/PayPal','Bioware','Blizzard Entertainment','Hoovers','Intel Corporation']



//send mail from employer to student
app.get('/sendMail',function(reqst,rspns){
console.log(reqst.query);//here lies the params
var toEmailAddress=reqst.query;
var subjectMail;
var name;
var companyName;
var textMail;
//get from "name","to email address","company name"
sendgrid.send({
  to:       'hsdars@gmail.com',
  from:     'hsdars@gmail.com',
  subject:  'Hello World',
  text:     'My first email through SendGrid.'
}, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});

});

//send sms from employer to student
app.get('/sendSms',function(reqst,respns){
var from = "+14694164117"; // Optional 
var to = "+14697672278"; // Required ,change it
var text = "Hello from Kandy"; // Required ,change it


kandy.sendSms(userAccessToken, from, to, text, function (data, response) {
      var dataJson = JSON.parse(data);
      console.log(dataJson);
      if (dataJson.message == "success") {
          console.log("Sent to " + to + ": " + text);
      }
});

});

//analyse company score in twitter passing tweet to ibm sentiment analyser
app.use('/twitterCompanySentiment',function(reqst,respns){

//get companyname from request
var companyName;
client.get('search/tweets', {q: companyName}, function(error, tweets, response){
   
  var length=(tweets.statuses.length);
  console.log(length);
  var total=0;
  var count=0;
   (tweets.statuses).forEach(function(e){
    var text=e.text;
    console.log(text);  
    alchemy.sentiment(text, {}, function(err, response) {
     if (err) 
      throw err;
    var sentiment = response.docSentiment;
    console.log(sentiment);
    //asd=sentiment;
    //res.send(asd);
    total+=sentiment
    });
      });
   total=total/length;
   res.send(total);
   });
});

//linkedin jobs feed
app.use('/linkedjobsfeed',function(req,res){
  var num=(req.url.substring(9));
  var ip=cid[num];
  https.get('https://api.linkedin.com/v1/companies/'+ip+'/updates?oauth2_access_token=AQUxHxrW_VKxyQoipBT3-37W7cj3NJhF0LLmGARZvGX2hziIY9gdy8HEdaZHTGLPuo8T8mHdD0X64HEZIQeSL-6mj8hMLAGPH2IuZAwi8HF_6sFe7sM79r0q1wxyxZpCXcT_M8gicNIieekmGegFpHp8H-UqjPnTLwWNKUd1HI4taXVbbdg&format=json',
  function(response){
   var body = '';
        response.on('data', function(d) {
            body += d;
        });
    response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            console.log('linkedin');
            res.send(parsed);
        });

});
});

//analyse insights based on voice response using ibm
app.get('/personalityinsights',function(reqst,respns){


var personality_insights = watson.personality_insights({
        "username": "aa358f77-75ab-4560-82ed-bbf4aa1c1b4b",
        "password": "Mo0l98NbJP01",
  version: 'v2'
});

personality_insights.profile({
  text: 'Knowing that millions of people around the world would be watching in person and on television and expecting great things from him — at least one more gold medal for America, if not another world record — during this, his fourth and surely his last appearance in the World Olympics, and realizing that his legs could no longer carry him down the runway with the same blazing speed and confidence in making a huge, eye-popping leap that they were capable of a few years ago when he set world records in the 100-meter dash and in the 400-meter relay and won a silver medal in the long jump, the renowned sprinter and track-and-field personality Carl Lewis, who had known pressure from fans and media before but never, even as a professional runner, this kind of pressure, made only a few appearances in races during the few months before the Summer Olympics in Atlanta, Georgia, partly because he was afraid of raising expectations even higher and he did not want to be distracted by interviews and adoring fans who would follow him into stores and restaurants demanding autographs and photo-opportunities, but mostly because he wanted to conserve his energies and concentrate, like a martial arts expert, on the job at hand: winning his favorite competition, the long jump, and bringing home another Gold Medal for the United States, the most fitting conclusion to his brilliant career in track and field.' },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});

});

//call notification with questions
app.get('/schedulecallnotification',function(reqst,respns){
clientTwilio.calls.create({ 
  to: "+14697672278", 
  from: "+14694164117", 
  url: "https://www.dropbox.com/s/3nsmfduffri1lg5/twilio.xml",  
  method: "GET",  
  fallbackMethod: "GET",  
  statusCallbackMethod: "GET",    
  record: "false" 
}, function(err, call) { 
  if(err)
    console.log(err);
  console.log(call.sid); 
});

});
app.listen(1337,'127.0.0.1');
       