let bankAccountBal = 20000;
let transferAmt = "";
let startOver = false;
let invalidCount = 0;
//startHere:
// ask for transfer amount
//while(startOver ) {
/*
transferAmt = prompt("How much do you want to Transfer ?");

// check if the amount entered is a valid number: Note value entered in a prompt are strings (text value)

transferAmt = parseFloat(transferAmt);
// NaN
if (isNaN(transferAmt) === false) {
    // we have a value numeric value
    if (bankAccountBal >= transferAmt) {
        bankAccountBal = bankAccountBal - transferAmt;
        alert("Transfer Successful: You have successfully transfer. NGN" + transferAmt.toFixed(2));
        if (confirm("Do you wish perform another transfer transaction ?")) {
            startOver = true;
        } else {
            startOver = false;
        }
    } else {
        alert("Insufficient Balance to perform the requested Transfer.");
    }

} else {
    ++invalidCount;
    transferAmt = prompt("Please enter a valid amount to continue");

}
*/

//}


function loginUser(userId, password) {

    // 1) Check if the user id and password are valid
    if (userId !== null && userId !== undefined) {
        if (password !== undefined && password !== null) {

            //2) check if user is Authorized on the server
            apiServerAuthentication(userId, password)
                .then(
                    response => {
                        if(response.ok){
                            // Allow user to Proceed
                        }
                        else{
                            alert("Invalid User ID or Password combination");
                        }
                    },
                    getErrorResponse
                );
            // 
            // 3 get the return value from server
        }
    }
}

apiServerAuthentication = (user, pwd) => {
    let serverUrl = "http://localhost:6000/";
    const payload = {user, pwd};
    return fetch(serverUrl, {method: 'POST', body: JSON.stringify(payload)});
}

function getResponse(response) {
    console.log(response.json())
}

function getErrorResponse(error) {
    console.log(error)
}

function takeLabTest(testType, nameOfPatient, callback) {
   // logic goes here
    const labResult = {  
        name : nameOfPatient,
        result : { 
            type : testType,
            date : Date.now()
        }
    }
    window.setTimeout(() => {
        callback(labResult);
    }, 10000);
  
}

function notifyMeByCallingMyPhoneNigeria(response){ 
    console.log(response); 
    console.log("Calling : " , response.name)};


const productDetail  =  {
    
};


function printMe(){
    // code logic
}

function isOdd(x) {
    return (x % 2) > 0;
}

function isEven(x){
    return !isOdd(x);
}

function findOddValues( arrayOfValues)
{
    const result = [];
    for (let i= 0; i < arrayOfValues.length; i++){
        if(isOdd(arrayOfValues[i])){
            result.push(arrayOfValues[i]);
        }
    }
    
    return result;
}
/*
*  array  = [2,4,3,6,7] 
* // array.length  = 5;
* */
let oddsArray = findOddValues( [2,4,3,6,7,9,1,4,16,21,34,53,12,3,5,75,43] );
console.log(oddsArray)
printMe();
function factorial(n){
    let mulpl = 1;
    for (let i = 1; i <= n; i++) {
        mulpl =  mulpl * i;
    } 
    return mulpl;
}

/* Factorial with recursion function*/
const factorial2 =  (n) => n < 2 ? 1 : n * factorial2(n-1);
     

function permutation(n, r)
{
    return factorial(n) / factorial(n-r);
}
function combination(n, r)
{
    return permutation(n,r) / factorial(r);
}

const fact  = factorial(6);
console.log(fact);


function CounterApp(startNumber, increment, callback){
    this.startNumber = startNumber;
    this.value = 0;
    this.callback = callback;
    increment = increment <=1 ? 1 : increment;
    this.increment = increment;
     this.add = function(){
        this.value += this.increment;
        callback(this.value);
    }
    this.remove = function(){
        this.value -= this.increment;
        callback(this.value);
    }
    this.reset =function (){
        this.value = this.startNumber;
        callback(this.value);
    }
}

const counterApp = new CounterApp(1,1, (value)=> console.log(value));

counterApp.add();
counterApp.add();
counterApp.add();
counterApp.add();
counterApp.add();
counterApp.remove();
