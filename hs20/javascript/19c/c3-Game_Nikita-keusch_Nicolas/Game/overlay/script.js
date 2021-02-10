let a1 = document.getElementById("overlay");
let a2 = document.getElementById("player");
let a3 = document.getElementById("1");
let a4 = document.getElementById("2");
let a5 = document.getElementById("3");
let a6 = document.getElementById("4");

document.getElementById("5").onclick = function () {
  clickLeft1();
};
function clickLeft1() {
  a2.classList.add("player-diener");
  a3.classList.add("none");
  a4.classList.add("none");
  a5.classList.add("none");
  a6.classList.add("none");
  a1.classList.add("none");
};




let b1 = document.getElementById("overlay");
let b2 = document.getElementById("player");
let b3 = document.getElementById("1");
let b4 = document.getElementById("2");
let b5 = document.getElementById("3");
let b6 = document.getElementById("5");

document.getElementById("4").onclick = function () {
  clickLeft2();
};
function clickLeft2() {
  b2.classList.add("player-merkel");
  b3.classList.add("none");
  b4.classList.add("none");
  b5.classList.add("none");
  b6.classList.add("none");
  b1.classList.add("none");
};





let c1 = document.getElementById("overlay");
let c2 = document.getElementById("player");
let c3 = document.getElementById("1");
let c4 = document.getElementById("2");
let c5 = document.getElementById("5");
let c6 = document.getElementById("4");

document.getElementById("3").onclick = function () {
  clickLeft3();
};
function clickLeft3() {
  c2.classList.add("player-putin");
  c3.classList.add("none");
  c4.classList.add("none");
  c5.classList.add("none");
  c6.classList.add("none");
  c1.classList.add("none");
};




let d1 = document.getElementById("overlay");
let d2 = document.getElementById("player");
let d3 = document.getElementById("1");
let d4 = document.getElementById("5");
let d5 = document.getElementById("3");
let d6 = document.getElementById("4");

document.getElementById("2").onclick = function () {
  clickLeft4();
};
function clickLeft4() {
  d2.classList.add("player-trump");
  d3.classList.add("none");
  d4.classList.add("none");
  d5.classList.add("none");
  d6.classList.add("none");
  d1.classList.add("none");
};



let e1 = document.getElementById("overlay");
let e2 = document.getElementById("player");
let e3 = document.getElementById("5");
let e4 = document.getElementById("2");
let e5 = document.getElementById("3");
let e6 = document.getElementById("4");

document.getElementById("1").onclick = function () {
  clickLeft5();
};
function clickLeft5() {
  e2.classList.add("player-biden");
  e3.classList.add("none");
  e4.classList.add("none");
  e5.classList.add("none");
  e6.classList.add("none");
  e1.classList.add("none");
};