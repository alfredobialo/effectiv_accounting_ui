(function(wnd){
    function cal(callback) {
        
        let lcd = {
            data : "0",
            operator: ""
        };
        let opPressed = false;
        let op1 = 0;
        let op2 = 0;
        let previousOperator ="";

        function updateLcd(){
            callback(lcd);
            console.log("Op1 :" , op1, "Op2 :" , op2);
        }
        function parseLcd(){
          return parseFloat(lcd.data);
        }
        updateLcd();
        function add(x,y){
            lcd.data = x + y;
            updateLcd();
        }
        function subtract(x,y){
            lcd.data = x - y;
            updateLcd();
        }
        function numberBtnPress(num){
            if(opPressed){
                resetLcd();
                // reset operator Press Flag so we can track next operator
                opPressed = false;
            }
            lcd.data = lcd.data + num ;
            if(lcd.data.indexOf("0") > -1 ){
                if(lcd.data[0] === "0"){
                    lcd.data = lcd.data.substring(1);
                }
            }
            updateLcd();
        }
        function resetLcd(){
            lcd.data = "0";
            updateLcd();
        }
        function resetOperator(){
            opPressed = false;
            op1 = 0;
            op2 = 0;
            lcd.operator = "";
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
                resetOperator();
                resetLcd();
            },
            btnPressBackSpace : function (){
                if(lcd.data.length > 1){
                    lcd.data = lcd.data.substring(0, lcd.data.length-1);
                    updateLcd();
                }
                else{
                    resetLcd();
                }
                
                
            },
            operatorPlusPress : function (){
                // store prevOperator 
                previousOperator = lcd.operator;
                lcd.operator = "+";
                opPressed = true;
                if(previousOperator === "+"){
                    op1 += parseLcd();
                }
                else{
                    op1 = parseLcd();
                }
                
                lcd.data= op1 +"";
                updateLcd()
            },
            operatorMinusPress : function (){
                lcd.operator = "-";
                opPressed = true;
                op1 -= parseLcd();
                lcd.data= op1 +"";
                updateLcd()
            },
            operatorDivisionPress : function (){
                lcd.operator = "/";
                opPressed = true;
                op1 /= parseLcd();
                lcd.data= op1 +"";
                updateLcd()
            },
            operatorMultiplyPress : function (){
                lcd.operator = "x";
                opPressed = true;
                op1 *= parseLcd();
                lcd.data= op1 +"";
                updateLcd()
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
var callback = function(lcdValue){ document.getElementsByTagName("h1")[0].innerText = lcdValue.data;
}

//var myCal = apps.calculator(callback);
