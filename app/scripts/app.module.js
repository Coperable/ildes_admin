(function () {
    'use strict';

    angular.module('app', [
        // Angular modules
         'ngAnimate'
        ,'ngAria'
        ,'ngResource'
  
        // 3rd Party Modules
        ,'ngMaterial'
        ,'ui.router'
        ,'ui.bootstrap'
        ,'ui.tree'
        ,'ngMap'
        ,'ngTagsInput'
        ,'textAngular'
        ,'angular-loading-bar'
        ,'duScroll'
        ,'satellizer'  
        ,'lr.upload'
        ,'mwl.confirm'

        // Custom module
        ,'app.nav'
        ,'app.page'
        ,'app.i18n'

        //Goethe
        ,'config'
        ,'app.services'
        ,'app.account'
        ,'app.regions'
        ,'app.users'
        ,'app.sliders'
        ,'app.participants'
        ,'app.competitions'
        ,'app.translations'
    ]);

})();
