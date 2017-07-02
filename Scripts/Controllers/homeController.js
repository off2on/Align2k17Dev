alignApp.controller('homeController', function ($rootScope, $scope, $http, defaultErrorMessageResolver, $timeout, ngDialog, ngProgressFactory, $compile, $state, uiCalendarConfig, $transitions) {

    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.progressbar.start();    
    $scope.eventForm = {};
    $scope.invalid = false;
    $scope.selectedList = [];
    $transitions.onStart({}, function (trans) {
        $scope.progressbar.start();
    });

    $scope.$watch('selectedList', function (newValue,oldValue) {
        console.log(newValue);
    })
   

    $rootScope.$on('$viewContentLoaded', function () {        
        var route = $state.$current.name;
        route = route.substr(5, route.length);
        for (var i = 0; i < $scope.navigation.home.length; i++)
        {
            if($scope.navigation.home[i].tile==route)
            {
                $scope.leftNavId = $scope.navigation.home[i].id;
                break;
            }
            else
            {
                $scope.leftNavId = 0;                
                //$state.$current.name = "home.dashboard";
            }
        }
        if ($scope.leftNavId == 0) {
            $state.go("home.dashboard");
        }
        //$scope.leftNavId = $scope.navigation.home[route.substr(5,route.length)];
        $timeout(function () {
            $scope.endProgress();
        }, 0);
        
    });

    $scope.navigation = {
        "home":[ 
        {
            "id": 1,
            "name":"Live",
            "tile": "live"
        },
        {
            "id": 2,
            "name": "Event+",
            "tile": "event"
        },
        {
            "id": 3,
            "name": "My Events",
            "tile": "myevents"
        },
         {
             "id": 4,
             "name": "Reviews/Ratings",
             "tile": "reviews"
         },
        {
            "id": 5,
            "name": "Past Events",
            "tile": "pastevents"
        },
         ]      
    }

    

    $scope.optionsList = [
  { id: 1, name: "Meetup" },
  { id: 2, name: "Party" },
  { id: 3, name: "Conference" },
   { id: 4, name: "Golf Match" },
  { id: 5, name: "Lunch" },
  { id: 6, name: "Dinner" }
    ];

    $scope.getJsonData = function () {
        //$http.get('../StaticDataFiles/StaticJsonData.json').then(function (response) {
        $http.get('https://raw.githubusercontent.com/off2on/Align2k17Dev/master/StaticJsonData.json').then(function (response) {
            $scope.jsonData = response.data;

            $scope.initialiseCalender($scope.jsonData.MyEvents);
            //$timeout(function () {
            //    uiCalendarConfig.calendars['calendar'].fullCalendar('rerenderEvents');
            //});
            
        })
    }

    $scope.initialiseCalender = function (myEvents) {
        //$http.get('../StaticDataFiles/MyEventsData.json').then(function (response) {
        
        var myEventsData = myEvents;

            angular.forEach(myEventsData, function (key, value) {
                key['start'] = new Date(key.start.y, key.start.m, key.start.d, key.start.hh, key.start.mm);
                key['end'] = new Date(key.end.y, key.end.m, key.end.d, key.end.hh, key.end.mm);
            });

            $scope.events = myEventsData;
            $scope.eventSources = [$scope.events];
            $scope.uiConfig = {
                calendar: {
                    height: 700,
                    editable: false,
                    header: {
                        left: 'month basicWeek basicDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    eventRender: $scope.eventRender,
                    eventClick: $scope.alertEventOnClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize,

                }
            };
        
    }

    
    $scope.getJsonData();


    $scope.getCategoriesTextRaw = function (item) {
        //return '@' + item.name;
        //console.log(item.label);
        if($scope.selectedCategories.indexOf(item)==-1)
            $scope.selectedCategories.push(item);
        else

        return '+' + item.label;
    };


    var disableVisualStylingTime = function () {
        $('#time :input').attr('disable-validation-message', '');
        $('#time :input').attr('disable-invalid-styling', 'true');
        $('#time :input').attr('disable-valid-styling', 'true');
        $('#date').attr('disable-validation-message', '');
    }

    angular.element(function () {
        $scope.progressbar.complete();
            $scope.$watch('leftNavId', function () {
        if ($scope.leftNavId == 2) {
            $timeout(function () {
                disableVisualStylingTime();
            }, 500);

        }
    });
    });
    $scope.$emit('adjustHeader', 1);
    //define scope variables
    $scope.initialise = function () {
        $scope.signUpInfo1 = true;
        $scope.menuStatus = [
            { isOpen: true },
            { isOpen: false },
        ];
        $scope.leftNavId = 0    ;
        $scope.showAll = true;
        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
            errorMessages['maxSize'] = 'File too large. Maximum allowed size is 2MB.';
            errorMessages['time'] = 'Please enter a valid time.';
            errorMessages['hours'] = 'Invalid hours.';
            errorMessages['minutes'] = 'Invalid minutes.';
        });
        $scope.renderCalender = function (calendar) {
            if ($scope.uiConfig.calendar) {                
                $scope.uiConfig.calendar.fullCalendar('render');
            }
        };
        

        $scope.startProgress = function($event)
        {
            $event.preventDefault();
            
            $scope.progressbar.start();
        }
        

        $scope.endProgress = function ($event) {
            
            $scope.progressbar.complete();
            
            //$event.preventDefault();
        }


    }


    $scope.setLeftNavId = function (id) {
        if ($scope.leftNavId != id)
        {
            //$scope.startProgress($event);
            $scope.leftNavId = id;            
        }               
    }    

    //initialise scope variables
    $scope.initialise();    

    $scope.toggleMenuStatus = function (menuId) {
        angular.forEach($scope.menuStatus, function (value, key) {
            if (key != menuId)
            value.isOpen = false;
        });

        if ($scope.menuStatus[menuId].isOpen) {
            $scope.menuStatus[menuId].isOpen = false;
        }
        else {
            $scope.menuStatus[menuId].isOpen = true;
        }
    }


    $scope.setSignUpInfo = function (flag) {
        switch (flag) {
            case 1:
                $scope.signUpInfo1 = true;
                $scope.class = "ng-hide-remove1";
                break;
            case 2:
                $scope.signUpInfo1 = false;
                $scope.class = "ng-hide-remove2";
        }

    }

    //function to be called on form submit
    $scope.submitEventForm = function () {
        var obj = $scope.eventForm.createEventForm.multipleSelect;
        
        if(obj.$invalid==true)
        {
            $scope.invalid = true;
            $('.ng-ms').addClass('event-has-error');
            $('.ng-ms').removeClass('event-has-success');
        }
        else {
            $('.ng-ms').removeClass('event-has-error');
            $('.ng-ms').addClass('event-has-success');
        }
        

    }

    //-----------------------MyEvents--------------------------------------//
 

    $scope.eventRender = function (event, element, view) {
        element.attr({
            'uib-tooltip': event.title,
            'tooltip-append-to-body': true
        });
        $compile(element)($scope);
    };

    $scope.alertEventOnClick = function (date) {

        $scope.selectedEvent = date;

        ngDialog.open({ template: '_PartialViews/EventInfo.html', className: 'ngdialog-theme-default', scope: $scope });
    }

    $scope.dateOptions = {
        dateDisabled: false,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.dt = new Date();
    

    $scope.popup1 = {
        opened: false
    };

    $scope.openDatePicker = function () {
        $scope.popup1.opened = true;
    };



    
});

