const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const glow = $(".cursor-glow"); window.addEventListener("pointermove", e => {
  if (!glow) return;
  glow.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 350, fill: "forwards" });
});

$("#mail").addEventListener("click", async () => {
  const email = "whalswns02.dev@gmail.com";
  try {
    await navigator.clipboard.writeText(email);
    const old = $("#mail").innerHTML;
    $("#mail").innerHTML = "Copied <b>✓</b>";
    setTimeout(() => $("#mail").innerHTML = old, 1400)
  } catch {
    window.location.href = `mailto:${email}`
  }
});
const topButton = $(".totop");
addEventListener("scroll", () =>
  topButton.classList.toggle("show", scrollY > 600)
);

topButton.onclick = () =>
  scrollTo({
    top: 0,
    behavior: "smooth"
  });
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.style.opacity = 1;
    e.target.style.transform = "none";
    io.unobserve(e.target)
  }
}), {
  threshold: .08
});

$$(".section,.project,.skill-group,.resume-grid>div").forEach(e => {
  e.style.opacity = 0; e.style.transform = "translateY(22px)";
  e.style.transition = "opacity .75s ease,transform .75s cubic-bezier(.2,.7,.2,1)";
  io.observe(e)
});

/* PORTFOLIO PROJECT MODAL START */
const projectDetails = {
  campus: {
    type: "PERSONAL PROJECT",
    title: "학교 캠퍼스 맵",
    period: "2024.02 — 2024.04",
    description: "교내 편의시설과 프린터, 카페, 버스정류장 등의 위치와 정보를 한 곳에서 확인할 수 있도록 만든 캠퍼스 안내 서비스입니다.",
    stack: "Express.js · HTML5 · JavaScript · MySQL",
    role: "기획 · 개발",
    architecture: "Browser → Express.js → MySQL",
    github: "https://github.com/JoM1njun/CampusGuide",
    demo: "https://jom1njun.github.io/CampusGuide/",
    embed: "",
    image: ""
  },
  dtrip: {
    type: "HACKATHON",
    title: "DTrip",
    period: "2025.09 — 2025.11",
    description: "대전 관광지와 축제 정보, 대중교통 도착 정보를 한 곳에서 확인할 수 있도록 통합한 관광·교통 서비스입니다.",
    stack: "Express.js · JavaScript · MySQL · Public API",
    role: "기획 · 데이터 수집/분석 · 개발",
    architecture: "Public Data → API → Server → UI",
    github: "https://github.com/JoM1njun/DTrip",
    demo: "https://dtrip.onrender.com",
    embed: "",
    image: ""
  },
  helmet: {
    type: "FULL STACK",
    title: "상태 체크 안전모",
    period: "2026.03 — 2026.06",
    description: "센서 데이터를 기반으로 작업자의 상태 위험도를 분석하고 서버와 AI 모델 서버를 분리해 처리한 안전관리 서비스입니다.",
    stack: "Express.js · FastAPI · Python · MySQL",
    role: "Backend / API",
    architecture: "Client → Express.js → FastAPI → MySQL",
    github: "https://github.com/JoM1njun/WSLServer",
    demo: "https://dani219-219.github.io/SUUM/#/login",
    embed: "",
    image: ""
  },
  ai: {
    type: "AI PROJECT · ONGOING",
    title: "AI 인형",
    period: "2026.09 — 진행 중",
    description: "사용자의 평소 생활 패턴을 학습하고 평소와 다른 변화를 파악해 먼저 말을 걸거나 필요한 정보를 제공하는 생활 동반 서비스입니다.",
    stack: "Python · RAGFlow · n8n · Appsmith · SIM",
    role: "기획 · 개발",
    architecture: "Data → Python → n8n → AI → Response",
    github: "https://github.com/JoM1njun",
    demo: "",
    embed: "",
    image: ""
  }
};

(() => {
  const modal = document.getElementById("projectModal");

  if (!modal) return;

  const $ = id => document.getElementById(id);
  const preview = $("projectPreview");

  const emptyPreview = () => {
    preview.innerHTML = `
      <div class="project-modal__preview-placeholder">
        <span>PROJECT PREVIEW</span>
        <strong>목업 또는 프로토타입을 추가할 수 있습니다.</strong>
        <p>
          script.js의 <code>projectDetails</code>에서 
          <code>embed</code> 또는 <code>image</code>를 지정하세요.
          </p>
      </div>
    `;
  };

  const open = (key) => {
    const p = projectDetails[key];

    if (!p) return;

    const github = document.getElementById("projectModalGithub");
    const demo = document.getElementById("projectModalDemo");
    const demoMessage = document.getElementById("projectModalDemoMessage");

    // ====================
    // Github
    // ====================
    if (p.github) {
      github.href = p.github;
      github.hidden = false;
    } else {
      github.hidden = true;
    }

    // ====================
    // Demo
    // ====================
    if (p.demo) {
      demo.href = p.demo;
      demo.hidden = false;
      //demoMessage.hidden = true;
    } else {
      demo.hidden = true;
      // demoMessage.textContent = "현재 공개된 데모가 없습니다.";
      // demoMessage.hidden = false;
    }

    // ====================
    // Project 정보
    // ====================
    $("projectModalTitle").textContent = p.title;
    $("projectModalType").textContent = p.type;
    $("projectModalPeriod").textContent = p.period;
    $("projectModalDescription").textContent = p.description;
    $("projectModalTech").textContent = p.stack;
    $("projectModalRole").textContent = p.role;
    //$("projectModalGithub").href = p.github || "#";
    // const demo = $("projectModalDemo");

    // ====================
    // Preview
    // ====================
    preview.innerHTML = "";

    if (p.image) {
      const img = document.createElement("img");

      img.src = p.image;
      img.alt = p.title + " 목업";

      img.onerror = emptyPreview;

      preview.appendChild(img);
    } else if (p.embed) {
      const frame = document.createElement("iframe");

      frame.src = p.embed;
      frame.title = p.title + " 프로토타입";
      frame.loading = "lazy";
      frame.allow = "fullscreen";

      preview.appendChild(frame);
    } else {
      emptyPreview();
    }

    // ====================
    // Modal 표시
    // ====================
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector(".project-modal__close")?.focus();
  };

  // ====================
  // Modal 닫기
  // ====================
  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  document.addEventListener("click", e => {
    const card = e.target.closest("[data-project]");
    if (card && !e.target.closest("a,button")) {

      open(card.dataset.project);

      return;
    }

    if (e.target.closest("[data-modal-close]")) {
      close();
    }

    const caseStudy = e.target.closest("[data-case-study]");
    if (caseStudy) {

      e.preventDefault();

      const card = caseStudy.closest("[data-project]");

      if (card && e.target.closest("a, button")) {
        open(card.dataset.project);
        return;
      }

      return;
    }
  });

  document.addEventListener("keydown", e => {
    const card = e.target.closest?.("[data-project]");
    if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(card.dataset.project); }
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });
})();

/* PORTFOLIO PROJECT MODAL END */
