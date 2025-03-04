var calculatorLcdDisplay = function(lcdValue){ document.getElementsByTagName("h1")[0].innerText = lcdValue;
}
var cal = apps.calculator(calculatorLcdDisplay);

document.getElementById("btnNum7")
    .addEventListener("click", function(){
    cal.btnPress7();
});
document.getElementById("btnNum8")
    .addEventListener("click", function(){
    cal.btnPress8();
});
document.getElementById("btnNum9")
    .addEventListener("click", function(){
    cal.btnPress9();
});
document.getElementById("btnNum4")
    .addEventListener("click", function(){
    cal.btnPress4();
});
document.getElementById("btnNum5")
    .addEventListener("click", function(){
    cal.btnPress5();
});
document.getElementById("btnNum6")
    .addEventListener("click", function(){
    cal.btnPress6();
});
document.getElementById("btnNum1")
    .addEventListener("click", function(){
    cal.btnPress1();
});
document.getElementById("btnNum2")
    .addEventListener("click", function(){
    cal.btnPress2();
});
document.getElementById("btnNum3")
    .addEventListener("click", function(){
    cal.btnPress3();
});
document.getElementById("btnNum0")
    .addEventListener("click", function(){
    cal.btnPress0();
});
document.getElementById("btnCE")
    .addEventListener("click", function(){
    cal.btnPressCE();
});
document.getElementById("btnBackSpace")
    .addEventListener("click", function(){
    cal.btnPressBackSpace();
});
document.getElementById("btnMemory")
    .addEventListener("click", function(){
    //cal.btn();
});





