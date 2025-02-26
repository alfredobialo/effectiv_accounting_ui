(function(ng, window){
    ng.element(document).ready(function(){
        // Do some interesting thing when the DOM is ready
    });
    ng.module("effectiv_accounting_ui" , ["ui.bootstrap","ui.select"])
        .controller("uiController",["$scope",uiController]);
    
    function uiController(scope){
        scope.data = {
            title : "New UI for Effectiv Business Solution"
        };
    }
})(angular, window);
