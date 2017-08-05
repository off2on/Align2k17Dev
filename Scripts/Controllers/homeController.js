alignApp.controller('homeController', function ($rootScope, $scope, $stateParams, $http, defaultErrorMessageResolver, $timeout, ngDialog, ngProgressFactory, $compile, $state, uiCalendarConfig, $transitions, Upload, dataFactory, $localStorage, authFactory) {


    //---------------------------initialise scope variables------------------------------------//
    $scope.initialiseCtrl = function () {
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.start();
        $scope.form = {};
        $scope.evtForm = {};
        $scope.evtForm.evtId = 0;
        $scope.evtForm.evtImgUrl = "";
        $scope.obj = {};
        $scope.obj.time = $scope.obj.date = new Date();
        $scope.evtBtnDisabled = false;
        $scope.eventSources = [];
        $scope.events = [];
        $scope.category = {};
        $scope.invalid = false;
        $scope.createBtnText = "Create";
        $scope.selectedList = [];
        $scope.addCatgryDis = true;        
    }

    $scope.userName = $localStorage.userName;

    $scope.initialiseObjects = function () {
        $scope.navigation = {
            "home": [
            {
                "id": 1,
                "name": "Live",
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
                 "name": "Reviews/ Ratings",
                 "tile": "reviews"
             },
            {
                "id": 5,
                "name": "Past Events",
                "tile": "pastevents"
            },
            {
                "id": 6,
                "name": "Log Out",
                "tile": "logout"
            }           
            ]
        };

        $scope.categoryList = [
      { id: 1, name: "Meetup" },
      { id: 2, name: "Party" },
      { id: 3, name: "Conference" },
       { id: 4, name: "Golf Match" },
      { id: 5, name: "Lunch" },
      { id: 6, name: "Dinner" }
        ];

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
    }

    $scope.initialiseCtrl();
    $scope.initialiseObjects();   
    

    //---------------------------------validations-------------------------------------//
    $scope.$watch('evtForm.evtCategory', function (newValue, oldValue) {
        if ($scope.form.createEvtForm != undefined) {
            if ($scope.form.createEvtForm.multipleSelect.$touched) {
                validateCategory(newValue);
            }
        }  
    }, true);

    var validateCategory = function (categories) {
        if (categories.length == 0) {
            $scope.evtCategoryError = true;
            $('.ng-ms').addClass('event-has-error');
            $('.ng-ms').removeClass('event-has-success');
            return 0;
        }
        else {
            $scope.evtCategoryError = false;
            $('.ng-ms').addClass('event-has-success');
            $('.ng-ms').removeClass('event-has-error');
            return 1;
        }
    }

    $scope.datetimeChanged = function (item) {
        if ($scope.obj[item] == undefined) {
            $('#'+item).addClass('has-error');
            $('#' + item).removeClass('event-has-success');
            if ($('#' + item + ' :input').length!=0)
            $('#' + item+' :input').removeClass('event-has-success');
        }
        else {
            if ($('#' + item + ' :input').length != 0)
            $('#' + item + ' :input').addClass('event-has-success');
            $('#' + item).addClass('event-has-success');
            $('#' + item).removeClass('has-error');
        }
    }

    var disableVisualStylingTime = function () {
        $('#time :input').attr('disable-validation-message', '');
        $('#time :input').attr('disable-invalid-styling', 'true');
        $('#time :input').attr('disable-valid-styling', 'true');
        $('#date').attr('disable-validation-message', '');
    }

    var validateTime = function () {
        $scope.datetimeChanged('time');
    }

    //---------------------------Add A New Event Category Type-------------------------------//
    $scope.addCategory = function () {
        var categoryExists = false;        
        if ($scope.category.name != undefined && $scope.category.name!="")
        {
            Object.keys($scope.categoryList).forEach(function (key) {
                if ($scope.categoryList[key].name == $scope.category.name) {
                    categoryExists = true;
                }
            });
            if (!categoryExists)
            {
                $scope.category.id = $scope.categoryList.length + 1;
                $scope.categoryList.push($scope.category);
                $scope.evtForm.evtCategory.push($scope.category);
                $scope.category = {};
            }            
        }            
    }

    $scope.$watch('category.name', function (newValue, oldValue) {
        if (newValue == "" || newValue == undefined) {
            $scope.addCatgryDis = true;
            $scope.btnAddCategory = 'btn-add-category-dis';
        }
        else {
            $scope.addCatgryDis = false;
            $scope.btnAddCategory = 'btn-add-category';
        }
    })

    //-----------------------------function to upload picture to server-----------------------//
    $scope.uploadPic = function (file) {       
        $scope.progressbar.start();
        $scope.evtBtnDisabled = true;
        $scope.createBtnText = "Saving...";
        file.upload = Upload.upload({
            url: 'http://alignwebapi.apphb.com/api/upload',
            //url: 'http://localhost:44456/api/upload',
            method: 'POST',
            data: { evtData: angular.toJson($scope.evtForm),evtPicture: file },
        });

        file.upload.then(function (resp) {
            // file is uploaded successfully
            $timeout(function () {
                $scope.endProgress();
                $scope.createBtnText = "Saved Successfully...";                
            }, 1000);

            $timeout(function () {
                $state.reload();                
            }, 1500);
            
            //console.log('file ' + resp.config.data.evtPicture.name + 'is uploaded successfully. Response: ' + resp.data);
            //ngDialog.open({ template: 'Templates/EventInfo.html', className: 'ngdialog-theme-default', scope: $scope });
        }, function (resp) {
            // handle error
            
        }, function (evt) {
            // progress notify
            //console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :' + evt.config.data.file.name);
        });

        

        //file.upload = Upload.http({
        //    url: 'http://localhost:44456/api/upload',
        //    headers: {
        //        'Content-Type': file.type
        //    },
        //    method: 'POST',
        //    data: { evtData: angular.toJson($scope.evtForm), evtPicture: file },
        //});
    }

    //------------------------------function to get Json Data for Align-------------------------------------------//
    $scope.getJsonData = function () {
        dataFactory.getAlignData('StaticJsonData').then(function (response) {            
            $scope.jsonData = response.data; 
            $scope.initialiseCalender($scope.jsonData.MyEvents);
            if ($scope.leftNavId == 3) {
                $timeout(function () {
                    refreshCalendar($scope.jsonData.MyEvents);
                });
            }
        }, function (error) {            
            $scope.status = 'Unable to load Align data: ' + error.data;
        })
    }
    //----------------------------function to get Event Data as Json-----------------------------------------------//
    $scope.getEventData = function () {
        dataFactory.getAlignData('EventData').then(function (response) {        
            $scope.evtForm = response.data;
            var momentDate = moment($scope.evtForm.evtDt + ' ' + $scope.evtForm.evtTime);
            $scope.obj.date = $scope.obj.time = momentDate.toDate();

            $scope.obj.picture = $scope.evtForm.evtImgUrl;
        }, function (error) {            
            $scope.status = 'Unable to load Event data: ' + error.data;
        })
    }

    $scope.getEventData();
    $scope.getJsonData();

    //----------------------------Event Calender Initialization And Related Events and Functions-------------------------------//

    $scope.eventRender = function (event, element, view) {
        element.attr({
            'uib-tooltip': event.title,
            'tooltip-append-to-body': true
        });
        $compile(element)($scope);
    };

    $scope.alertEventOnClick = function (date) {

        $scope.selectedEvent = date;

        ngDialog.open({ template: 'Templates/EventInfo.html', className: 'ngdialog-theme-default', scope: $scope });
    }

    $scope.dt = new Date();

    $scope.popup1 = {
        opened: false
    };

    $scope.openDatePicker = function () {
        $scope.popup1.opened = true;
    };

    $scope.setCalendar = function () {
        refreshCalendar($scope.jsonData.MyEvents);
    }

    function refreshCalendar(events) {        
        uiCalendarConfig.calendars.calendar.fullCalendar('removeEvents');
        uiCalendarConfig.calendars.calendar.fullCalendar('addEventSource', events);
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
    
    //----------------------------Initialize Scope Functions-------------------------------------------------------//
    $scope.initialiseFunctions = function () {
        $scope.signUpInfo1 = true;
        $scope.menuStatus = [
            { isOpen: true },
            { isOpen: false },
        ];
        $scope.leftNavId = undefined;
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
        }
    }

    $scope.initialiseFunctions();

    //------------------------------------Function to be called when clicked on edit existing event----------------------//
    $scope.editEvent = function (id) {        
        $state.go('home.event');
        ngDialog.close();
    }

    //-----------------------------------Function to set selected id of left menu navigation-----------------------//
    $scope.setLeftNavId = function (id) {
        if ($scope.leftNavId != id)
        {
            //$scope.startProgress($event);
            $scope.leftNavId = id;
            if ($('#leftNavBtn').is(":visible")) {
                $('#leftNav').collapse('hide');
            }
        }               
    }

    //------------------------------Function to toggle accordian on contact section----------------------------------//
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

    //----------------------------Function to apply slide animation on dashboard tiles--------------------------------//
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

    //------------------function to be called on event form submit----------------------------------//
    $scope.submitEvtForm = function () {
        console.log($scope.inputValue);
        validateTime();
        var categories = $scope.evtForm.evtCategory;
        var IsFormValid = false;
        if (validateCategory(categories)) {
            IsFormValid = $scope.form.createEvtForm.$valid;
        }
        if (IsFormValid)
        {            
            $scope.evtForm.evtTime = $scope.obj.time.toLocaleTimeString();
            $scope.evtForm.evtDt = $scope.obj.date.toDateString();
            $scope.uploadPic($scope.obj.picture);
        }
    }


    //------------------------logout----------------------------------------------//
    $scope.logout = function () {
        delete $localStorage.userName;
        delete $localStorage.authenticated;
        authFactory.setAuth();
        $state.go('login');
    }

    $scope.redirectToHome = function () {
        $scope.leftNavId = 0;
        $state.go('home.dashboard');
    }

    //---------------------------------Events to run on DOM ready---------------------------------------//
    $transitions.onStart({}, function (trans) {
        $scope.progressbar.start();
    });

    $rootScope.$on('$viewContentLoaded', function () {
        var route = $state.$current.name;
        if (route == "home") {
            $state.go("home.dashboard");
        }
        else
        {
            route = route.substr(5, route.length);
            for (var i = 0; i < $scope.navigation.home.length; i++) {
                if ($scope.navigation.home[i].tile == route) {
                    $scope.leftNavId = $scope.navigation.home[i].id;
                    break;
                }                
            }
        }
     
        $timeout(function () {
            $scope.endProgress();
        }, 0);
    });

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
        templateUrl: 'Templates/Navigation.html',
        link: function (scope, elem, attr) {            
            $('.left-menu-nav').on('click', function () {
                if ($('#leftNavBtn').is(":visible")) {
                    $('#leftNavBtn').click();
                }

            });


        }
    }
}

