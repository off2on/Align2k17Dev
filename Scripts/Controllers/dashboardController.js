alignApp.controller('dashboardController', function ($rootScope, $scope, $stateParams, $http, defaultErrorMessageResolver, $timeout, ngDialog, ngProgressFactory, $compile, $state, $transitions) {

    $scope.init = function () {
        $scope.editCompanyInfo = $scope.editContactPrimary = $scope.editContactSecondary = false;
        $scope.btnCompanyInfo = $scope.btnContactPrimary = $scope.btnContactSecondary = "Edit";
    }

    $scope.init();
    

    $scope.editMode = function (tile) {
        if ($scope['edit' + tile]){
            $scope['edit' + tile] = false;
            $scope['btn' + tile] = "Edit";
        }
        else {
            $scope['edit' + tile] = true;
            $scope['btn' + tile] = "Save";
        }      
        
    }
})