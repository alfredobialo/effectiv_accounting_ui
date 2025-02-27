(function(ng, window){
    ng.element(document).ready(function(){
        // Do some interesting thing when the DOM is ready
    });
    ng.module("effectiv_accounting_ui" , ["ui.bootstrap","ui.select"])
        .controller("uiController",["$scope",uiController]);
    
    function uiController(scope){
        scope.data = {
            title : "Pi Network",
            author: "Enewa Itodo",
            version : "crypto",
            dashboard : {
                balance : 126.00,
                miningBal : 0,
            }
        };
        function startFakeMining(durationInMillis){
            var trackTime = 0; //  when = 60,000
            window.setInterval(function(){
               trackTime += durationInMillis;
                scope.$apply(function(){
                    scope.data.dashboard.miningBal += 0.045; 
                    if(trackTime >= 60000){
                        scope.data.dashboard.balance += scope.data.dashboard.miningBal;
                        scope.data.dashboard.miningBal = 0.00;
                        trackTime = 0;
                    }
                })
                //cents
            }, durationInMillis)
        }
        startFakeMining(3000);
        
    }
})(angular, window);
