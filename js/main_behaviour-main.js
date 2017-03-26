
//element.parentNode.removeChild(menuMobile);
//console.log("hOI!");

var menuMobile;

var menuButtonPosition;

window.onload = function () {
    menuMobile = document.getElementById("NavBar");
    
    menuMobile.style.transition = "none";
    
    menuButtonPosition = menuMobile.style.right;
    
};

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
    //randomise();
}

var slidesNames = [["GameSlide", 0],["ArtSlide",0],["AppSlide",0]];

var myIndex = 0;

carousel();


function carousel(slides) {
    var i;
    
    var slide = [];
    for(var i=0; i< slidesNames.length; i++) {
        
        var j;
        
        slide[i] = document.getElementsByClassName(slidesNames[i][0]);
        
        for (j = 0; j < slide[i].length; j++) {
            slide[i][j].style.display = "none";
            //console.log(slide[i][j]);
        }
        
        slidesNames[i][1]++;
        
        if (slidesNames[i][1] > slide[i].length) {
            slidesNames[i][1] = 1
        }
        
        slide[i][slidesNames[i][1]-1].style.display = "block"; 
    }
    
    setTimeout(carousel, 2000); // Change image every 2 seconds
}

/*
function carousel(slides) {
    var i;
    
    var slide = [];
    for(var i=0; i< slidesNames.length; i++) {
        
        var j;
        
        slide[i] = document.getElementsByClassName(slidesNames[i]);
        
        for (j = 0; j < slide[i].length; j++) {
            slide[i][j].style.display = "none";
            //console.log(slide[i][j]);
        }
        
        myIndex++;
        
        if (myIndex > slide[i].length) {
            myIndex = 1
        }
        
        slide[i][myIndex-1].style.display = "block"; 
    }
    setTimeout(carousel, 2000); // Change image every 2 seconds
}
*/

/*
function carousel(slides) {
    var i;
    var x = document.getElementsByClassName("GameSlide");
    
    var slide = [];
    for(var i=0; i< slidesNames.length; i++) {
        slide[i] = document.getElementsByClassName("GameSlide");
    }
    
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 2000); // Change image every 2 seconds
}
*/