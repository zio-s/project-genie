document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Fullpage.js 초기화
  new fullpage("#fullpage", {
    autoScrolling: true,
    navigation: true,
    easingcss3: "cubic-bezier(0.76, 0, 0.24, 1)",
    scrollingSpeed: 1250,
    touchSensitivity: 0.01,
    afterLoad: (origin, destination) => {
      if (destination.index === 0) {
        ScrollTrigger.refresh();
      }
    },
  });

  const bigLogo = document.querySelector(".big-logo");
  const smallLogo = document.querySelector(".small-logo");
  const heightBox = document.querySelector(".height_box");
  const heightBoxHeight = heightBox ? heightBox.offsetHeight : window.innerHeight;
  const introSection = document.querySelector(".intro-sec");

  ScrollTrigger.create({
    trigger: introSection,
    start: "top top",
    end: "bottom top",
    // pin: true,
    scrub: 1,
    onLeaveBack: () => ScrollTrigger.refresh(), //
  });

  if (introSection && bigLogo && smallLogo) {
    // Big Logo 애니메이션 ScrollTrigger
    ScrollTrigger.create({
      trigger: introSection.querySelector(".fp-overflow") || introSection,
      scroller: introSection.querySelector(".fp-overflow") || introSection,
      start: "top top",
      end: "bottom -100%",
      scrub: 1,
      animation: gsap.fromTo(bigLogo, { rotate: -400, scale: 2.5, ease: "linear" }, { rotate: 0, scale: 1, duration: 3, ease: "linear" }),
    });

    // Small Logo 애니메이션 ScrollTrigger
    ScrollTrigger.create({
      trigger: introSection.querySelector(".fp-overflow") || introSection,
      scroller: introSection.querySelector(".fp-overflow") || introSection,
      start: "top top",
      end: "bottom -100%",
      scrub: 1,
      animation: gsap.fromTo(smallLogo, { scale: 2.5 }, { scale: 1, duration: 3, ease: "linear" }),
    });
  }
  // 클릭시 스크롤 강제 이동
  let scrollCompleted = false; // 스크롤 완료 여부
  // 스크롤 완료 여부를 체크
  const isAtBottom = () => {
    const targetElement = document.querySelector(".fp-overflow") || window;
    return targetElement.scrollY >= heightBoxHeight - window.innerHeight;
  };
  introSection.addEventListener("click", () => {
    if (!scrollCompleted && !isAtBottom()) {
      const targetElement = document.querySelector(".fp-overflow") || window;
      gsap.to(targetElement, {
        scrollTo: { y: heightBoxHeight, autoKill: true },
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
          scrollCompleted = true; // 스크롤 완료 상태로 변경
        },
      });
    } else if (scrollCompleted) {
      // 스크롤이 완료된 상태에서만 다음 섹션으로 이동
      fullpage_api.moveSectionDown();
      scrollCompleted = false;
    }
  });
  // video scroll event
  const video = document.querySelector(".video-scale");
  const secScroller = document.querySelector(".sec-01 .fp-overflow");
  const sectionVideo = document.querySelector(".movie-item");

  // 비디오 초기 상태 설정
  gsap.set(video, {
    scale: 0.35,
    y: "25%",
    borderRadius: 35,
  });
  ScrollTrigger.create({
    trigger: sectionVideo, // 트리거할 요소
    scroller: secScroller, // 스크롤러로 사용할 요소
    start: "top 50%",
    end: "bottom bottom",
    scrub: 4,
    markers: false,
    // 애니메이션 설정
    animation: gsap.fromTo(
      video,
      {
        scale: 0.35,
        y: "25%",
        borderRadius: 35,
      },
      {
        y: 0,
        scale: 1,
        borderRadius: 0,
        ease: "cubic-bezier(0.45, 0, 0.55, 1)", // 커스텀 이징
        duration: 1.5,
      }
    ),
  });
  ScrollTrigger.refresh();

  // 앨범 스크롤 이벤트
  // const albumList = document.querySelector(".album-list"); // 앨범 리스트
  // const wrapper = document.querySelector(".album-container"); // 래퍼

  // ScrollTrigger.create({
  //   trigger: albumList, // 스크롤 트리거를 앨범 리스트에 걸기
  //   scroller: wrapper,  // 앨범 리스트를 스크롤 할 요소
  //   start: "top top",   // 시작 지점
  //   end: () => `${albumList.scrollHeight - wrapper.clientHeight}px`, // 스크롤 종료 지점
  //   scrub: 4,        // 스크롤에 따라 부드럽게 애니메이션
  //   pin: false,         // 고정된 타이틀을 위한 핀 설정 X

  // });

    window.addEventListener("resize", () => {
    const introSection = document.querySelector(".intro-sec");
    introSection.style.height = `${window.innerHeight}px`;
  });
});
