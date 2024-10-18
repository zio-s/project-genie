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

  // document.querySelectorAll(".section").forEach((section) => {
  //   section.addEventListener("click", () => {
  //     fullpage_api.moveSectionDown();
  //   });
  // });

  window.addEventListener("resize", () => {
    const introSection = document.querySelector(".intro-sec");
    introSection.style.height = `${window.innerHeight}px`;
  });
});
