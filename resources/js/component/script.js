// document.addEventListener("DOMContentLoaded", () => {
//   const topTxt = document.querySelector(".top-t");
//   const bottomTxt = document.querySelector(".bottom-t");

//   // 공통 함수: 마우스 오버 시 active 클래스 추가
//   function addActiveClass(element) {
//     element.classList.add("active");
//   }

//   // 공통 함수: 마우스가 벗어났을 때 active 클래스 제거
//   function removeActiveClass(element) {
//     element.classList.remove("active");
//   }

//   // 이벤트 리스너 추가 (topTxt)
//   topTxt.addEventListener("mouseenter", () => addActiveClass(topTxt));
//   topTxt.addEventListener("mouseleave", () => removeActiveClass(topTxt));

//   // 이벤트 리스너 추가 (bottomTxt)
//   bottomTxt.addEventListener("mouseenter", () => addActiveClass(bottomTxt));
//   bottomTxt.addEventListener("mouseleave", () => removeActiveClass(bottomTxt));

//   // menu btn
//   const menuBtn = document.querySelector(".menu-btn");
//   function toggleClass(element, className) {
//     if (element.classList.contains(className)) {
//       element.classList.remove(className);
//     } else {
//       element.classList.add(className);
//     }
//   }
//   menuBtn.addEventListener("click", function () {
//     toggleClass(menuBtn, "active");
//   });

//   //header
//   gsap.registerPlugin(ScrollTrigger);
//   const header = document.querySelector("#header");

//   // GSAP ScrollTrigger로 헤더 숨기기/보이기 구현
//   let lastDirection = "down"; // 마지막 스크롤 방향 저장

//   ScrollTrigger.create({
//     start: 0, // 페이지 상단에서부터 시작
//     end: "max", // 페이지 끝까지 감지
//     onUpdate: (self) => {
//       const currentDirection = self.direction === 1 ? "down" : "up";

//       if (currentDirection !== lastDirection) {
//         if (currentDirection === "down") {
//           gsap.to(header, { top: "-100px", duration: 0.3 });
//         } else {
//           gsap.to(header, { top: "0", duration: 0.3 });
//         }
//       }
//       lastDirection = currentDirection; // 방향 업데이트
//     },
//   });
// });

const topTxt = document.querySelector(".top-t");
const bottomTxt = document.querySelector(".bottom-t");
const menuBtn = document.querySelector(".menu-btn");

// 공통 함수: 마우스 오버 시 active 클래스 추가
function addActiveClass(element) {
  element.classList.add("active");
}

// 공통 함수: 마우스가 벗어났을 때 active 클래스 제거
function removeActiveClass(element) {
  element.classList.remove("active");
}

// topTxt가 있을 때만 이벤트 추가
if (topTxt) {
  topTxt.addEventListener("mouseenter", () => addActiveClass(topTxt));
  topTxt.addEventListener("mouseleave", () => removeActiveClass(topTxt));
}

// bottomTxt가 있을 때만 이벤트 추가
if (bottomTxt) {
  bottomTxt.addEventListener("mouseenter", () => addActiveClass(bottomTxt));
  bottomTxt.addEventListener("mouseleave", () => removeActiveClass(bottomTxt));
}

// menuBtn이 있을 때만 이벤트 추가
if (menuBtn) {
  menuBtn.addEventListener("click", function () {
    toggleClass(menuBtn, "active");
  });
}

// toggleClass 함수 정의
function toggleClass(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}

// sub page

// 필요한 라이브러리 GSAP과 ScrollTrigger를 불러온 후 사용하세요.
gsap.registerPlugin(ScrollTrigger);

const circleBox = document.querySelector(".circle_box");
const rotateBox = document.querySelector(".rotate_box");
const scrollBox = document.querySelector(".scroll_box");
const innerBox = document.querySelector(".inner_t");
const tDeps = gsap.utils.toArray(".inner_t > div");

gsap.to(rotateBox, {
  rotation: 360, // 360도 회전
  duration: 70, // 회전 애니메이션 지속 시간
  repeat: -1, // 무한 반복
  ease: "none", // 매끄럽게 회전
});

// // 1. circleBox 애니메이션 타임라인
// const circleBoxTimeline = gsap.timeline({
//   scrollTrigger: {
//     trigger: rotateBox,
//     start: "top top",
//     end: "bottom bottom",
//     scrub: true,
//     // markers: true, // 디버그용 마커
//   },
// });

// // circleBox가 축소 및 회전하도록 설정
// circleBoxTimeline.fromTo(circleBox, { scale: 1, rotation: 0 }, { scale: 0, rotation: 360, ease: "power2.out" });

