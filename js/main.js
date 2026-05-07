// 스크롤 등장 애니메이션
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));


// 프로젝트 데이터
const projects = [
  {
    title: "캠퍼스 맵",
    desc: "카카오 지도 기반 위치 서비스"
  },
  {
    title: "안전 관리 시스템",
    desc: "센서 데이터 기반 상태 관리"
  },
  {
    title: "포트폴리오 웹",
    desc: "네온 스타일 UI 구현"
  }
];


// 프로젝트 자동 렌더링
const container = document.getElementById("project-list");

projects.forEach(p => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
  `;
  container.appendChild(div);
});