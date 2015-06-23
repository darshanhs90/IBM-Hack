var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {

$scope.txtarra=$scope.txtarra.replace(' #','23');
function changePlaceholder() {
          
          // create our list of different placeholders we'll use
          var placeHolders = new Array();
          placeHolders[0] = "Search for Google";
          placeHolders[1] = "Search for Microsoft";
          placeHolders[2] = "Search for Facebook";
          
          // x will be our counter for what placeholder we're currently showing
          var x = 0;
          
          // change the placeholder to the current number of our counter
          $('#searchBox').attr('placeholder', placeHolders[x]);

          // increase the counter
          x++;
       
          // if we've hit the last placeholder then start over
          if(x >= placeHolders.length) {
               x = 0;
          }
       
          // run this function again in 3 seconds to keep the loop going   
          setTimeout(changePlaceholder, 1000);
     }
     
     // start running the changePlaceholder function after 3 seconds
     t = setTimeout(changePlaceholder, 1000);

$scope.search=function(){


$http({
    url: 'http://172.20.10.3:1337/companyInfo', 
    method: "GET",
    params: {company:$scope.company}
 }).success(function(data, status, headers, config) {
    alert(data);
    // map
 var map = new google.maps.Map(document.getElementById('map'), { 
       mapTypeId: google.maps.MapTypeId.TERRAIN,
       zoom: 12
   });

   var geocoder = new google.maps.Geocoder();

   geocoder.geocode({
      'address': address
   }, 
   function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
         new google.maps.Marker({
            position: results[0].geometry.location,
            map: map
         });
         map.setCenter(results[0].geometry.location);
      }
      else {
         // Google couldn't geocode this request. Handle appropriately.
      }
   });
// map ends






 });
}

$scope.srch=function(){


$http({
    url: 'http://172.20.10.3:1337/twitterCompanySentiment', 
    method: "GET",
    params: {company:$scope.searchBox}
 }).success(function(data, status, headers, config) {
    alert(data);
 });
}


});


