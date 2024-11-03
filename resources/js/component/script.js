// window.addEventListener("load", function () {
//   // 로딩 스피너를 숨기고 콘텐츠를 표시
//   setTimeout(function () {
//     document.querySelector(".loading").style.display = "none";
//     // document.querySelector("content").style.display = "block";
//   }, 2000);
// });
window.onload = function () {
  setTimeout(() => {
    const loadingSpinner = document.querySelector(".loading");
    // const content = document.getElementById("content");

    loadingSpinner.classList.add("hidden"); // 스피너의 점진적 사라짐
    loadingSpinner.style.display = "none";
    // content.style.display = "block"; // 콘텐츠 표시
  }, 1000); // 1초 딜레이
};
const topTxt = document.querySelector(".top-t");
const bottomTxt = document.querySelector(".bottom-t");
const menuBtn = document.querySelector(".menu-btn");

document.querySelectorAll("#gnb .gnb__depth1 li a").forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    document.querySelectorAll("#gnb .gnb__depth1 li a").forEach((a) => a.classList.remove("active"));

    event.currentTarget.classList.add("active");
  });
});

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

// 메뉴 버튼과 네비게이션 링크들 가져오기
const navLinks = document.querySelectorAll("#m-gnb .gnb__depth1 a");
const menu = document.getElementById("m-gnb");

// 메뉴 버튼이 있을 때만 이벤트 추가
if (menuBtn) {
  menuBtn.addEventListener("click", function () {
    toggleClass(menuBtn, "active");
  });
}

// 네비게이션 링크 클릭 시 메뉴 닫기
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    menuBtn.classList.remove("active");
  });
});

// 클래스 토글 함수 정의
function toggleClass(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}
