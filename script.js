document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxContainer = document.getElementById("lightbox-container");

  let scale = 1;
  let isDragging = false;
  let startX = 0,
    startY = 0;
  let translateX = 0,
    translateY = 0;

  // Otwieranie Lightboxa po kliknięciu na zdjęcie
  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", function () {
      if (lightbox && lightboxImg) {
        lightbox.style.display = "flex";
        lightboxImg.src = this.src;
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
      }
    });
  });

  // Zamknięcie Lightboxa po kliknięciu poza zdjęciem
  if (lightbox && lightboxContainer) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox || event.target === lightboxContainer) {
        lightbox.style.display = "none";
      }
    });

    // Zoomowanie zdjęcia kółkiem myszy
    lightboxContainer.addEventListener("wheel", function (event) {
      event.preventDefault();
      let zoomFactor = 0.1;
      let newScale = scale + (event.deltaY < 0 ? zoomFactor : -zoomFactor);
      scale = Math.max(1, Math.min(5, newScale)); // Ograniczenie powiększenia
      updateTransform();
    });

    // Rozpoczęcie przeciągania tylko przy trzymaniu LPM
    lightboxImg.addEventListener("mousedown", function (event) {
      if (event.button === 0 && scale > 1) {
        // Sprawdzenie, czy LPM i obraz powiększony
        isDragging = true;
        startX = event.clientX - translateX;
        startY = event.clientY - translateY;
        lightboxImg.style.cursor = "grabbing";
        event.preventDefault(); // Zapobiega zaznaczaniu tekstu itp.
      }
    });

    // Przeciąganie zdjęcia
    document.addEventListener("mousemove", function (event) {
      if (isDragging) {
        translateX = event.clientX - startX;
        translateY = event.clientY - startY;
        updateTransform();
      }
    });

    // Zatrzymanie przeciągania po puszczeniu LPM
    document.addEventListener("mouseup", function (event) {
      if (event.button === 0) {
        // Sprawdzenie, czy puszczono LPM
        isDragging = false;
        lightboxImg.style.cursor = "grab";
      }
    });

    function updateTransform() {
      lightboxImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    }
  }

  // Toggle menu
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("nav ul");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("show");
    });
  }

  // Intersection Observer for animations
  const elementsToAnimate = document.querySelectorAll(
    ".text-section, .image-container2, .content-wrapper, .contact-info, .wrapper, .gallery-item, .contact"
  );

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target); // Stop observing once the animation is applied
      }
    });
  });

  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });
});
