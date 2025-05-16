

const right = document.getElementById("right");
const right2 = document.getElementById("right2");
const left = document.getElementById("left");
const left2 = document.getElementById("left2")
document.title = "Registrasi";
const mediaQuery = window.matchMedia("(max-width: 769px)");
const gass = document.getElementById("gass");

function ganti_login(){
  if (mediaQuery.matches) {
    right.style.transform = "translateY(-714px)";
    right2.style.transform = "translateY(-714px)";
    left.style.animation = "slide 1.25s ease-out forwards";
    left2.style.animation = "slide 1.25s ease-out 0.25s forwards";
    document.title = "Login";
    left.style.opacity = "0"
    left2.style.opacity = "1"
  } else {
    right.style.transform = "translateX(-714px)";
    right2.style.transform = "translateX(-714px)";
    left.style.animation = "slide 1.25s ease-out forwards";
    left2.style.animation = "slide 1.25s ease-out 0.25s forwards";
    document.title = "Login";
  }
}
function ganti_register(){
 if (mediaQuery.matches) {
    left.style.opacity = "1";
       left2.style.opacity = "0"
     right.style.transform = "translateY(0px)";
  right2.style.transform = "translateY(0px)";
   left.style.animation = "slide-back 1.25s ease-out 0.25s forwards";
  left2.style.animation = "slide-back 1.25s ease-out  forwards";
  document.title = "Registrasi";
  } else {
    right.style.transform = "translateX(0px)";
  right2.style.transform = "translateX(0px)";
   left.style.animation = "slide-back 1.25s ease-out 0.25s forwards";
  left2.style.animation = "slide-back 1.25s ease-out  forwards";
  document.title = "Registrasi";
  }
}

const req = document.getElementById("req");
const pilih = document.getElementById("pilih-garag")
function pilihdenah(){
  req.style.position = "absolute";
  req.style.transform = "translateX(-2000px)"
  pilih.style.position = "relative"
  pilih.style.transform = "translateX(0px)"
  document.title = "Pilih garasi"
  
}