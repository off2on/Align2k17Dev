
var alignApp = angular.module('alignApp', ['jcs-autoValidate', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ui.mask', 'ui.bootstrap', 'ngFileUpload', 'ui.calendar', 'ngDialog', 'ngProgress', 'mentio', 'multipleSelect','ui.router']);

alignApp.config(function ($stateProvider, $urlRouterProvider) {
    var loginState = {
        name: 'login',
        url: '/login',
        templateUrl: "Login.html",
        controller: "loginController"
    }

    var signUpState = {
        name: 'signup',
        url: '/signup',
        templateUrl: "SignUp.html",
        controller: "signUpController"
    }    

    var homeState = {
        name: 'home',
        url: '/home',
        templateUrl: "Home.html",
        controller: "homeController"
    }

    var homeDashboardState = {
        name: 'home.dashboard',
        url: '/dashboard',
        templateUrl: "_PartialViews/Dashboard.html",
        
    }

    var homeLiveState = {
        name: 'home.live',
        url: '/live',
        templateUrl: "_PartialViews/Live.html",
        
    }

    var homeEventPlusState = {
        name: 'home.event',
        url: '/event',
        templateUrl: "_PartialViews/Event.html",
        
    }

    var homeMyEventsState = {
        name: 'home.myevents',
        url: '/myevents',
        templateUrl: "_PartialViews/MyEvents.html",
        
    }

    var homeReviewsState = {
        name: 'home.reviews',
        url: '/reviews',
        templateUrl: "_PartialViews/ReviewsRatings.html",
        
    }

    var homePastEventsState = {
        name: 'home.pastevents',
        url: '/pastevents',
        templateUrl: "_PartialViews/PastEvents.html",
        
    }


    var otherwiseState = {
        name: 'otherwise',
        url: '/',
        templateUrl: "Login.html",
        
    }

    $urlRouterProvider.when("", "/login");


    $stateProvider.state(loginState);
    $stateProvider.state(signUpState);
    $stateProvider.state(homeState);
    $stateProvider.state(homeLiveState);
    $stateProvider.state(homeDashboardState);
    $stateProvider.state(homeEventPlusState);
    $stateProvider.state(homeMyEventsState);
    $stateProvider.state(homeReviewsState);
    $stateProvider.state(homePastEventsState);    
    
    $stateProvider.state(otherwiseState);

});


//alignApp.config(function ($routeProvider, $locationProvider) {
//    $routeProvider
//    .when("/", {
//        templateUrl: "Login.html",
//        controller: "loginController"

//    })

//    .when("/SignUp", {
//        templateUrl: "SignUp.html",
//        controller: "signUpController"
//    })

//    .when("/Home", {
//        templateUrl: "Home.html",
//        controller: "homeController"
//    })

//    .otherwise({ redirectTo: '/' });
//    $locationProvider.html5Mode({
//        enabled: false,        
//        requireBase: false,

//    })
//    $locationProvider.hashPrefix('');
//});
    

//configuration required for jcs auto validate
alignApp.run([
        'bootstrap3ElementModifier',
        function (bootstrap3ElementModifier) {
            bootstrap3ElementModifier.enableValidationStateIcons(true);
        }

]);

alignApp.controller("pageLoadController", function ($scope, $location, $rootScope, ngProgressFactory) {
    $scope.pageLoadComplete = false;
    $scope.headerCenter = true;

    $scope.progressbar = ngProgressFactory.createInstance();

    $scope.startProgress = function () {
        //$event.preventDefault();

        $scope.progressbar.start();
    }

    //$scope.startProgress();

    angular.element(function () {
        $scope.pageLoadComplete = true;
        //$scope.progressbar.complete();
        
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

