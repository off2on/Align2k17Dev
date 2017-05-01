alignApp.controller('signUpController', function ($scope,$location) {
   
    //define scope variables
    $scope.initialise = function () {
        $scope.wizStep = 1;
        $scope.contactType = 0;
        $scope.selectedState = $scope.statesUSA[0];
        $scope.$emit('adjustHeader', 0);
        var IsFormValid1 = false;
        var IsFormValid2 = false;
        var IsFormValid3 = false;
        $scope.contactFlag = 0;
    }

    $scope.statesUSA = [
{ "name": "Alabama", "alpha2": "AL" },
{ "name": "Alaska", "alpha2": "AK" },
{ "name": "Arizona", "alpha2": "AZ" },
{ "name": "Arkansas", "alpha2": "AR" },
{ "name": "California", "alpha2": "CA" },
{ "name": "Colorado", "alpha2": "CO" },
{ "name": "Connecticut", "alpha2": "CT" },
{ "name": "Delaware", "alpha2": "DE" },
{ "name": "District of Columbia", "alpha2": "DC" },
{ "name": "Florida", "alpha2": "FL" },
{ "name": "Georgia", "alpha2": "GA" },
{ "name": "Hawaii", "alpha2": "HI" },
{ "name": "Idaho", "alpha2": "ID" },
{ "name": "Illinois", "alpha2": "IL" },
{ "name": "Indiana", "alpha2": "IN" },
{ "name": "Iowa", "alpha2": "IA" },
{ "name": "Kansa", "alpha2": "KS" },
{ "name": "Kentucky", "alpha2": "KY" },
{ "name": "Lousiana", "alpha2": "LA" },
{ "name": "Maine", "alpha2": "ME" },
{ "name": "Maryland", "alpha2": "MD" },
{ "name": "Massachusetts", "alpha2": "MA" },
{ "name": "Michigan", "alpha2": "MI" },
{ "name": "Minnesota", "alpha2": "MN" },
{ "name": "Mississippi", "alpha2": "MS" },
{ "name": "Missouri", "alpha2": "MO" },
{ "name": "Montana", "alpha2": "MT" },
{ "name": "Nebraska", "alpha2": "NE" },
{ "name": "Nevada", "alpha2": "NV" },
{ "name": "New Hampshire", "alpha2": "NH" },
{ "name": "New Jersey", "alpha2": "NJ" },
{ "name": "New Mexico", "alpha2": "NM" },
{ "name": "New York", "alpha2": "NY" },
{ "name": "North Carolina", "alpha2": "NC" },
{ "name": "North Dakota", "alpha2": "ND" },
{ "name": "Ohio", "alpha2": "OH" },
{ "name": "Oklahoma", "alpha2": "OK" },
{ "name": "Oregon", "alpha2": "OR" },
{ "name": "Pennsylvania", "alpha2": "PA" },
{ "name": "Rhode Island", "alpha2": "RI" },
{ "name": "South Carolina", "alpha2": "SC" },
{ "name": "South Dakota", "alpha2": "SD" },
{ "name": "Tennessee", "alpha2": "TN" },
{ "name": "Texas", "alpha2": "TX" },
{ "name": "Utah", "alpha2": "UT" },
{ "name": "Vermont", "alpha2": "VT" },
{ "name": "Virginia", "alpha2": "VA" },
{ "name": "Washington", "alpha2": "WA" },
{ "name": "West Virginia", "alpha2": "WV" },
{ "name": "Wisconsin", "alpha2": "WI" },
{ "name": "Wyoming", "alpha2": "WY" }
    ]

    //initialise scope variables
    $scope.initialise();

    //$scope.pageLoadCompleteSignUp = false;
    //angular.element(function () {        
    //    $scope.pageLoadCompleteSignUp = true;        
    //});   
    

    $scope.setWizStep = function(step)
    {
        switch (step) {
            case 1:
                $scope.wizStep = step;
                break;
            case 2:
                if ($scope.CompanyInfoSignUpForm.$valid)
                    $scope.wizStep = step;
                break;
            case 3:
                if ($scope.CompanyInfoSignUpForm.$valid && $scope.CompanyContactSignUpForm.$valid)
                    $scope.wizStep = step;
        }

    }

    $scope.setSelectedIndex = function(index)
    {
        $scope.selectedState = $scope.statesUSA[index];
    }

    $scope.showContactType = function (type) {
        if(type==0)
            $scope.contactType = 0;
        else
            $scope.contactType = 1;
    }

    $scope.setContactType = function (type) {
        $scope.contactType = 1;
        $scope.contactFlag = 1;
    }

    //function to be called on form submit
    $scope.submitCompanyInfoSignUpForm = function () {
        var IsFormValid1 = $scope.CompanyInfoSignUpForm.$valid;
        if (IsFormValid1) {
            $scope.wizStep=2;
        }

    }

    $scope.submitCompanyContactSignUpForm = function () {
        var IsFormValid2 = $scope.CompanyInfoSignUpForm.$valid && $scope.CompanyContactSignUpForm.$valid;
        if (IsFormValid2) {
            $scope.wizStep = 3;
        }

    }

    $scope.submitCompanyAccountSignUpForm = function () {
        var IsFormValid3 = $scope.CompanyInfoSignUpForm.$valid && $scope.CompanyContactSignUpForm.$valid && $scope.CompanyAccountSignUpForm.$valid;
        if (IsFormValid3) {
            $location.url('/');
        }

    }

    $scope.startProgress = function () {
        //$event.preventDefault();

        $scope.progressbar.start();
    }

    $scope.startProgress();

    angular.element(function () {
        
        $scope.progressbar.complete();

    });


});