//--------------------Directives-------------------------------------------------//

function NavigationDirective() {
    return {
        restrict: 'E',
        scope: {
            nav: '@nav',
            id: '@id',
            name: '@name',            
            selectedTile:'@selectedTile'
        },        
        templateUrl: '_PartialViews/Navigation.html',
        link: function (scope, elem, attr) {
            $('.left-menu-nav').on('click', function () {
                if ($('#leftNavBtn').is(":visible")) {
                    $('#leftNavBtn').click();
                }

            });
        }
    }
}

function ReviewsRatingsDirective() {
    return {
        restrict: 'E',
        scope: {
            review: '@review',
            rating: '=rating',
            name: '@name',
            designation: '@designation',
            imgUrl: '@imgUrl',
        },
        templateUrl: '_PartialViews/ReviewTemplate.html',
        
    };
};

function PastEventsDirective() {
    return {
        restrict: 'E',
        scope: {
            eventSubTitle: '@eventSubTitle',
            eventDateTime: '@eventDateTime',
            eventPlace: '@eventPlace',
            eventPlaceAddress: '@eventPlaceAddress',
            eventImgUrl: '@eventImgUrl',
        },
        templateUrl: '_PartialViews/PastEventTemplate.html',
        
    }
}

function LiveAllDirective() {
    return {
        restrict: 'E',
        scope: {
            liveAllImageUrl: '@liveAllImageUrl',
            liveAllName: '@liveAllName',
            liveAllDesignation: '@liveAllDesignation'
        },
        templateUrl: '_PartialViews/LiveAllTemplate.html',
    }
}

function LiveAlignDirective() {
    return {
        restrict: 'E',
        scope: {
            liveAlignImageUrl: '@liveAlignImageUrl',
            liveAlignName: '@liveAlignName',
            liveAlignDesignation: '@liveAlignDesignation',
            liveAlignedToImageUrl: '@liveAlignedToImageUrl',
            liveAlignedToName: '@liveAlignedToName',
            liveAlignedToDesignation: '@liveAlignedToDesignation'
        },
        templateUrl: '_PartialViews/LiveAlignTemplate.html',
    }
}

function EventReviewsRatingsDirective() {
    return {
        restrict: 'E',
        scope: {
            eventName: '@eventName',
            eventDateTime: '@eventDateTime',            
        },
        templateUrl: '_PartialViews/EventReviewTemplate.html',
    }
}


function RangeFilter() {
    return function(arr,range)
    {
        range = parseInt(range);
        for(var i=0;i<range;i++)
        {
            arr.push(i);
        }
        return arr;
    }
};

alignApp.directive('navigation', NavigationDirective);

alignApp.directive('eventReviewsRatings', EventReviewsRatingsDirective);

alignApp.directive('reviewsRatings', ReviewsRatingsDirective);

alignApp.directive('pastEvents', PastEventsDirective);

alignApp.directive('liveAll', LiveAllDirective);

alignApp.directive('liveAlign', LiveAlignDirective);

alignApp.filter('range', RangeFilter);


