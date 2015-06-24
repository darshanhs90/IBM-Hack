/**
 * Created by darshan on 3/16/2015.
 */
 var app = angular.module('myApp', []);




    
    app.controller('myCtrl', function($scope, $http) {

        $scope.profiles=['s'];
            $http.post('./php/callingPage.php')
                .success(function(data, status, headers, config) {
                    alert(data);
                    $scope.profiles = data;
                }).error(function(data, status) {
                    alert("Error While Fetching Data,Try Again");
                });

            $scope.setupcall = function($val) {
                //pass phone number
                var txtval='You have been selected for 1st round voice call interview by '+$scope.profiles[$val].remail;
                $http({
                    url: 'http://127.0.0.1:1337/schedulecallnotification',
                    method: "GET",
                    params: {
                        number: $scope.profiles[$val].pnumber
                    }
                }).success(function(data, status, headers, config) {
                        alert(data);

                    $http({
                        url: 'http://127.0.0.1:1337/sendSms',
                        method: "GET",
                        params: {
                            number: $scope.profiles[$val].pnumber,
                            txtval: txtval
                        }
                    }).success(function(data, status, headers, config) {
                        alert(data);
                        

                        $http({
                        url: 'http://127.0.0.1:1337/sendMail',
                        method: "GET",
                        params: {
                            number: $scope.profiles[$val].email,
                            txtval:txtval
                        }
                    }).success(function(data, status, headers, config) {
                        alert(data);
                    });

                 });

            });

        }



           $scope.analyse = function($val) {
                //pass mp3 link
                alert('analyse');

                //var mp3=$scope.profiles[$val].transcript;
                //var email=$scope.profiles[$val].email;
                var email="hsdars@gmail.com";
                var mp3="Call me Ishmael. Some years ago-never mind how long precisely-having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off-then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.";
                if(mp3.length>150){

                $http({
                    url: 'http://127.0.0.1:1337/personalityinsights',
                    method: "GET",
                    params: {
                        voicelink: mp3
                        
                    }
                }).success(function(data, status, headers, config) {
                    //alert(data);
                    console.log(data);
                    $scope.pInsight=data;
                    $scope.childrenLength=data.tree.children.length;
                    alert($scope.childrenLength);

                    $scope.children=data.tree.children;

                    //personinfo analysis
                $http({
                    url: 'http://127.0.0.1:1337/personInfo',
                    method: "GET",
                    params: {
                        email: email
                        
                    }
                }).success(function(data, status, headers, config) {
                    //alert(data);
                    console.log(data);
                    $scope.pInfo=(data);
                     $scope.location=($scope.pInfo.demographics.locationGeneral);
            $scope.likelihood=($scope.pInfo.likelihood);
            $scope.arry=$scope.pInfo.socialProfiles;
                });




                });
            }
            else{
                $http({
                    url: 'http://127.0.0.1:1337/personInfo',
                    method: "GET",
                    params: {
                        email: email
                        
                    }
                }).success(function(data, status, headers, config) {
                    alert(data);
                    console.log(data);
                     $scope.pInfo=(data);
                     $scope.location=($scope.pInfo.demographics.locationGeneral);
            $scope.likelihood=($scope.pInfo.likelihood);
            $scope.arry=$scope.pInfo.socialProfiles;
                });
            }





            }






          $scope.shortlist = function($val) {
                //pass email 
                alert('shortlist');
                //php call
                 var txtval='You have been selected for 1st round voice call interview by '+$scope.profiles[$val].remail;
                
                $http.post('./php/shortlist.php')
                    .success(function(data, status, headers, config) {
                        $scope.profiles = data;
                        $http({
                            url: 'http://127.0.0.1:1337/sendMail',
                            method: "GET",
                            params: {
                            number: $scope.profiles[$val].email,
                            txtval:txtval
                            }
                        }).success(function(data, status, headers, config) {
                            alert(data);
                        });


                        $http({
                            url: 'http://127.0.0.1:1337/sendSMS',
                            method: "GET",
                            params: {
                            number: $scope.profiles[$val].email,
                            txtval:txtval
                            }
                        }).success(function(data, status, headers, config) {
                            alert(data);
                        });

                    }).error(function(data, status) {
                        alert("Error While Fetching Data,Try Again");
                    });
        }








             $scope.reject = function($val) {
                //pass email 
                alert('reject');

                //php call
                
                var txtval='Sorry,Your profile has been selected rejected by '+$scope.profiles[$val].remail;
                
                $http.post('./php/reject.php')
                    .success(function(data, status, headers, config) {
                        $scope.profiles = data;
                        $http({
                            url: 'http://127.0.0.1:1337/sendMail',
                            method: "GET",
                            params: {
                            number: $scope.profiles[$val].email,
                            txtval:txtval
                            }
                        }).success(function(data, status, headers, config) {
                            alert(data);
                        });
                    }).error(function(data, status) {
                        alert("Error While Fetching Data,Try Again");
                    });

                //send mail no
            }



             $scope.x=0;
             $scope.resume = function($val) {
                //pass email 
                alert('resume');
                if($scope.x==0)
                    $scope.x=1;
                else
                    $scope.x=0;
                $scope.pdfViewer.attr(src,$scope.profiles[$val].resumelink);
              
            }
   
});