alignApp.controller('loginController', function ($scope, $location) {

    //define scope variables
    $scope.initialise = function () {
        $scope.$emit('adjustHeader', 0);
    }

    //initialise scope variables
    $scope.initialise();


    //function to be called on form submit
    $scope.submitLoginForm = function () {
        
        if ($scope.LoginForm.$valid) {
            $location.url('/Home');
        }
        
        //alert($location.path);
    }

    $scope.redirectToSignUp = function () {
        $location.url('/SignUp');
    }

    $scope.startProgress = function () {
        //$event.preventDefault();

        $scope.progressbar.start();
    }

    $scope.startProgress();

    angular.element(function () {        
        $scope.progressbar.complete();

    });

});