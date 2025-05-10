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
  menu.style.right = "-2000px";
  body.style.overflow = "scroll";
  menu_slide.style.right = "-1000px"
}

let lastScrollTop = 0;
let scrollingByFunction = false;
navbar = document.getElementById("navbar");
window.addEventListener("scroll", function(){
  if (scrollingByFunction) return;
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-95px";
    
  } else if (scrollTop < lastScrollTop) {
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
})

function scrollKeBawah(menuju) {
  scrollingByFunction = true;
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
  menutup_menu();
  setTimeout(() => {
    const target = document.getElementById(menuju);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      scrollingByFunction = false;
    }, 1000);
  }); 
}


