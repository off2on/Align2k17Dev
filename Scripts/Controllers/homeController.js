alignApp.controller('homeController', function ($scope,$http, defaultErrorMessageResolver, $timeout, ngDialog, ngProgressFactory) {

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

    $scope.getLivePeopleData = function () {
        $http.get('../StaticDataFiles/LivePeopleData.json').then(function (response) {
            $scope.people = response.data;
        })
    }

    $scope.getReviewRatingsData = function () {
        $http.get('../StaticDataFiles/ReviewRatingsData.json').then(function (response) {
            $scope.reviewRatingsData = response.data;
        })
    }

    $scope.getLivePeopleData();
    $scope.getReviewRatingsData();

    $scope.getCategoriesTextRaw = function (item) {
        //return '@' + item.name;
        console.log(item.label);
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
                console.log('.', $scope.uiConfig.calendars[calendar]);
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

    $scope.alertEventOnClick = function () {
        ngDialog.open({ template: '_PartialViews/EventInfo.html', className: 'ngdialog-theme-default' });
    }
    //-----------------------MyEvents--------------------------------------//
    $scope.uiConfig = {
        calendar: {
            height: 700,
            editable: true,
            header: {
                left: 'month basicWeek basicDay',
                center: 'title',
                right: 'today prev,next'
            },
            eventClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
        }
    };
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    /* event source that contains custom events on the scope */
    $scope.events = [
      { title: 'CocaHeads Meeting', start: new Date(y, m, 5,20,0) },
      { title: 'CocaHeads Meeting', start: new Date(y, m, 10, 20, 0) },
      { title: 'CocaHeads Meeting', start: new Date(y, m, 18, 20, 0) },
      { title: 'CocaHeads Meeting', start: new Date(y, m, 28, 20, 0) },
      { title: 'Techincally Philly Meeting', start: new Date(y, m, 13, 20, 0) },      
    ];

    $scope.eventSources = [$scope.events];

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
        link: function (scope, element, attributes) {

        }
    };
};

function PastEventsDirective() {
    return {
        restrict: 'A',
        scope: {
            eventSubTitle: '@eventSubTitle',
            eventDateTime: '@eventDateTime',
            eventPlace: '@eventPlace',
            eventPlaceAddress: '@eventPlaceAddress',
            eventImgUrl: '@eventImgUrl',
        },
        templateUrl: '_PartialViews/PastEventTemplate.html',
        link: function (scope, element, attributes) {

        }
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


