document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Fullpage.js 초기화
  new fullpage("#fullpage", {
    autoScrolling: true,
    navigation: false,
    scrollOverflow: true, // 스크롤 가능한 컨텐츠 허용
    fitToSection: false,
    anchors: ["s-intro", "s-info", "s-best", "s-news", "s-app"],
    easingcss3: "cubic-bezier(0.76, 0, 0.24, 1)",
    scrollingSpeed: 1250,
    touchSensitivity: 0.01,
    onLeave: function (origin, destination, direction) {
      const header = document.querySelector("#header");
      if (destination.item.classList.contains("sec-album")) {
        startWaveAnimation();
      }
      // 첫 번째 섹션(intro)을 떠날 때 헤더를 나타냄
      if (destination.index !== 0) {
        gsap.to(header, { top: "0", duration: 0.6 });
      }
      ScrollTrigger.refresh();
    },

    afterLoad: (origin, destination, direction) => {
      const header = document.querySelector("#header");
      if (destination.index === 0) {
        gsap.to(header, { top: "-100px", duration: 0.1 });
      }
      history.replaceState(null, null, " ");
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
      animation: gsap.fromTo(
        bigLogo,
        { rotate: -400, scale: 2.5, ease: "linear" },
        { rotate: 0, scale: 1, duration: 3, ease: "linear" }
      ),
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
    scrub: 4,
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
        trigger: item, // 앨범 리스트가 트리거
        scroller: albumS,
        start: "top 90%", // 앨범 리스트가 80%에 도달할 때 시작
        end: "top 70%", // 앨범 리스트가 20%에 도달할 때 종료
        scrub: 2,
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
    // 애니메이션: 아이템이 중앙에 있을 때 멈추는 효과
    tl.fromTo(
      item,
      { y: 100, scale: 0.5 },
      {
        y: 0,
        scale: 1,
        duration: 2, // 부드러운 애니메이션 시간
        ease: "power2.out", // 천천히 멈추는 느낌
      }
    ).to(item, {
      scale: 1.1,
      duration: 1, // 잠시 커지는 느낌 주기
      ease: "linear",
      repeat: 2, // 반복해서 커졌다 줄어들게 함
      yoyo: true, // 원래 크기로 돌아가기
    });
  });

  // wave 애니메이션
  const waveItems = gsap.utils.toArray(".waves > li");

  // ScrollTrigger로 album 섹션에 진입할 때 애니메이션 작동
  ScrollTrigger.create({
    trigger: albumS, // sec-album 섹션이 트리거
    start: "top 100%", // 뷰포트의 80%에 도달할 때 시작
    end: "bottom bottom", // 섹션이 끝날 때까지 유지
    onEnter: () => startWaveAnimation(), // 진입 시 애니메이션 시작
  });

  // 웨이브 애니메이션 함수
  function startWaveAnimation() {
    waveItems.forEach((item, index) => {
      const randomScale = gsap.utils.random(1.3, 1.7, true)();
      const randomDuration = gsap.utils.random(0.3, 0.7, true)();
      const randomDelay = gsap.utils.random(0, 0.3, true)();

      // 애니메이션 적용
      gsap.to(item, {
        scaleY: randomScale,
        duration: randomDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1 + randomDelay,
      });
    });
  }

  const scrolling = document.querySelector(".app-player .fp-overflow");
  const scrollBox = document.querySelector(".scroll_box");
  const rotateBox = document.querySelector(".rotate_box");
  gsap.to(rotateBox, {
    rotation: 360, // 360도 회전
    duration: 70, // 회전 애니메이션 지속 시간
    repeat: -1, // 무한 반복
    ease: "none", // 매끄럽게 회전
  });

  const tl2 = gsap.timeline();
  tl2.addLabel("scroll");
  tl2
    .set(".t__dep1", { opacity: 1, scale: 1 })
    .fromTo(
      ".circle_box",
      { scale: 1, opacity: 1, rotation: 0 },
      { scale: 0, opacity: 0, rotation: 180, duration: 7 }, // duration 증가
      ">1"
    )
    .to(".t__dep1", { opacity: 0, scale: 0, duration: 4 }, "<") // 지속 시간 증가
    .set(".circle_small", { opacity: 0, scale: 0 }, "<")
    .to(".circle_small", { opacity: 1, scale: 1, duration: 6 }, ">1") // 딜레이 조정 및 지속 시간 증가
    .set(".t__dep2", { opacity: 0, scale: 0 }, "<")
    .to(".t__dep2", { opacity: 1, scale: 1, duration: 6 }, "<") // 지속 시간 증가
    .fromTo(".circle_small .circle img", { rotation: 340 }, { rotation: 360, duration: 4 }, ">1")
    .to(".item__img", { opacity: 1, duration: 2 }, ">1.5") // 지속 시간 증가
    .to(".item__img", { opacity: 0, duration: 7 }, ">1.5") // 지속 시간 증가
    .to(".t__dep2", { opacity: 0, scale: 0, duration: 2 }, ">2")
    .fromTo(".circle_small .circle img", { rotation: 360, scale: 1 }, { rotation: 400, scale: 0.7, duration: 7 }, ">")
    .set(".circle_large", { opacity: 0, scale: 0 }, "<")
    .to(".circle_large", { opacity: 1, scale: 1, duration: 4 }, "<")
    .set(".t__dep3", { scale: 0 }, "<")
    .to(".t__dep3", { opacity: 1, scale: 1, duration: 8 }, "<") // 지속 시간 증가
    .to(".t__dep3", { opacity: 0, scale: 0, duration: 4 }, ">3")
    .to(".circle_large", { scale: 1.5, opacity: 1, rotation: 30, duration: 10 }, ">1") // 지속 시간 증가
    .to(".circle_small", { scale: 1.27, opacity: 1, rotation: 50, duration: 10 }, "<") // 지속 시간 증가
    .to(".t__dep4", { opacity: 1, scale: 1, duration: 12 }, "<1") // 지속 시간 증가
    .fromTo(".video_item", { opacity: 0 }, { opacity: 1, duration: 5 }, ">") // 애니메이션 속도 조정
    .to(".t__dep4", { opacity: 0, scale: 0, duration: 7 }, ">3")
    .to(".circle_small", { opacity: 0, scale: 0, duration: 20 }, "<")
    .to(".circle_large", { scale: 0, opacity: 0, rotation: 0, duration: 25 }, "<") // 지속 시간 증가
    .to(".video_txt", { opacity: 1, duration: 10 }, "<")
    // .to(".bg_dim", { opacity: 0.8, scale: 8, duration: 12 }, ">1.5")
    .fromTo(".bg_dim", { opacity: 1, scale: 0, duration: 12 }, { opacity: 0.8, scale: 8, duration: 12 }, ">1.5")
    .set(".app_logo", { y: -50 }, "<")
    .set(".app_download", { y: 50 }, "<")
    .to(".app_logo", { opacity: 1, duration: 8, y: 0 }, ">")
    .to(".app_download", { opacity: 1, duration: 8, y: 0 }, "<")

    .to("#footer", { y: -200, duration: 10 });

  // .to(".t__dep1", { opacity: 1, scale: 1 });

  ScrollTrigger.create({
    animation: tl2,
    scroller: scrolling,
    trigger: scrollBox,
    start: "top top",
    end: "bottom -200%",
    scrub: 2.5,
    ease: "linear",
  });

  window.addEventListener("resize", () => {
    const introSection = document.querySelector(".intro-sec");
    introSection.style.height = `${window.innerHeight}px`;
    ScrollTrigger.refresh();
  });
});
