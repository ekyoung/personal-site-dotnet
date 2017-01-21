var slideShowApp = angular.module('slideShowApp', [
    'ngRoute',
    'slideShowControllers'
]);

slideShowApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/slides/:slideId', {
                templateUrl: '/content/trips/slide-show/slide-template.html',
                controller: 'slideController'
            }).
            otherwise({
                templateUrl: '/content/trips/slide-show/loading-template.html',
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