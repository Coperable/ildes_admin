(function () {
    'use strict';

    angular.module('app.participants')
        .controller('participants-list', ['$scope', '$window', '$state', 'Participant', participantsList])
        .controller('participants-edit', ['$scope', '$window', '$location', '$stateParams', 'logger', 'api_host', 'Participant', participantsEdit])
        .controller('participants-view', ['$scope', '$window', 'Participant', '$location', '$state', '$stateParams', participantsView]);

    function participantsList($scope, $window, $state, Participant) {
        $scope.participants = [];

        Participant.query(function(data) {
            $scope.participants = data;
        });

        $scope.edit = function(id) {
            console.log('view '+id);
            $state.go('participant-edit', {
                participantId: id
            }); 
        };



    }

    function participantsEdit($scope, $window, $location, $stateParams, logger, api_host, Participant) {
        $scope.participant = new Participant({});

        if($stateParams.participantId) {
            Participant.get({
                id: $stateParams.participantId
            }, function(data) {
                $scope.participant = data;
            });

        } else {
            $scope.participant = new Participant({
            });
        }



        $scope.canSubmit = function() {
            return true;
        };

        $scope.revert = function() {
            $scope.participant = new Participant({});
        };

        $scope.submitForm = function() {
            if($scope.participant.id) {
                $scope.participant.$update(function() {
                    logger.logSuccess("El orador fue actualizado con éxito!"); 
                    $location.url('/goethe/participants/list');
                }).catch(function(response) {
                    logger.logError(response.message); 
                });
            } else {
                $scope.participant.$save(function() {
                    logger.logSuccess("El orador fue creado con éxito!"); 
                    $location.url('/goethe/participants/list');
                }).catch(function(response) {
                    logger.logError(response.message); 
                });
            }

        };

        $scope.upload_url = api_host+"/api/media/upload";
        $scope.uploading = false;

        $scope.onUpload = function(response) {
            $scope.uploading = true;
        };

        $scope.onError = function(response) {
            $scope.uploading = false;
            console.log('error');
        };

        $scope.onComplete = function(response) {
            $scope.uploading = false;
            $scope.participant.cover_photo = response.data.filename;
            $scope.participant.photo = response.data.filename;
        };

        $scope.remove = function() {
            if($scope.participant.id) {
                $scope.participant.$remove(function() {
                    logger.logSuccess("El orador fue eliminado!"); 
                    $location.url('/goethe/participants/list');
                }).catch(function(response) {
                    logger.logError(response.message); 
                });
            }
        };




    }

    function participantsView($scope, $window, Participant, $location, $state, $stateParams) {
        $scope.participant = {};
        $scope.competitions = [];

        console.log('Participant view id: '+$stateParams.participantId);
        Participant.get({
            id: $stateParams.participantId
        }, function(data) {
            $scope.participant = data;
            $scope.competitions = $scope.participant.competitions;
        });


        $scope.createCompetition = function() {
            console.log('create competition');
            $state.go('competition-new', {
                participantId: $scope.participant.id
            }); 
        };

    }


})(); 






