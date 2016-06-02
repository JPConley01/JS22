angular.module('myApp', ['angularUtils.directives.dirPagination'])
  .controller('rankCtrl', ['$http', '$scope', '$filter', function($http, $scope, $filter) {

    console.log("This got through");


    function getData() {
        $http({
          method:"GET",
          url:"starCraftData.json"
        }).then( function(response) {
          $scope.names = response.data;
          buildStats($scope.names);
        });
    }

    getData();


    $scope.sortType     = '4'; // set the default sort type
    $scope.sortReverse  = true;  // set the default sort order
    $scope.changeSort = function(title) {
      var newSortType;
      if (title == "Username") {
        newsortType  = '0';
      } else if (title == "Fullname") {
        newsortType  = '1';
      } else if (title == "Region") {
        newsortType = '2';
      } else if (title == "Race") {
        newsortType  = '3';
      } else if (title == "Wins") {
        newsortType  = '4';
      } else if (title == "Losses") {
        newsortType  = '5';
      }
      if($scope.sortType == newsortType) {
        $scope.sortReverse = !$scope.sortReverse;
      } else {
        $scope.sortType = newsortType;
      }
    };

    function buildStats(data) {
      $scope.totalPlayers = data.data.length;
      $scope.totalGamesPlayed = 0;
      for (player of data.data) {
        console.log(player[4], player[5]);
        $scope.totalGamesPlayed = $scope.totalGamesPlayed + player[4] + player[5];
      }
      $scope.numP = 0;
      $scope.numT = 0;
      $scope.numZ = 0;
      for (player of data.data) {
        if (player[3] == "Protoss") {
          $scope.numP = $scope.numP + 1;
        } else if (player[3] == "Terran") {
          $scope.numT = $scope.numT + 1;
        } else if (player[3] == "Zerg") {
          $scope.numZ = $scope.numZ + 1;
        }
      }

      $scope.perOfProtoss = $scope.numP;
      $scope.perOfTerran = $scope.numT;
      $scope.perOfZerg = $scope.numZ;
    }


    $scope.show1 = true;
    $scope.show2 = false;
    $scope.show3 = false;
    $scope.show4 = false;
    $scope.show5 = false;
    $scope.show6 = false;

}]);
