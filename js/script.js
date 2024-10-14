// use a script tag or an external JS file
// gsap intro //
//GSAP ScrollTrigger 플러그인 활성화
// gsap.registerPlugin(ScrollTrigger);

// gsap.to(".container-intro", {
//   scrollTrigger: {
//     trigger: ".container-intro",
//     start: "top top",
//     end: "bottom top", // 스크롤이 끝나는 시점
//     pin: true, // intro를 고정시킴
//     scrub: true, // 스크롤에 맞춰 부드럽게 애니메이션
//     markers: false, // 디버깅 마커 비활성화
//   },
// });
// // 스크롤에 따라 .big-logo가 회전하고 스케일이 줄어드는 애니메이션
// gsap.to(".big-logo", {
//   scale: 1, // 최종 스케일
//   rotation: 360, // 총 1440도 회전 (4바퀴)
//   ease: "power1.out", // 애니메이션의 속도 곡선
//   scrollTrigger: {
//     trigger: ".intro", // 애니메이션이 적용될 섹션
//     start: "top top", // 스크롤 시작 지점
//     end: "bottom top", // 스크롤 끝 지점
//     scrub: 1, // 스크롤에 맞춰 애니메이션이 진행되도록 설정
//     markers: false, // 스크롤 포인트를 나타내는 마커 (디버깅용)
//   },
// });
// // 스크롤에 따라 .big-logo가 회전하고 스케일이 줄어드는 애니메이션
// gsap.to(".small-logo", {
//   scale: 1, // 최종 스케일
//   // rotation: 460, // 총 1440도 회전 (4바퀴)
//   ease: "power2.out", // 애니메이션의 속도 곡선
//   scrollTrigger: {
//     trigger: ".intro", // 애니메이션이 적용될 섹션
//     start: "top top", // 스크롤 시작 지점
//     end: "+=100%", // 애니메이션이 끝나는 시점 (스크롤 길이)
//     scrub: 1, // 스크롤에 맞춰 애니메이션이 진행되도록 설정
//     markers: false, // 스크롤 포인트를 나타내는 마커 (디버깅용)
//   },
// });
// // gsap intro 끝 //











// document.addEventListener("DOMContentLoaded", () => {
//   // fullpage.js 초기화
//   new fullpage("#fullpage", {
//     autoScrolling: true,
//     navigation: true,
//     licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
//     afterLoad: (origin, destination) => {
//       // intro 섹션에 진입할 때 애니메이션 실행
//       if (destination.index === 0) {
//         introAnimation(); // intro 애니메이션 함수 호출
//       }
//     },
//   });

//   // GSAP intro 애니메이션 함수
//   function introAnimation() {
//     gsap.to(".big-logo", {
//       scale: 1,
//       rotation: 360,
//       ease: "power1.out",
//       duration: 2, // 애니메이션 시간
//     });

//     gsap.to(".small-logo", {
//       scale: 1,
//       ease: "power2.out",
//       duration: 2,
//     });
//   }
// });

////////////////////////////////////////////////////////////////////// test


document.addEventListener("DOMContentLoaded", () => {
  // Initialize GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Fullpage.js
  new fullpage('#fullpage', {
    autoScrolling: true,
    navigation: true,
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    onLeave: (origin, destination, direction) => {
      // When leaving intro, trigger Fullpage effect
      if (origin.index === 0 && direction === 'down') {
        // Optional: Call any cleanup or additional animations here if needed
      }
    },
    afterLoad: (origin, destination) => {
      // Handle animations for the intro section
      if (destination.index === 0) { // When entering intro
        // Start GSAP animations
        gsap.fromTo(".big-logo", { scale: 2.7, rotation: 0 }, { scale: 1, rotation: 360, duration: 2, ease: "power1.out" });
        gsap.fromTo(".small-logo", { scale: 2.5 }, { scale: 1, duration: 2, ease: "power2.out" });
      }
    },
  });
});