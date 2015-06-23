/**
 * Created by darshan on 3/16/2015.
 */
 $(function () {
   $(".accordion div").show();
    setTimeout("$('.accordion div').slideToggle('slow');", 1000);
    $(".accordion h3").click(function () {
    	
        $(this).next(".pane").slideToggle("slow").siblings(".pane:visible").slideUp("slow");
        $(this).toggleClass("current");
        $(this).siblings("h3").removeClass("current");
    });
var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {

$http.post('./php/employerAnalyseProfiles.php')
                    .success(function(data, status, headers, config) {
                            $scope.profiles=data;
                    }).error(function(data, status) { 
                        alert("Error While Fetching Data,Try Again");
                    }); 

$scope.txtarra=$scope.txtarra.replace(' #','23');
//get pdf links aswell
$http({
    url: 'http://172.20.10.3:1337/postmultstat', 
    method: "GET",
    params: {recip:$scope.rcpt,txtval: $scope.txtarra}
 }).success(function(data, status, headers, config) {
    alert(data);
 });


$scope.setupcall=function($val){
	//pass phone number
	alert('setupcall');
            $http({
    url: 'http://172.20.10.3:1337/schedulecallnotification', 
    method: "GET",
    params: {recip:$scope.rcpt,txtval: $scope.txtarra}
 }).success(function(data, status, headers, config) {

    alert(data);
    $http({
    url: 'http://172.20.10.3:1337/setupcall', 
    method: "GET",
    params: {recip:$scope.rcpt,txtval: $scope.txtarra}
 }).success(function(data, status, headers, config) {
    alert(data);
 });



 });
  };    

$scope.analyse=function($val){
	//pass mp3 link
alert('analyse');


            $http({
    url: 'http://172.20.10.3:1337/personalityinsights', 
    method: "GET",
    params: {recip:$scope.rcpt,txtval: $scope.txtarra}
 }).success(function(data, status, headers, config) {
    alert(data);
 });
}



$scope.shortlist=function($val){
	//pass email 
alert('shortlist');


   $http.post('./php/shortlist.php')
                    .success(function(data, status, headers, config) {
                            $scope.profiles=data;
$http({
    url: 'http://172.20.10.3:1337/sendMail', 
    method: "GET",
    params: {recip:$scope.rcpt,txtval: $scope.txtarra}
 }).success(function(data, status, headers, config) {
    alert(data);
 });
$http({
    url: 'http://172.20.10.3:1337/sendSMS', 
    method: "GET",
    params: {recip:$scope.rcpt,txtval: $scope.txtarra}
 }).success(function(data, status, headers, config) {
    alert(data);
 });




                    }).error(function(data, status) { 
                        alert("Error While Fetching Data,Try Again");
                    }); 

//also send mail and sms yes



                }

 $scope.reject=function($val){
	//pass email 
alert('reject');
$http.post('./php/reject.php')
                    .success(function(data, status, headers, config) {
                            $scope.profiles=data;
                            $http({
    url: 'http://172.20.10.3:1337/sendMail', 
    method: "GET",
    params: {recip:$scope.rcpt,txtval: $scope.txtarra}
 }).success(function(data, status, headers, config) {
    alert(data);
 });
                    }).error(function(data, status) { 
                        alert("Error While Fetching Data,Try Again");
                    }); 

    //send mail no
                }

	$('#pdfViewer').hide();


 $scope.resume=function($val){
	//pass email 
alert('resume');
	$('#pdfViewer').show();
                }

  }; 








});
});