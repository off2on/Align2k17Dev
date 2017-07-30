alignApp.controller('loginController', function ($scope, $location, $state, dataFactory, $localStorage, authFactory, $timeout) {

    //define scope variables
    $scope.authSuccess = true;
    $scope.loggingIn = false;
    $scope.initialise = function () {
        $scope.$emit('adjustHeader', 0);
    }

    //initialise scope variables
    $scope.initialise();

    $scope.login = {};


    //function to be called on form submit
    $scope.submitLoginForm = function () {        
        if ($scope.LoginForm.$valid) {
            $scope.loggingIn = true;
            //dataFactory.postLoginData('login', $scope.login).then(function (response) {
            //    console.log(response.data);
            //    $state.go('home.dashboard');
            //}, function (error) {
            //    $scope.status = "User Authentication Failed" + error.data;
            //});
            authFactory.checkAuth($scope.login.userName, $scope.login.password);

            if (authFactory.isAuthed()) {
                $scope.authSuccess = true;
                $scope.$storage = $localStorage.$default({
                    userName: $scope.login.userName
                });
                //$scope.loggingIn = false;
                $state.go('home.dashboard');
            }
            else
            {
                //$scope.loggingIn = false;               
                $scope.authSuccess = false;
            }
        }
        $timeout(function () {
            $scope.loggingIn = false;
        },500);
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