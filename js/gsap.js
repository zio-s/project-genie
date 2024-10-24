document.addEventListener("DOMContentLoaded", () => {
  
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Fullpage.js 초기화
  new fullpage("#fullpage", {
    autoScrolling: true,
    navigation: true,
    easingcss3: "cubic-bezier(0.76, 0, 0.24, 1)",
    scrollingSpeed: 1250,
    touchSensitivity: 0.01,
    // normalScrollElements: '.album-list-wrapper', // sec-album에서만 fullpage 스크롤 해제
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
    y: "65%",
    borderRadius: 35,
  });
  ScrollTrigger.create({
    trigger: sectionVideo, // 트리거할 요소
    scroller: secScroller, // 스크롤러로 사용할 요소
    start: "top 50%",
    end: "bottom bottom",
    scrub: 5,
    markers: false,
    // 애니메이션 설정
    animation: gsap.fromTo(
      video,
      {
        scale: 0.35,
        y: "65%",
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
  
// 모든 앨범 아이템 배열화
const albumItems = gsap.utils.toArray(".album-item");
const albumS = document.querySelector(".sec-album .fp-overflow");
const albumBg = document.querySelector(".album-bg");  
let previousSrc = [albumBg.style.backgroundImage];
// 각 앨범 아이템에 대해 반복문 실행
albumItems.forEach((item, index) => {
  const img = item.querySelector(".album-cover");
  const imgSrc = img.getAttribute("src");   
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: item,  // 앨범 리스트가 트리거
      scroller: albumS,
      start: "top 100%",        // 앨범 리스트가 80%에 도달할 때 시작
      end: "top 80%",       // 앨범 리스트가 20%에 도달할 때 종료
      scrub: 7, 
      onEnter: () => {
        // 새로운 배경 이미지 설정
        if (previousSrc.length === 0) {
          previousSrc.push(albumBg.style.backgroundImage); // 처음 배경 이미지 저장
          
        } else {
          previousSrc[index] = albumBg.style.backgroundImage; // 현재 배경 이미지 저장
        }
        albumBg.style.backgroundImage = `url(${imgSrc})`; 
      },
      onLeaveBack: () => {
        // 스크롤이 뒤로 돌아갈 때 이전 이미지 복원
        if (previousSrc[index]) {
          albumBg.style.backgroundImage = previousSrc[index]; // 이전 이미지로 복원
        } else {
          albumBg.style.backgroundImage = previousSrc[index]; // 이전 이미지가 없으면 none으로 설정
        }
      },
      onLeave: () => {
        // 스크롤이 아래로 갈 때 다음 이미지 복원
        if (previousSrc[index + 1]) {
          albumBg.style.backgroundImage = previousSrc[index + 1] || "none"; // 다음 이미지로 복원
        }
      },
    },
  });

  // 애니메이션 정의
  tl.fromTo(
    item,
    {  y: 50, scale:0.2,  },    // 시작 상태 (아래에서 투명하게 시작)
    {  y: 0, scale:1, duration: .5, ease: "cubic-bezier(0.45, 0, 0.55, 1)" } // 최종 상태 (보임)
  );
});


  window.addEventListener("resize", () => {
    const introSection = document.querySelector(".intro-sec");
    introSection.style.height = `${window.innerHeight}px`;
  });



});






