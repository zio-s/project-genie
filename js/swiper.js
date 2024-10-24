document.addEventListener("DOMContentLoaded", () => {
    var swiper = new Swiper(".newsSwiper", {
      slidesPerView: 6,
      observer: true,
      observeParents: true,
      slidesOffsetAfter: 20,
      slidesOffsetBefore: 20,
      spaceBetween: 10,
      centeredSlidesBounds: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        "@0.00": {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        "@0.75": {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        "@1.00": {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        "@1.50": {
          slidesPerView: 6,
          spaceBetween: 70,
        },
      },
    });
})