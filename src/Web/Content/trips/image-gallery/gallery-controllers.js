var galleryApp = angular.module('galleryApp', []);

galleryApp.controller('galleryController', ['$http', '$scope', 'rootUrl', 'indexFileUrl', function galleryController($http, $scope, rootUrl, indexFileUrl) {
    $scope.showLoading = true;
    $scope.rootUrl = rootUrl;
    
    $http.get(indexFileUrl, {
        transformResponse: function (data) {
            // convert the data to JSON and provide
            // it to the success function below
            var x2js = new X2JS();
            var json = x2js.xml_str2json(data);
            return json;
        }
    }).success(function (data) {
        if (data.ImagesDataSet.Images && data.ImagesDataSet.Images.length) {
            $scope.slides = data.ImagesDataSet.Images.sort(function(slide1, slide2) {
                return Date.parse(slide1.DateTaken) - Date.parse(slide2.DateTaken);
            });
        } else {
            $scope.slides = [data.ImagesDataSet.Images];
        }

        $scope.showLoading = false;
    });
}]);