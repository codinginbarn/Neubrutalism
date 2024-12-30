document.addEventListener("DOMContentLoaded", function () {
 // Accordion Functionality

 const accordionHeaders = document.querySelectorAll(".nb-accordion-header");
 accordionHeaders.forEach((header) => {
  header.addEventListener("click", function () {
   const accordionItem = this.closest(".nb-accordion-item");
   const accordionContent = accordionItem.querySelector(".nb-accordion-content");

   // Toggle active class

   accordionItem.classList.toggle("active");

   // Slide toggle content

   if (accordionContent.style.display === "block") {
    accordionContent.style.display = "none";
   } else {
    accordionContent.style.display = "block";
   }

   // Close other accordion items

   const otherItems = document.querySelectorAll(".nb-accordion-item:not(.active)");
   otherItems.forEach((item) => {
    const content = item.querySelector(".nb-accordion-content");
    item.classList.remove("active");
    content.style.display = "none";
   });
  });
 });

 // Mobile menu toggle
 const mobileMenuButton = document.querySelector(".mobile-menu-button");
 const navbarMenu = document.querySelector(".navbar-menu");
 mobileMenuButton.addEventListener("click", function () {
  navbarMenu.classList.toggle("active");
 });

 // Close mobile menu when clicking outside
 document.addEventListener("click", function (event) {
  const isClickInsideMenu = navbarMenu.contains(event.target);
  const isClickOnMenuButton = mobileMenuButton.contains(event.target);
  if (!isClickInsideMenu && !isClickOnMenuButton && navbarMenu.classList.contains("active")) {
   navbarMenu.classList.remove("active");
  }
 });

 // Toast Functionality

 function createToast(message, type = "default", duration = 5000) {
  const toast = document.createElement("div");
  toast.classList.add("nb-toast", `nb-toast-${type}`);
  const toastContent = document.createElement("div");
  toastContent.classList.add("nb-toast-content");
  toastContent.textContent = message;
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("nb-toast-close");
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => {
   toast.classList.add("nb-toast-hide");

   setTimeout(() => {
    toast.remove();
   }, 300);
  });

  toast.appendChild(toastContent);
  toast.appendChild(closeBtn);
  document.body.appendChild(toast);

  // Auto-remove toast

  const autoRemoveTimer = setTimeout(() => {
   toast.classList.add("nb-toast-hide");
   setTimeout(() => {
    toast.remove();
   }, 300);
  }, duration);

  // Expose method to clear auto-remove timer

  toast.clearAutoRemove = () => clearTimeout(autoRemoveTimer);
  return toast;
 }

 // Carousel Functionality

 class NeuCarousel {
  constructor(carouselElement) {
   this.carousel = carouselElement;
   this.inner = this.carousel.querySelector(".nb-carousel-inner");
   this.items = this.inner.querySelectorAll(".nb-carousel-item");
   this.currentIndex = 0;
   this.init();
  }

  init() {
   // Create navigation buttons

   this.prevBtn = document.createElement("button");
   this.prevBtn.classList.add("nb-carousel-btn", "nb-carousel-prev");
   this.prevBtn.textContent = "←";
   this.prevBtn.addEventListener("click", () => this.prev());
   this.nextBtn = document.createElement("button");
   this.nextBtn.classList.add("nb-carousel-btn", "nb-carousel-next");
   this.nextBtn.textContent = "→";
   this.nextBtn.addEventListener("click", () => this.next());
   this.carousel.appendChild(this.prevBtn);
   this.carousel.appendChild(this.nextBtn);
  }

  next() {
   this.currentIndex++;

   if (this.currentIndex >= this.items.length) {
    this.currentIndex = 0;
   }

   this.updateCarousel();
  }

  prev() {
   this.currentIndex--;

   if (this.currentIndex < 0) {
    this.currentIndex = this.items.length - 1;
   }

   this.updateCarousel();
  }

  updateCarousel() {
   const offset = -this.currentIndex * 100;
   this.inner.style.transform = `translateX(${offset}%)`;
  }
 }

 // Initialize Carousels

 const carousels = document.querySelectorAll(".nb-carousel");
 carousels.forEach((carousel) => new NeuCarousel(carousel));

 // Expose global functions

 window.createToast = createToast;
});
