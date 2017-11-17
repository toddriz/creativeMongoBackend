angular.module('picture', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function ($scope, $http) {
            $scope.test = 'Hello world!';
            $scope.pictures = [];

            $scope.addPicture = function () {
                console.log('test');
                if ($scope.formContent === '') { return; }
                console.log("In addpicture with " + $scope.formContent);
                $scope.create({
                    url: $scope.formContent
                });
                $scope.formContent = '';
            };

            $scope.getAll = function () {
                return $http.get('/pictures').success(function (data) {
                    angular.copy(data, $scope.pictures);
                });
            };
            $scope.getAll();

            $scope.create = function (picture) {
                console.log(picture);
                return $http.post('/pictures', picture).success(function (data) {
                    $scope.pictures.push(data);
                });
            };

            $scope.delete = function (picture) {
                $http.delete('/pictures/' + picture._id)
                    .success(function (data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
        }
    ]);
