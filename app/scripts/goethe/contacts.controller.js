(function () {
    'use strict';

    angular.module('app.contacts')
        .controller('contacts-list', ['$scope', '$window', '$state', 'Contact', contactsList]);

    function contactsList($scope, $window, $state, Contact) {
        $scope.contacts = [];

        Contact.query(function(data) {
            $scope.contacts = data;
        });


    }


})(); 






