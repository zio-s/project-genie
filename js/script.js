// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  // gsap intro //
  //GSAP ScrollTrigger 플러그인 활성화
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".container-intro", {
    scrollTrigger: {
      trigger: ".container-intro",
      start: "top top",
      end: "bottom top", // 스크롤이 끝나는 시점
      pin: true, // intro를 고정시킴
      scrub: true, // 스크롤에 맞춰 부드럽게 애니메이션
      markers: false, // 디버깅 마커 비활성화
    },
  });
  // 스크롤에 따라 .big-logo가 회전하고 스케일이 줄어드는 애니메이션
  gsap.to(".big-logo", {
    scale: 1, // 최종 스케일
    rotation: 360, // 총 1440도 회전 (4바퀴)
    ease: "power1.out", // 애니메이션의 속도 곡선
    scrollTrigger: {
      trigger: ".intro", // 애니메이션이 적용될 섹션
      start: "top top", // 스크롤 시작 지점
      end: "bottom top", // 스크롤 끝 지점
      scrub: 1, // 스크롤에 맞춰 애니메이션이 진행되도록 설정
      markers: false, // 스크롤 포인트를 나타내는 마커 (디버깅용)
    },
  });
  // 스크롤에 따라 .big-logo가 회전하고 스케일이 줄어드는 애니메이션
  gsap.to(".small-logo", {
    scale: 1, // 최종 스케일
    // rotation: 460, // 총 1440도 회전 (4바퀴)
    ease: "power2.out", // 애니메이션의 속도 곡선
    scrollTrigger: {
      trigger: ".intro", // 애니메이션이 적용될 섹션
      start: "top top", // 스크롤 시작 지점
      end: "+=100%", // 애니메이션이 끝나는 시점 (스크롤 길이)
      scrub: 1, // 스크롤에 맞춰 애니메이션이 진행되도록 설정
      markers: false, // 스크롤 포인트를 나타내는 마커 (디버깅용)
    },
  });
  // gsap intro 끝 //
});



////////////////////////////////////////////////////////////////////// test





// document.addEventListener("DOMContentLoaded", (event) => {
//   // GSAP ScrollTrigger 플러그인 활성화
//   gsap.registerPlugin(ScrollTrigger);

//  // .intro가 끝나면 .section2가 위로 올라옴
// ScrollTrigger.create({
//   trigger: ".container-intro",
//   start: "bottom top", // intro가 끝나는 지점
//   onEnter: () => {
//     document.querySelector(".section2").style.transform = "translateY(0)"; // 위로 이동해 덮음
//   },
// });

// // .container-intro를 스크롤에 고정
// gsap.to(".container-intro", {
//   scrollTrigger: {
//     trigger: ".container-intro",
//     start: "top top",
//     end: "bottom top", // 스크롤 끝나는 시점
//     pin: true,
//     markers: false,
//   },
// });

//   // 스크롤에 따른 .big-logo 회전 및 스케일 조정
//   gsap.to(".big-logo", {
//     scale: 1,
//     rotation: 360,
//     ease: "power1.out",
//     scrollTrigger: {
//       trigger: ".intro",
//       start: "top top",
//       end: "bottom top",
//       scrub: 1,
//       markers: false,
//     },
//   });

//   // 스크롤에 따른 .small-logo 스케일 조정
//   gsap.to(".small-logo", {
//     scale: 1,
//     ease: "power2.out",
//     scrollTrigger: {
//       trigger: ".intro",
//       start: "top top",
//       end: "+=100%",
//       scrub: 1,
//       markers: false,
//     },
//   });
// });