function CompanyInfoDirective() {
    return {
        restrict: 'E',
        scope: {
            name: '@name',
            building: '@building',
            address: '@address',
            btntext: '@btntext',
            edit:'=edit',
        },
        templateUrl: 'Templates/CompanyInfoTemplate.html',
        link: function (scope, attr, elem) {
            scope.editMode = function (tile) {
                if (scope.edit) {
                    scope.edit = false;
                    scope.btntext = "Edit";
                }
                else {
                    scope.edit = true;
                    scope.btntext = "Save";
                }
            }
        }
    }
}

function CompanyContactDirective() {
    return {
        restrict: 'E',
        scope: {
            name: '@name',
            mail: '@mail',
            phone: '@phone',
            fax: '@fax',
            type:'@type',
            btntext: '@btntext',
            edit: '=edit',
        },
        templateUrl: 'Templates/CompanyContactTemplate.html',
        link: function (scope, attr, elem) {
            scope.editMode = function (tile) {
                if (scope.edit) {
                    scope.edit = false;
                    scope.btntext = "Edit";
                }
                else {
                    scope.edit = true;
                    scope.btntext = "Save";
                }

            }
            //scope.menuStatus =
            //{
            //    Primary: true,
            //    Secondary: false,
            //};

            //scope.toggleMenuStatus = function (type) {                
            //    scope.menuStatus[type] = !scope.menuStatus[type];
            //    scope.menuStatus.Primary = false;                              
            //}
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
        templateUrl: 'Templates/ReviewTemplate.html',
        
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
        templateUrl: 'Templates/PastEventTemplate.html',
        
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
        templateUrl: 'Templates/LiveAllTemplate.html',
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
        templateUrl: 'Templates/LiveAlignTemplate.html',
    }
}

function EventReviewsRatingsDirective() {
    return {
        restrict: 'E',
        scope: {
            eventName: '@eventName',
            eventDateTime: '@eventDateTime',            
        },
        templateUrl: 'Templates/EventReviewTemplate.html',
    }
}

//-------------------Filters-------------------------------------------------//
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

//--------------------Register Directives----------------------------------//

alignApp.directive('companyInfo', CompanyInfoDirective);

alignApp.directive('companyContact', CompanyContactDirective);

alignApp.directive('navigation', NavigationDirective);

alignApp.directive('eventReviewsRatings', EventReviewsRatingsDirective);

alignApp.directive('reviewsRatings', ReviewsRatingsDirective);

alignApp.directive('pastEvents', PastEventsDirective);

alignApp.directive('liveAll', LiveAllDirective);

alignApp.directive('liveAlign', LiveAlignDirective);

//----------------------Register filters-----------------------------------//

alignApp.filter('range', RangeFilter);



