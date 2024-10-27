document.addEventListener("DOMContentLoaded", () => {
  var swiper = new Swiper(".newsSwiper", {
    slidesPerView: "auto",
    observer: true,
    observeParents: true,
    // slidesOffsetAfter: 20,
    // slidesOffsetBefore: 20,
    spaceBetween: 30,
    centeredSlides: false,
    updateOnWindowResize: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      slideChange: updateOverlayVisibility, // 슬라이드 변경 시 오버레이 업데이트
    },

    breakpoints: {
      420: {
        slidesPerView: 2,
      },
      650: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
      1440: {
        slidesPerView: 5,
      },
    },
  });
  function updateOverlayVisibility() {
    const isAtStart = swiper.isBeginning; // 첫 슬라이드에 있는지 확인
    const isAtEnd = swiper.isEnd; // 마지막 슬라이드에 있는지 확인
    document.querySelector(".slide-overlay.left").style.opacity = isAtStart ? "0" : "1";
    document.querySelector(".slide-overlay.right").style.opacity = isAtEnd ? "0" : "1";
  }

  // 페이지 로드 시 초기 오버레이 상태 업데이트
  updateOverlayVisibility();
});
