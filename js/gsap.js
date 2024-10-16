document.addEventListener("DOMContentLoaded", () => {
  
  gsap.registerPlugin(ScrollTrigger);

  // Fullpage.js 초기화
  new fullpage("#fullpage", {
    autoScrolling: true,
    navigation: true,
    // scrollingSpeed: 700,
    easingcss3: 'cubic-bezier(0.76, 0, 0.24, 1)',
    scrollingSpeed: 1250,
    touchSensitivity: .01,
    afterLoad: (origin, destination) => {
      if (destination.index === 0) {
        ScrollTrigger.refresh(); // 첫 번째 섹션 복귀 시 갱신
      }
    },
  });

  
    // gsap.registerPlugin(ScrollTrigger);
  
    const bigLogo = document.querySelector(".big-logo");
    const smallLogo = document.querySelector(".small-logo");
    const heightBox = document.querySelector(".height_box");
    const heightBoxHeight = heightBox ? heightBox.offsetHeight : 0; 
    

    // intro-sec을 스크롤 시 고정하고 이후 해제
    const introSection = document.querySelector(".intro-sec");
    ScrollTrigger.create({
      trigger: introSection,
      start: "top top",
      end: "bottom top",
      // pin: true,
      scrub: 1,
      onLeaveBack: () => ScrollTrigger.refresh(), // 뒤로 돌아올 때 갱신
      // markers: true, // 디버깅용
    });


    
    if (introSection && bigLogo && smallLogo) {
      // Big Logo 애니메이션 ScrollTrigger
      ScrollTrigger.create({
        trigger: introSection.querySelector(".fp-overflow") || introSection,
        scroller: introSection.querySelector(".fp-overflow") || introSection,
        start: "top top",
        // end: `+=${heightBoxHeight}`,
        end: "+=100%",
        scrub: 1,
        // markers: true,
        animation: gsap.fromTo(
          bigLogo,
          { rotate: -400, scale: 2.5, ease: "linear" },
          { rotate: 0, scale: 1, duration: 2, ease: "linear" }
        ),
        // onUpdate: (self) => console.log(`Big Logo Progress: ${self.progress}`),
      });
  
      // Small Logo 애니메이션 ScrollTrigger
      ScrollTrigger.create({
        trigger: introSection.querySelector(".fp-overflow") || introSection,
        scroller: introSection.querySelector(".fp-overflow") || introSection,
        start: "top top",
        // end: `+=${heightBoxHeight}`,
        end: "+=100%",
        scrub: 1,
        // markers: true,
        animation: gsap.fromTo(
          smallLogo,
          { scale: 2.5 },
          { scale: 1, duration: 1, ease: "linear" }
        ),
        // onUpdate: (self) => console.log(`Small Logo Progress: ${self.progress}`),
      });
    }
  //   // 스무스 스크롤
  //   function scrollToTarget() {
  //     const targetElement = document.querySelector(".fp-overflow");
  //     if (targetElement) {
  //         targetElement.scrollTo({
  //             left: 0,
  //             top: document.body.offsetHeight * 2 - 1,
  //             behavior: "smooth"
  //         });
  //     }
  // }
  // // 사용 예시: 버튼 클릭 시 호출
  // document.querySelector("#scrollButton").addEventListener("click", scrollToTarget);

    window.addEventListener("resize", () => {
      const introSection = document.querySelector(".intro-sec");
      introSection.style.height = `${window.innerHeight}px`; // 항상 뷰포트 높이 유지
    });
  });

