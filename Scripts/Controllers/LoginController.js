alignApp.controller('loginController', function ($scope, $location, $state) {

    //define scope variables
    $scope.initialise = function () {
        $scope.$emit('adjustHeader', 0);
    }

    //initialise scope variables
    $scope.initialise();

    $scope.login = {};


    //function to be called on form submit
    $scope.submitLoginForm = function () {        
        if ($scope.LoginForm.$valid) {
            console.log($scope.login);
            $state.go('home.dashboard');
        }                
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