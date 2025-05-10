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


////////
const container = document.querySelector(".right"); // Mengganti dengan .right sebagai kontainer
const track = document.getElementById("sliderTrack");
const slides = document.querySelectorAll(".slide");
let slideCount = slides.length - 2; // Menghitung jumlah slide tanpa clone
let slideWidth = container.offsetWidth; // Ukuran slide mengikuti lebar .right

let index = 1;
let isDragging = false;
let startX = 0;
let currentTranslate = -slideWidth;
let prevTranslate = -slideWidth;
let animationID;

track.style.transform = `translateX(${currentTranslate}px)`;

// Fungsi untuk memperbarui ukuran slide dan posisi slider
function updateSlideWidth() {
  slideWidth = container.offsetWidth; // Mendapatkan lebar terbaru dari .right
  track.style.transform = `translateX(${currentTranslate}px)`;

  slides.forEach(slide => {
    slide.style.flex = `0 0 ${slideWidth}px`; // Menyesuaikan lebar slide sesuai dengan lebar container
  });
}

// Memanggil updateSlideWidth saat ukuran jendela berubah
window.addEventListener("resize", updateSlideWidth);

// Mengupdate posisi slider
function setSliderPosition() {
  track.style.transform = `translateX(${currentTranslate}px)`;
}

// Fungsi animasi untuk drag
function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function startDrag(e) {
  isDragging = true;
  startX = getPositionX(e);
  container.classList.add("grabbing");
  cancelAnimationFrame(animationID);
  animationID = requestAnimationFrame(animation);
}

function drag(e) {
  if (!isDragging) return;
  const currentX = getPositionX(e);
  const diff = currentX - startX;
  currentTranslate = prevTranslate + diff;
}

function endDrag() {
  isDragging = false;
  container.classList.remove("grabbing");
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100) index++;
  else if (movedBy > 100) index--;

  moveToIndex();
}

function moveToIndex() {
  track.style.transition = "transform 0.3s ease";
  currentTranslate = -index * slideWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

function checkLoop() {
  track.style.transition = "none";
  if (index === 0) {
    index = slideCount;
    currentTranslate = -index * slideWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }
  if (index === slideCount + 1) {
    index = 1;
    currentTranslate = -index * slideWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }
}

// Auto Slide
let auto = setInterval(() => {
  index++;
  moveToIndex();
}, 5000);

function resetAuto() {
  clearInterval(auto);
  auto = setInterval(() => {
    index++;
    moveToIndex();
  }, 5000);
}

track.addEventListener("transitionend", checkLoop);

container.addEventListener("mousedown", (e) => {
  startDrag(e);
  resetAuto();
});
container.addEventListener("mousemove", drag);
container.addEventListener("mouseup", endDrag);
container.addEventListener("mouseleave", () => isDragging && endDrag());

container.addEventListener("touchstart", (e) => {
  startDrag(e);
  resetAuto();
});
container.addEventListener("touchmove", drag);
container.addEventListener("touchend", endDrag);

// Memperbarui ukuran slide saat halaman pertama kali dimuat
updateSlideWidth();
