
var alignApp = angular.module('alignApp', ['jcs-autoValidate', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ui.mask', 'ui.bootstrap', 'ngFileUpload', 'ui.calendar', 'ngDialog', 'ngProgress', 'multipleSelect', 'ui.router', 'ngStorage']);

alignApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    //$locationProvider.html5Mode({
    //    enabled: true,
    //}).hashPrefix('!');

    var loginState = {
        name: 'login',
        url: '/login',
        templateUrl: "Login.html",
        controller: "loginController",
        data: { pageTitle: 'Login' }
    }

    var signUpState = {
        name: 'signup',
        url: '/signup',
        templateUrl: "SignUp.html",
        controller: "signUpController",
        data: { pageTitle: 'Sign Up' }
    }    

    var homeState = {
        name: 'home',
        url: '/home',        
        templateUrl: "Home.html",
        controller: "homeController",
        data: { pageTitle: 'Home' }
    }

    var homeDashboardState = {
        name: 'home.dashboard',
        url: '/dashboard',
        templateUrl: "Templates/Dashboard.html",
        data: { pageTitle: 'Dashboard' }
    }

    var homeLiveState = {
        name: 'home.live',
        url: '/live',
        templateUrl: "Templates/Live.html",
        data: { pageTitle: 'Live' }
    }

    var homeEventPlusState = {
        name: 'home.event',
        url: '/event',
        templateUrl: "Templates/Event.html",
        data: { pageTitle: 'Event' }
    }

    var homeMyEventsState = {
        name: 'home.myevents',
        url: '/myevents',
        templateUrl: "Templates/MyEvents.html",
        data: { pageTitle: 'My Events' }
    }

    var homeReviewsState = {
        name: 'home.reviews',
        url: '/reviews',
        templateUrl: "Templates/ReviewsRatings.html",
        data: { pageTitle: 'Reviews/Ratings' }
    }

    var homePastEventsState = {
        name: 'home.pastevents',
        url: '/pastevents',
        templateUrl: "Templates/PastEvents.html",
        data: { pageTitle: 'Past Events' }
    }

    var homeLogOutState = {
        name: 'home.logout',
        url: '/logout',
        templateUrl: "Templates/LogOut.html",
        data: { pageTitle: 'Logout' }
    }

    var forgotPwdState = {
        name: 'forgotpwd',
        url: '/passwordrecovery',
        templateUrl: "ForgotPassword.html",
        data: { pageTitle: 'Forgot Password' }
    }

    var otherwiseState = {
        name: 'otherwise',
        url: '/',
        templateUrl: "Login.html",
        controller: "loginController",
        data: { pageTitle: 'Login' }
    }

    $urlRouterProvider.when("", "/login");
    
    $stateProvider.state(signUpState);
    $stateProvider.state(homeState);
    $stateProvider.state(homeLiveState);
    $stateProvider.state(homeDashboardState);
    $stateProvider.state(homeEventPlusState);
    $stateProvider.state(homeMyEventsState);
    $stateProvider.state(homeReviewsState);
    $stateProvider.state(homePastEventsState);    
    $stateProvider.state(loginState);
    $stateProvider.state(homeLogOutState);
    $stateProvider.state(forgotPwdState);
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

alignApp
  .run(function ($rootScope, $state, $stateParams, authFactory, $transitions, $localStorage) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $transitions.onStart({}, function (trans) {
          debugger;
          var route = trans.to();
          if (route.name != "signup" && route.name != "forgotpwd") {
              if (!$localStorage.authenticated) {
                  $state.go('login');
              }              
          }
      });
  });

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

