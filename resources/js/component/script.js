document.addEventListener("DOMContentLoaded", () => {
  const topTxt = document.querySelector(".top-t");
  const bottomTxt = document.querySelector(".bottom-t");

  // 공통 함수: 마우스 오버 시 active 클래스 추가
  function addActiveClass(element) {
    element.classList.add("active");
  }

  // 공통 함수: 마우스가 벗어났을 때 active 클래스 제거
  function removeActiveClass(element) {
    element.classList.remove("active");
  }

  // 이벤트 리스너 추가 (topTxt)
  topTxt.addEventListener("mouseenter", () => addActiveClass(topTxt));
  topTxt.addEventListener("mouseleave", () => removeActiveClass(topTxt));

  // 이벤트 리스너 추가 (bottomTxt)
  bottomTxt.addEventListener("mouseenter", () => addActiveClass(bottomTxt));
  bottomTxt.addEventListener("mouseleave", () => removeActiveClass(bottomTxt));

  // menu btn
  const menuBtn = document.querySelector(".menu-btn");
  function toggleClass(element, className) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  }
  menuBtn.addEventListener("click", function () {
    toggleClass(menuBtn, "active");
  });
});
