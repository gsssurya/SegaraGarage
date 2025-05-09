//Menampilkan menu
const menu = document.getElementById("menu");
const body = document.getElementById("halaman");
const menu_slide = document.getElementById("menu-slide")
function tampilkan_menu(){
  menu.style.right = "0px";
  body.style.overflow = "hidden";
  menu.style.opacity = "1";
  menu_slide.style.right = "0px";
}
function menutup_menu(){
  menu.style.right = "-1000px";
  body.style.overflow = "scroll";
  menu_slide.style.right = "-1000px"
}


//Agar header hilang ketika naik
var lastScrollTop = 0;
    navbar = document.getElementById("navbar");
window.addEventListener("scroll", function(){
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if(scrollTop > lastScrollTop){
    navbar.style.top = "-95px";
  } else {
    navbar.style.top = "0";
  }
  lastScrollTop = scrollTop;
})