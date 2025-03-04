(function(wnd){
    function cal(callback) {
        var lcd = "0";
        function updateLcd(){
            callback(lcd);
        }
        updateLcd();
        function add(x,y){
            lcd = x + y;
            updateLcd();
        }
        function subtract(x,y){
            lcd = x - y;
            updateLcd();
        }
        function numberBtnPress(num){
            lcd = lcd + num ;
            if(lcd.indexOf("0") > -1 ){
                if(lcd[0] === "0"){
                    lcd = lcd.substring(1);
                }
            }
            updateLcd();
        }
        function resetLcd(){
            lcd = "0";
            updateLcd();
        }
        return {
            btnPress0 : function (){
                numberBtnPress(0);
            },
            btnPress1 : function (){
                numberBtnPress(1);
            },
            btnPress2 : function (){
                numberBtnPress(2);
            },
            btnPress3 : function (){
                numberBtnPress(3);
            },
            btnPress4 : function (){
                numberBtnPress(4);
            },
            btnPress5 : function (){
                numberBtnPress(5);
            },
            btnPress6 : function (){
                numberBtnPress(6);
            },
            btnPress7 : function (){
                numberBtnPress(7);
            },
            btnPress8 : function (){
                numberBtnPress(8);
            },
            btnPress9 : function (){
                numberBtnPress(9);
            },
            btnPressCE : function (){
                resetLcd();
            },
            btnPressBackSpace : function (){
                if(lcd.length > 1){
                    lcd = lcd.substring(0, lcd.length-1);
                    updateLcd();
                }
                else{
                    resetLcd();
                }
                
                
            },
        };
    }
    wnd.apps = {
        calculator: cal,
    };
    
})(window);

function getLcdData(data){
    console.log(data);
}

function AirPeaceBooking(customer){
    var bookingFee = 5000; //NGN
    this.customer = customer; 
    var companyDetails = {
        companyName : "AirPeace",
        refId : "0322832"
    }
    // Callback
    function processBookingPayment(resultFromPayStack){
        console.log(resultFromPayStack);
    }
    function bookFlight(){
        var paystack =  new PayStackPaymentCompany(customer, companyDetails);
        paystack.receivePayment(bookingFee, processBookingPayment);
    }
    
    this.bookFlight = bookFlight;
    
}

function Customer(name, bal){
    this.name = name;
    this.bal = bal;
}
function PayStackPaymentCompany (customer,org) {
    this.customer = customer;
    var orgDetails = org
    function receivePayment (fee, callback){
        // fake backend Processing 
        setTimeout(function (){
            callback( {
                message : customer.bal >= fee ? `Payment Received from ${customer.name} for ${fee}` :`Insufficient Balance`,
                fee : fee,
                success : customer.bal >= fee,
                transRef : "02392392439293034",
                organization : orgDetails
            });
        }, 4000);
    }
    this.receivePayment =  receivePayment;
}
var callback = function(lcdValue){ document.getElementsByTagName("h1")[0].innerText = lcdValue;
}

//var myCal = apps.calculator(callback);
