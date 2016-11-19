var slideShowControllers = angular.module('slideShowControllers', []);

slideShowControllers.controller('loadingController', ['$http', '$location', 'slideShowIndexFileUrl', 'slideData', function slideController($http, $location, slideShowIndexFileUrl, slideData) {
    $http.get(slideShowIndexFileUrl, {
        transformResponse: function (data) {
            // convert the data to JSON and provide
            // it to the success function below
            var x2js = new X2JS();
            var json = x2js.xml_str2json(data);
            return json;
        }
    }).success(function (data) {
        if (data.ImagesDataSet.Images && data.ImagesDataSet.Images.length) {
            slideData.slides = data.ImagesDataSet.Images.sort(function(slide1, slide2) {
                return Date.parse(slide1.DateTaken) - Date.parse(slide2.DateTaken);
            });
        } else {
            slideData.slides = [data.ImagesDataSet.Images];
        }

        if (!slideData.firstSlideId) {
            $location.path('/slides/first');
        } else {
            $location.path('/slides/' + slideData.firstSlideId);
        }
    });
}]);

slideShowControllers.controller('slideController', ['$scope', '$routeParams', '$location', 'slideShowRootUrl', 'slideData', function slideController($scope, $routeParams, $location, slideShowRootUrl, slideData) {
    if (slideData.slides.length == 0) {
        slideData.firstSlideId = $routeParams.slideId;
        $location.path('/loading');
    } else {
        var currentSlideIndex = 0;

        if ($routeParams.slideId != 'first') {
            for (var i = 0; i < slideData.slides.length; i++) {
                if (slideData.slides[i].ImageId == $routeParams.slideId) {
                    currentSlideIndex = i;
                }
            }
        }

        $scope.slide = slideData.slides[currentSlideIndex];
        $scope.slide.WebSizeImageUrl = slideShowRootUrl + '/WebSize/' + $scope.slide.FileName;

        if (currentSlideIndex == 0) {
            $scope.previousSlide = null;
            $scope.previousButtonHref = null;
            $scope.previousButtonClass = 'PreviousDisabled';
        } else {
            $scope.previousSlide = slideData.slides[currentSlideIndex - 1];
            $scope.previousButtonHref = '#/slides/' + $scope.previousSlide.ImageId;
            $scope.previousButtonClass = 'Previous';
        }

        if (currentSlideIndex == slideData.slides.length - 1) {
            $scope.nextSlide = null;
            $scope.nextButtonHref = null;
            $scope.nextButtonClass = 'NextDisabled';
        } else {
            $scope.nextSlide = slideData.slides[currentSlideIndex + 1];
            $scope.nextButtonHref = '#/slides/' + $scope.nextSlide.ImageId;
            $scope.nextButtonClass = 'Next';
        }
    }
}]);
