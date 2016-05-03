angular.module('MainCtrl', ['ui.bootstrap', 'countTo'])
.controller('MainController', function($scope, $location, $http, $timeout, $rootScope, $modal) {
    $scope.dateNow = new Date();

    $scope.model = {};
    $scope.isIOS = ( navigator.userAgent.match(/iPad|iPhone|iPod/g) ? true : false );

    $scope.max = 1000000;

    var amt = 500000;
  
    $scope.countTo = amt;
    $scope.countFrom = 0;
    $scope.showTaxRelief = false;
    $scope.showError = false;
    $scope.successDonation = false;

    $scope.taxReliefOptions = "noTaxRelief";
    $scope.model.idType = "1";
    $scope.model.currency = "SGD";
  
    $timeout(function(){
        $scope.dynamic = amt;
    }, 200);

    $scope.changeTaxRelief = function(value) {
         if (value == "noTaxRelief") {
            $scope.showTaxRelief = false;
        }
        else {
            $scope.showTaxRelief = true;
        }
    };

    $scope.parseIdType = function(value) {
        switch (value) {
            case "1":
                return "NRIC";
            case "2":
                return "FIN (Foreign Identification Number)";
            case "5":
                return "UEN-Business (Business Registration Number)";
            case "6":
                return "UEN-Local Company (Local company registartion Number)";
            case "8":
                return "ASGD (Tax Reference Number issued by IRAS)";
            case "10":
                return "ITR (Income Tax reference Number issued by IRAS)";
            case "35":
                return "UEN-Others (Unique Entity Number with TyyPQnnnnX format)";
            default:
                return "NRIC";
        }
    };

    $scope.submitDonate = function() {
        var postObj = {
            "IdType": parseInt($scope.model.idType),
            "IdNumber": $scope.model.idNumber,
            "FirstName": $scope.model.firstName,
            "LastName": $scope.model.lastName,
            "Email": $scope.model.email,
            "Phone": $scope.model.contactNumber,
            "AddressLine1": $scope.model.add1,
            "AddressLine2": $scope.model.add2,
            "AddressLine3": $scope.model.add3,
            "PostalCode": $scope.model.postalCode,
            "DonationAmount": $scope.model.donationAmt
        };

        /*$http.post('http://172.22.117.244/api/donation', postObj)
        .success(function(res) {
            console.log(res);
        })
        .error(function(res) {
            console.log(res);
        });*/
        /*debugger;
        $.param(postObj);*/

        $http({
            url: "http://172.22.117.244/api/donation",
            method: "POST",
            data: $.param(postObj),
            dataType: 'json',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        .success(function(res) {
            console.log(res);
            $scope.showError = false;
            $scope.successDonation = true;
            $scope.successMsg = "Thank you for your donation of ";
            $scope.successMsg += "S$" + $scope.model.donationAmt + "!";
        })
        .error(function(res) {
            console.log("error");
            console.log(res);
            $scope.showError = true;
            $scope.errorMsg = "Please fix the following errors in your input:<br /><br />";
            $scope.errorMsg += res.join("<br />");
        });
    };

    $scope.jumpTo = function(tag) {
        $location.hash(tag);
    };

});