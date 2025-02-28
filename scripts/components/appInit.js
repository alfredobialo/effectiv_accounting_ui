(function(ng, window){
    ng.element(document).ready(function(){
        // Do some interesting thing when the DOM is ready
    });
    ng.module("effectiv_accounting_ui" , ["ui.bootstrap","ui.select"])
        .controller("uiController",["$scope",uiController])
        .controller("MultiPaymentController",["$scope",MultiPaymentController])
    
    ;
    
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
    
    function MultiPaymentController(scope){
        scope.data = {
          title : "Multi Payment",
          subTitle: "effectiv accounting UI"  
        };
        
        scope.paymentEntry = {
            account : {},
            amount : 0,
            method : "Cash"
        }
        scope.payments = [];  // array of paymentEntry
        scope.totalAmount = 0.00;
        
        
        // Define Payment Accounts
        scope.accounts = [
            { 
                id : "1000",
                title: "Cash"
            }, 
            { 
                id : "1001-cheque",
                title: "Bank Cheque"
            },
            { 
                id : "1001-access-bank",
                title: "Access Bank",
            },
            { 
                id : "1001-opay",
                title: "Opay Digital",
            },
            { 
                id : "1001-moniepoint",
                title: "Moniepoint Micro-finance",
            }
            
        ];
        scope.paymentMethod = ["Cash", "Bank Transfer", "Bank Deposit", "Cheque", "Credit Card"];
        scope.paymentEntry.account = scope.accounts[0];
        scope.paymentEntryLimit = 3 ;
        scope.addPayment = addPayment;

        
        /*
        *  make it possible for addPayment to occur after the Payment limit
        * is reached When: 
        * 1) the new Payment Entry already exist an we need to increment the amt
        *       so if we already have 3 entries and the next entry is not in
        *       the list, Ignore the requested entry.
        *       - but if we have a similar payment entry with the same account.id 
        *       - then allow the entry and update as usual
        * */
        
        function canAddPayment(paymentEntry) {
            // if we are still below the limit return true
            if(scope.payments.length < scope.paymentEntryLimit){
                return true;
            }
            
            // check if we have payment : Not this check occurrs if we have Exceeded the limit of scope.paymentEntryLimit 
            if (scope.payments.length > 0) {
                var result = scope.payments.find(function (x) {
                    return (x.account.id === paymentEntry.account.id);
                });

                if (result !== undefined) {
                    // entry  found, so update entry
                    return true;
                }
            }
            return false
        }
        
        function addPayment(paymentEntry, sumAll) {
            if (sumAll === undefined) {
                sumAll = true;
            }
            if (canAddPayment(paymentEntry) && paymentEntry.amount >= 0) {
                // Check if a payment with the same account id is already added
                if (scope.payments.length > 0) {
                    var result = scope.payments.find(function (x) {
                        return (x.account.id === paymentEntry.account.id);
                    });

                    if (result === undefined) {
                        // we assume is not added yet, so add it
                        scope.payments.push({...paymentEntry});
                    } else {
                        // we found an existing entry, so update
                        sumAll ? result.amount += paymentEntry.amount :
                            result.amount = paymentEntry.amount;
                        result.method = paymentEntry.method;

                    }
                } else {
                    scope.payments.push({...paymentEntry});

                }  
              
               
            }
            
            // recalculate total 
            calculateTotalCashPayment();

        }
        
        scope.removePayment = removePayment;
        function removePayment(index){
            scope.payments.splice(index, 1);
            calculateTotalCashPayment()
        }
        
        scope.addDefaultCashPayment = addDefaultCashPayment;
        function addDefaultCashPayment(cashPayment){
            var newEntry = {
                account : scope.accounts[0],
                amount : cashPayment,
                method : "Cash",
            };
            
           addPayment(newEntry,false);
        }
        function calculateTotalCashPayment(){
            var sum = 0 ;
            scope.payments.forEach(function (x){
                sum += x.amount;
            });
            scope.totalAmount = sum;
        }
    }
})(angular, window);
