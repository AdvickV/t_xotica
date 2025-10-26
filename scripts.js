document.addEventListener("DOMContentLoaded", function () {
  const navToggles = document.querySelectorAll(".nav-toggle");
  navToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const navList = document.querySelector(".nav-list");
      if (navList) navList.classList.toggle("show");
    });
  });

  const year = new Date().getFullYear();
  ["year", "year2", "year3"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });

  const countdownElement = document.getElementById("countdown");
  const targetDate = new Date("2025-11-28T09:00:00");

  if (countdownElement) {
    const updateCountdown = () => {
      const now = new Date();
      const diff = Math.max(0, targetDate - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
      const mins = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
      const secs = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
      countdownElement.innerHTML = `
        <div class="days">${days} <span class="label">Days</span></div>
        <div class="time">${hours}:${mins}:${secs}</div>
      `;
      if (diff <= 0) clearInterval(interval);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
  }

  const eventCards = document.querySelectorAll(".event-card");
  eventCards.forEach((card) => {
    const toggle = card.querySelector(".toggle-details");
    const details = card.querySelector(".event-details");
    if (toggle && details) {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpening = !card.classList.contains("is-open");
        eventCards.forEach((other) => {
          other.classList.remove("is-open");
          const od = other.querySelector(".event-details");
          if (od) od.classList.remove("open");
          const ob = other.querySelector(".toggle-details");
          if (ob) ob.textContent = "More";
        });
        if (isOpening) {
          card.classList.add("is-open");
          details.classList.add("open");
          toggle.textContent = "Less";
          setTimeout(() => {
            card.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 120);
        }
      });
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  const sliderContainer = document.querySelector(".slider-container");
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  if (!slider || !slides.length) return;

  let isManual = false;
  let index = 0;
  const slideCount = Math.floor(slides.length / 2) || slides.length;

  const getSlideWidth = () => (slides[0] ? slides[0].getBoundingClientRect().width : 0);

  const updateSlider = () => {
    if (!slider || !slides.length) return;
    const width = getSlideWidth();
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${index * width}px)`;
  };

  const pauseMarquee = () => {
    if (slider) slider.style.animationPlayState = "paused";
    isManual = true;
  };

  if (sliderContainer && slider && prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      pauseMarquee();
      index--;
      if (index < 0) {
        const width = getSlideWidth();
        slider.style.transition = "none";
        index = slideCount - 1;
        slider.style.transform = `translateX(-${(index + slideCount) * width}px)`;
        slider.offsetHeight;
        updateSlider();
      } else {
        updateSlider();
      }
    });

    nextBtn.addEventListener("click", () => {
      pauseMarquee();
      index++;
      if (index >= slideCount) {
        const width = getSlideWidth();
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${(index - slideCount) * width}px)`;
        slider.offsetHeight;
        index = 0;
        updateSlider();
      } else {
        updateSlider();
      }
    });

    window.addEventListener("resize", () => {
      if (isManual) updateSlider();
    });
  }
});
