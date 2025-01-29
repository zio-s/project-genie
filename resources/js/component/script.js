window.onload = function () {
  setTimeout(() => {
    const loadingSpinner = document.querySelector('.loading');
    // const content = document.getElementById("content");

    loadingSpinner.classList.add('hidden');
    loadingSpinner.style.display = 'none';
    // content.style.display = "block"; // 콘텐츠 표시
  }, 1000); // 1초 딜레이
};
const topTxt = document.querySelector('.top-t');
const bottomTxt = document.querySelector('.bottom-t');
const menuBtn = document.querySelector('.menu-btn');

document.querySelectorAll('#gnb .gnb__depth1 li a').forEach((anchor) => {
  anchor.addEventListener('click', function (event) {
    document.querySelectorAll('#gnb .gnb__depth1 li a').forEach((a) => a.classList.remove('active'));

    event.currentTarget.classList.add('active');
  });
});

function addActiveClass(e) {
  e.classList.add('active');
}

function removeActiveClass(e) {
  e.classList.remove('active');
}

if (topTxt) {
  topTxt.addEventListener('mouseenter', () => addActiveClass(topTxt));
  topTxt.addEventListener('mouseleave', () => removeActiveClass(topTxt));
}

if (bottomTxt) {
  bottomTxt.addEventListener('mouseenter', () => addActiveClass(bottomTxt));
  bottomTxt.addEventListener('mouseleave', () => removeActiveClass(bottomTxt));
}

const navLinks = document.querySelectorAll('#m-gnb .gnb__depth1 a');
// 메뉴 버튼이 있을 때만 이벤트 추가
if (menuBtn) {
  menuBtn.addEventListener('click', function () {
    toggleClass(menuBtn, 'active');
  });
}

// 네비게이션 링크 클릭 시 메뉴 닫기
navLinks.forEach((link) => {
  link.addEventListener('click', function () {
    menuBtn.classList.remove('active');
  });
});

function toggleClass(e, className) {
  if (e.classList.contains(className)) {
    e.classList.remove(className);
  } else {
    e.classList.add(className);
  }
}
