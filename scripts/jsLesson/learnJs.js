
let count = 0;
const incrementValue = 10;
const h1Result = document.getElementById("result");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
h1Result.innerText = count;

console.log(incrementBtn, decrementBtn,h1Result);
incrementBtn.addEventListener("click", (evt) => {
  count = count + incrementValue;
  h1Result.innerText = count;
});
decrementBtn.addEventListener("click", (evt) => {
    count = count - incrementValue;
    h1Result.innerText = count;
});
