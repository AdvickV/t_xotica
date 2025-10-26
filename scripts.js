document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const navList = document.querySelector('.nav-list');
      navList.classList.toggle('show');
    });
  });

  const y = new Date().getFullYear();
  document.getElementById('year') && (document.getElementById('year').textContent = y);
  document.getElementById('year2') && (document.getElementById('year2').textContent = y);
  document.getElementById('year3') && (document.getElementById('year3').textContent = y);

  const target = new Date('2025-11-28T09:00:00');
  const cd = document.getElementById('countdown');
  if (cd) {
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000*60*60*24));
      const hrs = String(Math.floor((diff/(1000*60*60))%24)).padStart(2,'0');
      const mins = String(Math.floor((diff/(1000*60))%60)).padStart(2,'0');
      const secs = String(Math.floor((diff/1000)%60)).padStart(2,'0');
      
      cd.innerHTML = `<div class="days">${days} <span class="label">Days</span></div>
                      <div class="time">${hrs}:${mins}:${secs}</div>`;

      if (diff<=0) clearInterval(i);
    };
    tick();
    const i = setInterval(tick,1000);
  }

  const eventsContainer = document.querySelector('.events-container');
  const allEventCards = document.querySelectorAll('.event-card');

  allEventCards.forEach(card => {
    const btn = card.querySelector('.toggle-details');
    const details = card.querySelector('.event-details');

    if (btn && details) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const isOpening = !card.classList.contains('is-open');

        allEventCards.forEach(otherCard => {
            otherCard.classList.remove('is-open');
            const otherDetails = otherCard.querySelector('.event-details');
            if (otherDetails) {
                 otherDetails.classList.remove('open');
            }
            const otherBtn = otherCard.querySelector('.toggle-details');
             if(otherBtn) {
                 otherBtn.textContent = 'More';
             }
        });

        if (isOpening) {
          card.classList.add('is-open');
          details.classList.add('open');
          btn.textContent = 'Less';
        }
      });
    }
  });

  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, {threshold:0.1});

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    obs.observe(el);
  });

  const sliderContainer = document.querySelector('.slider-container');
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let isManualControl = false;
  let currentIndex = 0;
  const slideCount = slides.length / 2; 
  let autoSlideInterval;

  function updateManualSlider() {
    if (!slider || !slides || slides.length === 0) return;
    const slideWidth = slides[0].clientWidth;
    slider.style.transition = 'transform 0.5s ease-in-out'; 
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function pauseMarquee() {
    if (slider) {
      slider.style.animationPlayState = 'paused';
    }
    isManualControl = true;
  }

  function startAutoSlide() {
    if (slider) {
        slider.style.animationPlayState = 'running';
    }
    isManualControl = false;
    // Optional: Reset animation or position if needed after manual interaction
  }


  if (sliderContainer && slider && prevBtn && nextBtn && slides.length > 0) {
    prevBtn.addEventListener('click', () => {
      pauseMarquee();
      currentIndex--;
      if (currentIndex < 0) {
        slider.style.transition = 'none'; 
        currentIndex = slideCount - 1;
        const slideWidth = slides[0].clientWidth;
        slider.style.transform = `translateX(-${(currentIndex + slideCount) * slideWidth}px)`;
        slider.offsetHeight; 
        updateManualSlider();
      } else {
        updateManualSlider();
      }
    });

    nextBtn.addEventListener('click', () => {
      pauseMarquee();
      currentIndex++;
       if (currentIndex >= slideCount) {
        slider.style.transition = 'none'; 
        const slideWidth = slides[0].clientWidth;
        slider.style.transform = `translateX(-${(currentIndex - slideCount) * slideWidth}px)`;
        slider.offsetHeight; 
        currentIndex = 0; 
        updateManualSlider();
      } else {
          updateManualSlider();
      }
    });

    window.addEventListener('resize', () => {
      if (isManualControl) {
        updateManualSlider(); 
      }
    });
  }
});
