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

$scope.txtarra=$scope.txtarra.replace(' #','23');
//phpcall




$scope.sendaccept=function($val){
    //pass phone number
    var number=$scope.profiles[$val].pnumber;
    var textval='You have been offered a job by '+$scope.profiles[$val].email+' from company '+$scope.profiles[$val].company;
    
    alert('setupcall');
            $http({
    url: 'http://127.0.0.1:1337/schedulecallnotification', 
    method: "GET",
    params: {number:number,textval:'2'}
 }).success(function(data, status, headers, config) {

    alert(data);
    $http({
    url: 'http://127.0.0.1:1337/sendSms', 
    method: "GET",
    params: {number:number,textval:textval}
 }).success(function(data, status, headers, config) {
    alert(data);
 });

 $http({
    url: 'http://127.0.0.1:1337/sendEmail', 
    method: "GET",
    params: {number:number,textval:textval}
 }).success(function(data, status, headers, config) {
    alert(data);
 });


 });
  };    



























});

});