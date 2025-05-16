//Menampilkan menuu
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
document.querySelectorAll(".right").forEach((container) => {
        const track = container.querySelector(".slider-track");
        const slides = container.querySelectorAll(".slide");
        const sliderId = container.dataset.slider;

        let slideCount = slides.length - 2;
        let slideWidth = container.offsetWidth;

        let index = 1;
        let isDragging = false;
        let startX = 0;
        let currentTranslate = -slideWidth;
        let prevTranslate = -slideWidth;
        let animationID;

        function updateSlideWidth() {
          slideWidth = container.offsetWidth;
          currentTranslate = -index * slideWidth;
          prevTranslate = currentTranslate;
          setSliderPosition();

          slides.forEach((slide) => {
            slide.style.flex = `0 0 ${slideWidth}px`;
          });
        }

        function setSliderPosition() {
          track.style.transform = `translateX(${currentTranslate}px)`;
        }

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

          // Tangani loop
          let activeSlideIndex = index;
          if (index === 0) {
            activeSlideIndex = slideCount;
          } else if (index === slideCount + 1) {
            activeSlideIndex = 1;
          }

          const activeSlide = slides[activeSlideIndex];
          if (activeSlide) {
            const activeId = activeSlide.id;

            for (let i = 1; i <= slideCount; i++) {
              const titik = document.getElementById(
                `slider${sliderId}-titik-${i}`
              );
              if (titik) titik.style.backgroundColor = "#ccc";
            }

            const activeTitik = document.getElementById(
              `slider${sliderId}-titik-${activeId}`
            );
            if (activeTitik)
              activeTitik.style.backgroundColor = "rgba(35,35,35,0.7)";
          }
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

        function getPositionX(e) {
          return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
        }

        function resetAuto() {
          clearInterval(auto);
          auto = setInterval(() => {
            index++;
            moveToIndex();
          }, 5000);
        }

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

        track.addEventListener("transitionend", checkLoop);

        window.addEventListener("resize", updateSlideWidth);

        updateSlideWidth();
        moveToIndex();

        let auto = setInterval(() => {
          index++;
          moveToIndex();
        }, 5000);
      });
