angular.module('comment', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function ($scope, $http) {
            $scope.test = 'Hello world!';

            $scope.addComment = function () {
                if ($scope.formContent === '') { return; }
                console.log("In addComment with " + $scope.formContent);
                $scope.create({
                    title: $scope.formContent
                });
                $scope.formContent = '';
            };

            $scope.getAll = function () {
                return $http.get('/comments').success(function (data) {
                    angular.copy(data, $scope.comments);
                });
            };
            $scope.getAll();

            $scope.create = function (comment) {
                return $http.post('/pictures', comment).success(function (data) {
                    $scope.comments.push(data);
                });
            };

            $scope.delete = function (comment) {
                $http.delete('/comments/' + comment._id)
                    .success(function (data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
        }
    ]);
