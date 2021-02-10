// JavaScript Document
let startscreen = document.querySelector(".header");
startscreen.style.display = "flex";

function start() {
	startscreen.style.display = "none";
}

let playground = document.querySelector(".playground")

let lastshot1 = 0
let lastshot2 = 0
let count1 = 0
let count2 = 0

let tank1 = document.querySelector(".tank1");
tank1.style.left = "1px";
tank1.style.top = "1px";
tank1.style.transform = "rotate(180deg)";

let tank2 = document.querySelector(".tank2");
tank2.style.left = "1711px";
tank2.style.top = "811px";
tank2.style.transform = "rotate(360deg)";

let firing = new Audio('Sounds/Shot_Sound.mp3')

function move(objekt, faktor) {
	let x = (objekt.style.transform.replace("rotate(", "").replace("deg)", ""))
	let y = (180-x)*Math.PI/180
	let dx = faktor * Math.round(Math.sin(y) * 90)
	let dy = faktor * Math.round(Math.cos(y) * 90)
	let posx = parseFloat(objekt.style.left)
	let posy = parseFloat(objekt.style.top)
	if(posx + dx >= 1 && posy + dy >= 1 && posx + dx <= 1711 && posy + dy <= 811) {
		objekt.style.left = posx + dx + "px"
		objekt.style.top = posy + dy + "px"
	}
	if(anyCollision(objekt, document.querySelectorAll(".mauer"))) {
		objekt.style.left = posx + "px"
		objekt.style.top = posy + "px"
	}
	if(anyCollision(objekt, document.querySelectorAll(".mauerbroke"))) {
		objekt.style.left = posx + "px"
		objekt.style.top = posy + "px"
	}
}

function loop() {
	count1 = count1 + 1
	count2 = count2 + 1
	
	if(keyboardOnce(65)){
		let x = (tank1.style.transform.replace("rotate(", "").replace("deg)", ""))
		tank1.style.transform = "rotate(" + (parseInt(x) - 90) + "deg)";
	}
	if(keyboardOnce(68)){
		let x = (tank1.style.transform.replace("rotate(", "").replace("deg)", ""))
		tank1.style.transform = "rotate(" + (parseInt(x) + 90) + "deg)";
	}
	if(keyboardOnce(87)) {
		move(tank1, 1)
	}
	if(keyboardOnce(83)) {
		move(tank1, -1)
	}
	if(keyboardOnce(81)){
		if(count1-lastshot1 > 120) {
			firing.play();
			
			let x = (tank1.style.transform.replace("rotate(", "").replace("deg)", ""))

			let schuss = document.createElement('div')
			schuss.classList.add('shot1')
			schuss.style.left = parseInt(tank1.style.left) + 39 + "px"
			schuss.style.top = parseInt(tank1.style.top) + 39 + "px"
			schuss.setAttribute('data-angle', (180 - x) * Math.PI / 180)
			playground.appendChild(schuss)
			lastshot1 = count1
		}
	}
	var schuesse = document.querySelectorAll('.shot1')
	for(var schuss of schuesse) {
		var xPos = parseFloat(schuss.style.left)
		var yPos = parseFloat(schuss.style.top)
		var rotation = schuss.getAttribute('data-angle')
		schuss.style.left = 20 * Math.sin(rotation) + xPos + 'px'
		schuss.style.top = 20 * Math.cos(rotation) + yPos + 'px'
		if(parseInt(schuss.style.left) < 0 || parseInt(schuss.style.left) > playground.clientWidth ||
			parseInt(schuss.style.top) < 0 || parseInt(schuss.style.top) > playground.clientHeight) {
			schuss.parentNode.removeChild(schuss)
		}
		let mauernbroke = allCollisions(schuss, document.querySelectorAll(".mauerbroke"))
		for (const mauerbroke of mauernbroke) {
			mauerbroke.parentNode.removeChild(mauerbroke)
		}
		let mauern = allCollisions(schuss, document.querySelectorAll(".mauer"));
		for(const mauer of mauern) {
			schuss.parentNode.removeChild(schuss)
			mauer.classList.remove('mauer')
			mauer.classList.add('mauerbroke')
		}
		var target2 = allCollisions(schuss, document.querySelectorAll(".tank2"))
		if(target2.length > 0) {
			target2[0].parentNode.removeChild(target2[0])
			schuss.parentNode.removeChild(schuss)
			alert("Spieler 1 hat gewonnen!!!")
			location.reload();
		}
	}

	
  
	
	
	if(keyboardOnce(37)){
		let x = (tank2.style.transform.replace("rotate(", "").replace("deg)", ""))
		tank2.style.transform = "rotate(" + (parseInt(x) - 90) + "deg)";
	}
	if(keyboardOnce(39)){
		let x = (tank2.style.transform.replace("rotate(", "").replace("deg)", ""))
		tank2.style.transform = "rotate(" + (parseInt(x) + 90) + "deg)";
	}
	if(keyboardOnce(38)) {
		move(tank2, 1)
	}
	if(keyboardOnce(40)) {
		move(tank2, -1)
	}
	if(keyboardOnce(16)){
		if(count2-lastshot2 > 120) {
			firing.play();
			
			let x = (tank2.style.transform.replace("rotate(", "").replace("deg)", ""))

			let schuss = document.createElement('div')
			schuss.classList.add('shot2')
			schuss.style.left = parseInt(tank2.style.left) + 39 + "px"
			schuss.style.top = parseInt(tank2.style.top) + 39 + "px"
			schuss.setAttribute('data-angle', (180 - x) * Math.PI / 180)
			playground.appendChild(schuss)
			lastshot2 = count2
		}
	}
	var schuesse = document.querySelectorAll('.shot2')
	for(var schuss of schuesse) {
		var xPos = parseFloat(schuss.style.left)
		var yPos = parseFloat(schuss.style.top)
		var rotation = schuss.getAttribute('data-angle')
		schuss.style.left = 20 * Math.sin(rotation) + xPos + 'px'
		schuss.style.top = 20 * Math.cos(rotation) + yPos + 'px'
		if(parseInt(schuss.style.left) < 0 || parseInt(schuss.style.left) > playground.clientWidth ||
			parseInt(schuss.style.top) < 0 || parseInt(schuss.style.top) > playground.clientHeight) {
			schuss.parentNode.removeChild(schuss)
		}
		let mauernbroke = allCollisions(schuss, document.querySelectorAll(".mauerbroke"))
		for (const mauerbroke of mauernbroke) {
			mauerbroke.parentNode.removeChild(mauerbroke)
		}
		let mauern = allCollisions(schuss, document.querySelectorAll(".mauer"));
		for(const mauer of mauern) {
			schuss.parentNode.removeChild(schuss)
			mauer.classList.remove('mauer')
			mauer.classList.add('mauerbroke')
		}
		var target1 = allCollisions(schuss, document.querySelectorAll(".tank1"))
		if(target1.length > 0) {
			target1[0].parentNode.removeChild(target1[0])
			schuss.parentNode.removeChild(schuss)
			alert("Spieler 2 hat gewonnen!!!")
			location.reload();
		}
	}
	
	window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
