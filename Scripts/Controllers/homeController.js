alignApp.controller('homeController', function ($scope,$http, defaultErrorMessageResolver, $timeout, ngDialog, ngProgressFactory,$compile) {

    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.progressbar.start();

    $scope.selectedCategories = [];

    $scope.categories = [
                       {
                           "label": "Meetup",
                           "imageUrl": "https://avatars0.githubusercontent.com/u/3493285?s=460"
                       },
                       {
                           "label": "Party",
                           "imageUrl": "https://avatars0.githubusercontent.com/u/207585?s=460"
                       },
                       {
                           "label": "Conference",
                           "imageUrl": "http://educationalsoftware.wikispaces.com/file/view/manga_suzie.jpg/38030142/178x177/manga_suzie.jpg"
                       },
    ];

    $scope.getJsonData = function () {
        $http.get('../StaticDataFiles/StaticJsonData.json').then(function (response) {
            //$http.get('https://raw.githubusercontent.com/off2on/Align2k17Dev/master/StaticJsonData.json').then(function (response) {
            $scope.jsonData = response.data;

            initialiseCalender($scope.jsonData.MyEvents);
        })
    }

    var initialiseCalender = function (myEvents) {
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
            if ($scope.uiConfig.calendars[calendar]) {                
                $scope.uiConfig.calendars[calendar].fullCalendar('render');
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


    $scope.setLeftNavId = function (id, $event) {
        if ($scope.leftNavId != id)
        {
            $scope.startProgress($event);
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
    $scope.submitLoginForm = function () {



    }

    //-----------------------MyEvents--------------------------------------//
 
    //var date = new Date();
    //var d = date.getDate();
    //var m = date.getMonth();
    //var y = date.getFullYear();
    /* event source that contains custom events on the scope */
    //$scope.events = [
    //  { id: '1', title: 'CocaHeads Meeting', 'start': new Date(y, m, 5, 20, 15), end: new Date(y, m, 6, 21, 15),allDay: false, subTitle: 'CocaHeads Meetup April 2017', date: 'Saturday, April 13 at 8:00 pm - 9:30 pm', place: 'Apple Store', desc: 'This is a bi-weekly social event where you can meet others who have same passion as you!' },
    //  { id: '2', title: 'Technically Philly', start: new Date(y, m, 10, 20, 15), end: new Date(y, m, 10, 20, 15), allDay: false, subTitle: 'Technically Philly Meetup April 2017', date: 'Saturday, April 13 at 8:00 pm - 9:30 pm', place: 'Apple Store', desc: 'This is a bi-weekly social event where you can meet others who have same passion as you!' },
    //  { id: '3', title: 'CocaHeads Meeting', start: new Date(y, m, 15, 20, 15), end: new Date(y, m, 15, 20, 15), allDay: true, subTitle: 'CocaHeads Meetup April 2017', date: 'Saturday, April 13 at 8:00 pm - 9:30 pm', place: 'Apple Store', desc: 'This is a bi-weekly social event where you can meet others who have same passion as you!' },
    //  { id: '4', title: 'Technically Philly', start: new Date(y, m, 20, 20, 15), end: new Date(y, m, 20, 20, 15), allDay: false, subTitle: 'Technically Philly Meetup April 2017', date: 'Saturday, April 13 at 8:00 pm - 9:30 pm', place: 'Apple Store', desc: 'This is a bi-weekly social event where you can meet others who have same passion as you!' },
    //  { id: '5', title: 'CocaHeads Meeting', start: new Date(y, m, 25, 20, 15), end: new Date(y, m, 25, 20, 15), allDay: false, subTitle: 'CocaHeads Meetup April 2017', date: 'Saturday, April 13 at 8:00 pm - 9:30 pm', place: 'Apple Store', desc: 'This is a bi-weekly social event where you can meet others who have same passion as you!' }
    //];

    

    //$scope.eventSources = [$scope.events];

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

    $('.left-menu-nav').on('click', function () {
        if ($('#leftNavBtn').is(":visible"))
        {
            $('#leftNavBtn').click();
        }
        
    });

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

alignApp.directive('eventReviewsRatings', EventReviewsRatingsDirective);

alignApp.directive('reviewsRatings', ReviewsRatingsDirective);

alignApp.directive('pastEvents', PastEventsDirective);

alignApp.directive('liveAll', LiveAllDirective);

alignApp.directive('liveAlign', LiveAlignDirective);

alignApp.filter('range', RangeFilter);


