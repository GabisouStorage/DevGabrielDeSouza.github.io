
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
        menuButtonPosition = menuMobile.style.right = "0%";
    }
}

function resize(){
    if(window.innerWidth < 600){
        menuMobile.style.transition = "none";
        menuButtonPosition = menuMobile.style.right = "100%";
    }else{
        menuMobile.style.transition = "none";
        menuButtonPosition = menuMobile.style.right = "0%";
    }
    //randomise();
}