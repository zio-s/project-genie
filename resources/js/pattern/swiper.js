document.addEventListener('DOMContentLoaded', () => {
  var swiper = new Swiper('.newsSwiper', {
    slidesPerView: 1.2,
    observer: true,
    observeParents: true,
    spaceBetween: 30,
    centeredSlides: false,
    updateOnWindowResize: true,
    // 기본 드래그 기능 복원
    allowTouchMove: true,
    touchReleaseOnEdges: true,
    resistance: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    on: {
      slideChange: updateOverlayVisibility,
    },

    breakpoints: {
      420: {
        slidesPerView: 2.2,
      },
      650: {
        slidesPerView: 3.2,
      },
      1024: {
        slidesPerView: 4.2,
      },
      1440: {
        slidesPerView: 5.2,
      },
    },
  });

  function updateOverlayVisibility() {
    const isAtStart = swiper.isBeginning;
    const isAtEnd = swiper.isEnd;
    document.querySelector('.slide-overlay.left').style.opacity = isAtStart ? '0' : '1';
    document.querySelector('.slide-overlay.right').style.opacity = isAtEnd ? '0' : '1';
  }

  // 페이지 로드 시 초기 오버레이 상태 업데이트
  updateOverlayVisibility();

  // 모바일 기기 감지
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // 모바일에서만 적용되는 터치 이벤트 핸들러
    let touchStartY = 0;
    let touchStartX = 0;

    swiper.on('touchStart', (e) => {
      touchStartY = e.touches.currentY;
      touchStartX = e.touches.currentX;
      // 터치 시작할 때는 일단 스크롤 잠금
      if (typeof fullpage_api !== 'undefined') {
        fullpage_api.setAllowScrolling(false);
      }
    });

    swiper.on('touchMove', (e) => {
      const currentY = e.touches.currentY;
      const currentX = e.touches.currentX;
      const deltaY = Math.abs(currentY - touchStartY);
      const deltaX = Math.abs(currentX - touchStartX);

      // 수직 스크롤이 수평보다 10px 이상 크면
      if (deltaY > deltaX && deltaY > 10) {
        // 수직 스크롤 허용
        if (typeof fullpage_api !== 'undefined') {
          fullpage_api.setAllowScrolling(true);
        }
      }
    });

    swiper.on('touchEnd', () => {
      // 터치 종료 시 항상 스크롤 재활성화
      if (typeof fullpage_api !== 'undefined') {
        fullpage_api.setAllowScrolling(true);
      }
    });
  } else {
    // PC에서는 기존 동작 유지
    if (typeof fullpage_api !== 'undefined') {
      // 스와이퍼 영역에 마우스 진입 시
      document.querySelector('.newsSwiper').addEventListener('mouseenter', () => {
        fullpage_api.setAllowScrolling(false);
      });

      // 스와이퍼 영역에서 마우스 나갈 시
      document.querySelector('.newsSwiper').addEventListener('mouseleave', () => {
        fullpage_api.setAllowScrolling(true);
      });
    }
  }
});
