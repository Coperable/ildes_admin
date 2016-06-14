(function () {
'use strict';

angular.module('app.translations')
.controller('translation-edit', ['$scope', '$window', '$location', '$state', '$stateParams', '$timeout', 'api_host', 'logger', 'Translation', 'Language', function($scope, $window, $location, $state, $stateParams, $timeout, api_host, logger, Translation, Language) {

    $scope.languages = [];

    $scope.translation = {};

    Language.query(function(data) {
        $scope.languages = data;
    });

    $scope.languages_code = ['es_ES', 'en_EN', 'de_DE'];
    if($stateParams.translationId) {
        Translation.get({
            id: $stateParams.translationId
        }, function(data) {
            $scope.translation = data;
            _.each(data.entries, function(item) {
                $scope.translation[$scope.languages_code[item.language_id - 1]] = item.text
            });
            $scope.setup_component();
        });

    } else {
        $scope.translation = new Translation({
            type: 'WEB',
            module: 'goethe'
        });
        $timeout(function() {
            $scope.setup_component();
        }, 1000);

    }


    $scope.canSubmit = function() {
        return $scope.translation_form.$valid;
    };

    $scope.revert = function() {
        $scope.translation = new Translation({});
    };

    $scope.submitForm = function() {
        if($scope.translation.id) {
            $scope.translation.$update(function() {
                logger.logSuccess("La traducción fue actualizada con éxito!"); 
                $state.go('translation-list'); 
            }).catch(function(response) {
                logger.logError(response.message); 
            });
        } else {
            $scope.translation.$save(function() {
                logger.logSuccess("La traducción fue creada con éxito!"); 
                $state.go('translation-list'); 
            }).catch(function(response) {
                logger.logError(response.message); 
            });
        }


    };
    $scope.setup_component = function () {
    };



}])
.controller('translation-list', ['$scope', '$http', '$state', 'logger', 'api_host', 'Translation', function($scope, $http, $state, logger, api_host, Translation) {
   
    Translation.query(function(data) {
        $scope.translations = data;
    });

    $scope.view = function(id) {
        $state.go('translation-view', {
            translationId: id
        }); 
    };

    $scope.remove = function(translation_data) {
        var translation = new Translation(translation_data);
        translation.$remove(function() {
            logger.logSuccess("El translation fue eliminado con éxito!"); 
            $state.go('translation-list', {}, {reload: true}); 
        }).catch(function(response) {
            logger.logError(response.message); 
        });


    };

    $scope.edit = function(id) {
        $state.go('translation-edit', {
            translationId: id
        }); 
    };



}]);
})(); 