// // 2. tDeps 애니메이션 타임라인
// const textTimeline = gsap.timeline({
//   scrollTrigger: {
//     trigger: scrollBox,
//     start: "top top",
//     end: "bottom bottom",
//     scrub: true,
//   },
// });

// // 첫 번째 텍스트는 처음에 보이도록 설정
// textTimeline.fromTo(
//   tDeps[0],
//   { opacity: 1, scale: 1 }, // 처음에 보임
//   { opacity: 1, scale: 0, duration: 0.8 } // 유지
// );

// // 나머지 텍스트 순차적 등장과 퇴장 설정
// tDeps.forEach((dep, index) => {
//   if (index > 0) {
//     textTimeline.fromTo(
//       dep,
//       { opacity: 0, scale: 0 },
//       { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
//       // index * 1.5 // 각 텍스트 간격 조절
//       `+=1`
//     );

//     textTimeline.to(
//       dep,
//       { opacity: 0, y: -50, duration: 0.5, ease: "power3.in" },
//       index * 1.5 + 0.8 // 다음 텍스트가 나타날 때 사라짐
//     );
//   }
// });
const tl = gsap.timeline();
tl.addLabel("scroll");
tl.set(".t__dep1", { opacity: 1, scale: 1 })
  .fromTo(".circle_box", { scale: 1, opacity: 1, rotation: 0 }, { scale: 0, opacity: 0, rotation: 180 }, ">")
  .to(".t__dep1", { opacity: 0, scale: 0, duration: 2 }, "<")
  .set(".circle_small", { opacity: 0, scale: 0 }, "<")
  .to(".circle_small", { opacity: 1, scale: 1, duration: 2 }, "<0.3")
  .to(".t__dep2", { opacity: 1, scale: 1, duration: 5 }, "<")
  .fromTo(".circle_small .circle img", { rotation: 340 }, { rotation: 360 }, ">1")
  .to(".item__img", { opacity: 1, duration: 1 }, ">1")
  .fromTo(".item__img", { scale: 0.8 }, { scale: 1 }, ">1.5")
  .to(".item__img", { opacity: 0, duration: 5 }, ">1.5")
  .to(".t__dep2", { opacity: 0, scale: 0 }, ">2.5")
  // .to(".t__dep3", { opacity: 1, scale: 1 }, ">")
  .fromTo(
    ".circle_small .circle img",
    { rotation: 360, scale: 1, duration: 5 },
    { rotation: 400, scale: 0.7, duration: 5 },
    ">"
  )
  .set(".circle_large", { opacity: 0, scale: 0 }, "<")
  .to(".circle_large", { opacity: 1, scale: 1.1, duration: 2 }, "<")
  .set(".t__dep3", { scale: 0 }, "<")
  .to(".t__dep3", { opacity: 1, scale: 1, duration: 6 }, "<")

  .to(".t__dep3", { opacity: 0, scale: 0 }, ">1")
  .to(".circle_large", { scale: 2, opacity: 1, rotation: 20, duration: 8 }, ">")
  .to(".t__dep4", { opacity: 1, scale: 1, duration: 10 }, "<")
  .fromTo(".video_item", { opacity: 0 }, { opacity: 1 }, ">")
  .to(".t__dep4", { opacity: 0, scale: 0, duration: 5 }, ">2.5")
  .to(".circle_small", { opacity: 0, scale: 0, duration: 8 }, "<")
  .to(".circle_large", { scale: 0, opacity: 0, rotation: 0, duration: 8 }, "<")
  .to(".video_txt", { opacity: 1, duration: 10 }, "<1.5")
  .to(".bg_dim", { opacity: 0.8, scale: 6, duration: 20 }, ">1")
  .set(".app_logo", { y: -50 }, "<")
  .set(".app_download", { y: 50 }, "<")
  .to(".app_logo", { opacity: 1, duration: 8, y: 0 }, ">")
  .to(".app_download", { opacity: 1, duration: 8, y: 0 }, "<")

  .to("#footer", { y: -200, duration: 10 });

// .to(".t__dep1", { opacity: 1, scale: 1 });
ScrollTrigger.create({
  animation: tl,
  trigger: ".scroll_box",
  start: "top top",
  end: "+=700",
  scrub: 2.5,
  onUpdate: (self) => {
    const progress = self.progress.toFixed(2);
    console.log(`스크롤 진행률: ${progress * 100}%`);
    if (progress > 1) {
      tl.pause(); // 특정 지점에서 애니메이션 일시 정지
    }
  },
});
