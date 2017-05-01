
var alignApp = angular.module('alignApp', ['jcs-autoValidate', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ui.mask', 'ui.bootstrap', 'ngFileUpload', 'ui.calendar', 'ngDialog','ngProgress',]);

alignApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "Login.html",
        controller: "loginController"

    })
        
    .when("/SignUp", {
        templateUrl: "SignUp.html",
        controller: "signUpController"
    })

    .when("/Home", {
        templateUrl: "Home.html",
        controller: "homeController"
    })
    ;
    $locationProvider.html5Mode({
        enabled: false,        
        requireBase: false,

    })
    $locationProvider.hashPrefix('');
});
    

//configuration required for jcs auto validate
alignApp.run([
        'bootstrap3ElementModifier',
        function (bootstrap3ElementModifier) {
            bootstrap3ElementModifier.enableValidationStateIcons(true);
        }

]);

alignApp.controller("pageLoadController", function ($scope, $location, $rootScope) {
    $scope.pageLoadComplete = false;
    $scope.headerCenter = true;
    angular.element(function () {
        $scope.pageLoadComplete = true;
        
    });

    $scope.path = $location.path();
    //console.log($scope.path);

    $scope.$on('adjustHeader', function (event, data) {
        if(data==1)
        {
            $scope.headerCenter = false;
        }
        else {
            $scope.headerCenter = true;
        }
    });


        //if ($scope.path == '/SignUp' || $scope.path == '/') {
        //    $scope.headerCenter = true;
        //}
        //else {
            
        //}

   
});

function ConfirmPasswordValidatorDirective(defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['confirmPassword'] = 'Please ensure the passwords match.';
    });

    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            confirmPassword: '=confirmPassword'
        },
        link: function (scope, element, attributes, ngModel) {
            ngModel.$validators.confirmPassword = function (modelValue) {
                return modelValue === scope.confirmPassword;
            };

            scope.$watch('confirmPassword', function () {
                ngModel.$validate();
            });
        }
    };
}

ConfirmPasswordValidatorDirective.$inject = [
  'defaultErrorMessageResolver'
];

alignApp.directive('confirmPassword', ConfirmPasswordValidatorDirective);

//alignApp.run(function ($rootScope, $location) {

//    // To maintain the route on page refresh
//    if ($location.$$path != "") sessionStorage.routeChange = false;

//    $rootScope.$on("$routeChangeStart", function (event, next, current) {
//        if ($rootScope.rootEmpId == null) {
//            //    $location.path("/login");
//        }
//    });
//})

