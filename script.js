 // use a script tag or an external JS file
 document.addEventListener("DOMContentLoaded", (event) => {

    // gsap intro //
    //GSAP ScrollTrigger 플러그인 활성화
    gsap.registerPlugin(ScrollTrigger);

    // 스크롤에 따라 .big-logo가 회전하고 스케일이 줄어드는 애니메이션
    gsap.to(".big-logo", {
    scale: 1,  // 최종 스케일
    rotation: 360, // 총 1440도 회전 (4바퀴)
    ease: "power1.out", // 애니메이션의 속도 곡선
    scrollTrigger: {
    trigger: ".intro", // 애니메이션이 적용될 섹션
    start: "top top", // 스크롤 시작 지점
    end: "bottom top", // 스크롤 끝 지점
    scrub: 1, // 스크롤에 맞춰 애니메이션이 진행되도록 설정
    markers: false // 스크롤 포인트를 나타내는 마커 (디버깅용)
    }
    });

    // 스크롤에 따라 .big-logo가 회전하고 스케일이 줄어드는 애니메이션
    gsap.to(".small-logo", {
        scale: 1,  // 최종 스케일
        // rotation: 460, // 총 1440도 회전 (4바퀴)
        ease: "power2.out", // 애니메이션의 속도 곡선
        scrollTrigger: {
        trigger: ".intro", // 애니메이션이 적용될 섹션
        start: "top top", // 스크롤 시작 지점
        end: "+=100%", // 애니메이션이 끝나는 시점 (스크롤 길이)
        scrub: 1, // 스크롤에 맞춰 애니메이션이 진행되도록 설정
        markers: false // 스크롤 포인트를 나타내는 마커 (디버깅용)
        }
        });
    
        // gsap intro 끝 //





        //fullpage.js//
       
        // fullpage.js 끝 //
   });
  