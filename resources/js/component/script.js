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
