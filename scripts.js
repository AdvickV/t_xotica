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

  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let currentIndex = 0;

  function updateSlider() {
      if (!slider || slides.length === 0) return;
      const slideWidth = slides[0].clientWidth;
      slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  if (prevBtn && nextBtn && slides.length > 0) {
      prevBtn.addEventListener('click', () => {
          currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
          updateSlider();
      });

      nextBtn.addEventListener('click', () => {
          currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
          updateSlider();
      });

      updateSlider();
      window.addEventListener('resize', updateSlider);
  }

});
