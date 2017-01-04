var slideShowApp = angular.module('slideShowApp', [
    'ngRoute',
    'slideShowControllers'
]);

slideShowApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/slides/:slideId', {
                templateUrl: '/Content/SlideShow/SlideTemplate.html',
                controller: 'slideController'
            }).
            otherwise({
                templateUrl: '/Content/SlideShow/LoadingTemplate.html',
                controller: 'loadingController'
            });
    }]);

slideShowApp.service('slideData', function() {
    var slides = [];
    var firstSlideId = "";
    return {
        slides: slides,
        firstSlideId: firstSlideId
    };
});