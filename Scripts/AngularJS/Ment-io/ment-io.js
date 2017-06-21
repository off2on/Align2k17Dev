'use strict';

angular.module('mentio-demo', ['mentio', 'ngRoute', 'ui.tinymce'])

    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'examples.html',
                tab: 'examples',
                title: 'Ment.io examples'
            })
            .when('/documentation', {
                templateUrl: 'documentation.html',
                tab: 'documentation',
                title: 'Ment.io Documentation'
            })
            .when('/examples', {
                templateUrl: 'examples.html',
                tab: 'examples',
                title: 'Ment.io examples'
            });
    })

    .run(function ($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            if (current.$$route) {
                $rootScope.title = current.$$route.title;
                $rootScope.tab = current.$$route.tab;
            }
        });
    })

    .controller('mentio-demo-ctrl', function ($scope, $rootScope, $http, $q, $sce, $timeout, mentioUtil) {

        $scope.tinyMceOptions = {
            init_instance_callback: function(editor) {
                $scope.iframeElement = editor.iframeElement;
            }
        };

        $scope.macros = {
            'brb': 'Be right back',
            'omw': 'On my way',
            '(smile)' : '<img src="http://a248.e.akamai.net/assets.github.com/images/icons/emoji/smile.png"' +
                ' height="20" width="20">'
        };

        // shows the use of dynamic values in mentio-id and mentio-for to link elements
        $scope.myIndexValue = "5";        

        $scope.searchCategories = function(term) {
          
            $scope.Categories = [
                       {
                           "name": "Meetup",
                           "imageUrl": "http://avatars0.githubusercontent.com/u/3493285?s=460.jpg"
                       },
                       {
                           "name": "Party",
                           "imageUrl": "https://avatars0.githubusercontent.com/u/207585?s=460"
                       },
                       {
                           "name": "Conference",
                           "imageUrl": "http://educationalsoftware.wikispaces.com/file/view/manga_suzie.jpg/38030142/178x177/manga_suzie.jpg"
                       },
                                ];
        };

        $scope.searchsimplecategorydata = function (term) {
            $scope.simplecategorydata = [
                    {
                        "label": "Meetup"
                    },
                    {
                        "label": "Party"
                    },
                    {
                        "label": "Conference"
                    },   
                            ]            
        };

       

        $scope.getCategoriesText = function(item) {
            // note item.label is sent when the typedText wasn't found
            return '[~<i>' + (item.name || item.label) + '</i>]';
        };

        $scope.getCategoriesTextRaw = function (item) {
            return '@' + item.name;
        };

        $scope.resetDemo = function() {
            // finally enter content that will raise a menu after everything is set up
            $timeout(function() {
                var html = "Try me @ or add a macro like brb, omw, (smile)";
                var htmlContent = document.querySelector('#htmlContent');
                if (htmlContent) {
                    var ngHtmlContent = angular.element(htmlContent);
                    ngHtmlContent.html(html);
                    ngHtmlContent.scope().htmlContent = html;
                    // select right after the @
                    mentioUtil.selectElement(null, htmlContent, [0], 8);
                    ngHtmlContent.scope().$apply();
                }
            }, 0);
        };

        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            $scope.resetDemo();
        });
 
        $scope.theTextArea = 'Type an # and some text';
        $scope.theTextArea2 = 'Type an @';
        $scope.searchsimplecategorydata('');
        $scope.resetDemo();
    })

    .directive('contenteditable', ['$sce', function($sce) {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function(scope, element, attrs, ngModel) {
                function read() {
                    var html = element.html();
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                    if (attrs.stripBr && html === '<br>') {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }

                if(!ngModel) return; // do nothing if no ng-model

                // Specify how UI should be updated
                ngModel.$render = function() {
                    if (ngModel.$viewValue !== element.html()) {
                        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
                    }
                };

                // Listen for change events to enable binding
                element.on('blur keyup change', function() {
                    scope.$apply(read);
                });
                read(); // initialize
            }
        };
    }])
    .filter('words', function () {
        return function (input, words) {
            if (isNaN(words)) {
                return input;
            }
            if (words <= 0) {
                return '';
            }
            if (input) {
                var inputWords = input.split(/\s+/);
                if (inputWords.length > words) {
                    input = inputWords.slice(0, words).join(' ') + '\u2026';
                }
            }
            return input;
        };
    });
