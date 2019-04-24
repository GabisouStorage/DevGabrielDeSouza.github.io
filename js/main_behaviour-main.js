
//element.parentNode.removeChild(menuMobile);
//console.log("hOI!");

let menuMobile;

let menuButtonPosition;


let audios = [];

audios.push(new Audio('audio/spaceJunk.mp3'));
audios.push(new Audio('audio/moonTheme.mp3'));
audios.push(new Audio('audio/direDocks.mp3'));
audios.push(new Audio('audio/aquaticAmbience.mp3'));
audios.push(new Audio('audio/starLight.mp3'));


for(i in audios){
	audios[i].load();
	audios[i].loop = true;
}


let audioAmount = audios.length;

let selectAudio = Math.floor(Math.random() * audioAmount);


console.log("Selecao: " + selectAudio);

let audio = new Audio('audio/spaceJunk.mp3');


//audio.src = 'audio/direDocks.mp3';
audio.load();

playAudio();


function playAudio() {
	let playPromise = audios[selectAudio].play();

	if (playPromise !== undefined) {
		playPromise.then(_ => {
			// Automatic playback started!
			// Show playing UI.
		})
			.catch(error => {
				alert("Reprodução automática indisponível! Inicie a música no player!");
			});
	}
}


function pauseAudio() {
	let playPromise = audios[selectAudio].pause();

	if (playPromise !== undefined) {
		playPromise.then(_ => {
			// Automatic playback started!
			// Show playing UI.
		})
			.catch(error => {
				alert("Interrupção indisponível! Inicie a música no player!");
			});
	}
}

function changeAudio() {
	audios[selectAudio].pause();
	audios[selectAudio].currentTime = 0;
	let valorAleatorio = Math.floor(Math.random() * (audioAmount-1)) + 1;
	selectAudio = (selectAudio + valorAleatorio) % audioAmount;
	console.log("Valor aleatorio:" + valorAleatorio + "\nNova Seleção:" + selectAudio);
	playAudio();
}

function nextAudio() {
	pauseAudio();
	audios[selectAudio].currentTime = 0;
	selectAudio = (selectAudio+1) % audioAmount;
	console.log(selectAudio);
	playAudio();
}

window.onload = function () {
    menuMobile = document.getElementById("NavBar");
    
    menuMobile.style.transition = "none";
    
	menuButtonPosition = menuMobile.style.right;
	//audio = new Audio('audio/spaceJunk.mp3');

    
};

window.open = function () {
	console.log("done");
}; 


function playButton() {
	if (!audios[selectAudio].paused) {
		pauseAudio();

	}else{
		pauseAudio();
		playAudio();
		audios[selectAudio].loop = true;
	}
}

function MenuButtonClick(){
    menuButtonPosition = menuMobile.style.right
    
    menuMobile.style.transition = "right 1s";
    
    if(window.innerWidth < 600){
        if(menuButtonPosition == "100%"){
            menuMobile.style.right = "0%";
        }else if(menuButtonPosition == "0%"){
            menuMobile.style.right = "100%";
        }else{
            menuButtonPosition = menuMobile.style.right = "0%";
        }
    }else{
        menuButtonPosition = menuMobile.style.right = "2%";
    }
}

function resize(){
    if(window.innerWidth < 600){
        menuMobile.style.transition = "none";
        menuButtonPosition = menuMobile.style.right = "100%";
    }else{
        menuMobile.style.transition = "none";
        menuButtonPosition = menuMobile.style.right = "2%";
    }
}

let slidesNames = [["GameSlide", 0],["ArtSlide",0],["AppSlide",0]];

let myIndex = 0;

carousel();


function carousel(slides) {
    let i;
    
    let slide = [];
    for(let i=0; i< slidesNames.length; i++) {
        
        let j;
        
        slide[i] = document.getElementsByClassName(slidesNames[i][0]);
        
        for (j = 0; j < slide[i].length; j++) {
            slide[i][j].style.display = "none";
        }
        
        slidesNames[i][1]++;
        
        if (slidesNames[i][1] > slide[i].length) {
            slidesNames[i][1] = 1;
        }
        
        slide[i][slidesNames[i][1]-1].style.display = "block"; 
    }
    
    setTimeout(carousel, 2000); // Change image every 2 seconds
}