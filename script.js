/* =========================================================
   LAVESH AAMTE — PORTFOLIO INTERACTIONS
   Clean, Performant, Zero-Bloat JavaScript
========================================================= */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================
     1. MOBILE NAVIGATION DRAWER
  ========================================= */
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      const icon = menuBtn.querySelector("i");

      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");

      if (icon) {
        if (isOpen) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        const icon = menuBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      });
    });
  }

  /* =========================================
     2. NAVBAR SCROLLED STATE
  ========================================= */
  const navbar = document.querySelector(".navbar");

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* =========================================
     3. SCROLL PROGRESS BAR
  ========================================= */
  const progressBar = document.querySelector("#scrollProgressBar");

  function handleScrollProgress() {
    if (!progressBar) return;
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
    progressBar.style.width = Math.min(progress, 100) + "%";
  }

  window.addEventListener("scroll", handleScrollProgress, { passive: true });
  handleScrollProgress();

  /* =========================================
     4. SCROLLSPY / ACTIVE NAVIGATION LINKS
  ========================================= */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");
  const railLinks = document.querySelectorAll(".section-rail a");

  function handleScrollspy() {
    let currentId = "home";

    sections.forEach(section => {
      const top = section.offsetTop - 180;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href === "#" + currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    railLinks.forEach(link => {
      const railId = link.getAttribute("data-rail");
      if (railId === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", handleScrollspy, { passive: true });
  handleScrollspy();

  /* =========================================
     5. BACK TO TOP BUTTON
  ========================================= */
  const backToTopBtn = document.querySelector("#backToTop");

  if (backToTopBtn) {
    function handleBackToTopVisibility() {
      if (window.scrollY > window.innerHeight * 0.7) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }

    window.addEventListener("scroll", handleBackToTopVisibility, { passive: true });
    handleBackToTopVisibility();

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });
  }

  /* =========================================
     6. COPY EMAIL BUTTON WITH FEEDBACK
  ========================================= */
  const copyEmailBtn = document.querySelector(".copy-email-btn");

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = copyEmailBtn.getAttribute("data-email") || "laveshaamte17@gmail.com";

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = email;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }

        copyEmailBtn.classList.add("copied");
        const icon = copyEmailBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-copy");
          icon.classList.add("fa-check");
        }

        showToastNotification("Email address copied to clipboard!");

        setTimeout(() => {
          copyEmailBtn.classList.remove("copied");
          if (icon) {
            icon.classList.remove("fa-check");
            icon.classList.add("fa-copy");
          }
        }, 2200);
      } catch (err) {
        showToastNotification("Email: " + email);
      }
    });
  }

  /* =========================================
     7. CONTACT FORM SUBMISSION FEEDBACK
  ========================================= */
  const contactForm = document.querySelector("#contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.querySelector("#name");
      const emailInput = document.querySelector("#email");
      const msgInput = document.querySelector("#message");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const msg = msgInput ? msgInput.value.trim() : "";

      if (!name || !email || !msg) {
        showToastNotification("Please fill in all fields before sending.");
        return;
      }

      showToastNotification("Thank you, " + name + "! Message ready to connect via email.");
      contactForm.reset();
    });
  }

  /* =========================================
     8. TOAST NOTIFICATION UTILITY
  ========================================= */
  function showToastNotification(text) {
    const existing = document.querySelector(".portfolio-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "portfolio-toast";
    toast.innerHTML = '<span class="toast-dot"></span><span>' + text + '</span>';

    Object.assign(toast.style, {
      position: "fixed",
      bottom: "24px",
      right: "24px",
      zIndex: "10005",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "12px 20px",
      background: "#141923",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      borderRadius: "9999px",
      color: "#f8fafc",
      fontFamily: "'Inter', sans-serif",
      fontSize: "13px",
      fontWeight: "500",
      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6)",
      opacity: "0",
      transform: "translateY(12px)",
      transition: "all 0.25s ease"
    });

    const dot = toast.querySelector(".toast-dot");
    if (dot) {
      Object.assign(dot.style, {
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        background: "#38bdf8",
        boxShadow: "0 0 8px #38bdf8"
      });
    }

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    });

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(12px)";
      setTimeout(() => toast.remove(), 260);
    }, 3200);
  }

  /* =========================================
     9. GITHUB REPOSITORY STATS (LIVE DATA)
  ========================================= */
  (function fetchGithubStats() {
    const statGithub = document.querySelector(".stat-github");
    const repoCountEl = document.querySelector(".github-repo-count");

    if (!statGithub || !repoCountEl) return;

    fetch("https://api.github.com/users/laveshaamte17anu")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && typeof data.public_repos === "number") {
          repoCountEl.textContent = data.public_repos + " Repos";
          statGithub.hidden = false;
        }
      })
      .catch(() => {
        // Fallback silently without throwing user-facing error
      });
  })();

  /* =========================================
     10. CONSOLE CREDITS
  ========================================= */
  console.log(
    "%cLavesh Aamte %c// Full-Stack Software Engineer",
    "font-family: monospace; font-size: 14px; font-weight: bold; color: #38bdf8;",
    "font-family: monospace; font-size: 13px; color: #94a3b8;"
  );
  console.log(
    "%cGitHub: https://github.com/laveshaamte17anu",
    "font-family: monospace; font-size: 11px; color: #64748b;"
  );

})();
