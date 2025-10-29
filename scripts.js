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
        
        const isOpening = !details.classList.contains('open'); 

        allEventCards.forEach(otherCard => {
          if (otherCard !== card) {
            const otherDetails = otherCard.querySelector('.event-details');
            if (otherDetails && otherDetails.classList.contains('open')) {
              otherDetails.classList.remove('open');
              const otherBtn = otherCard.querySelector('.toggle-details');
               if(otherBtn) {
                   otherBtn.textContent = 'More';
               }
              otherCard.classList.remove('is-open'); 
            }
          }
        });

        details.classList.toggle('open');
        btn.textContent = isOpening ? 'Less' : 'More';
        card.classList.toggle('is-open', isOpening); 

        if (eventsContainer) {
           eventsContainer.classList.toggle('has-expanded-card', isOpening);
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

  const handleCommitteeSlider = () => {
    const sliderContainer = document.querySelector('.slider-container');
    const mobileSlider = document.querySelector('.mobile-slider');
    const mobileSliderImg = document.querySelector('.mobile-slider-img');
    const mobileCaption = document.getElementById('mobile-caption');
    const slides = document.querySelectorAll('.slide');
    const imageUrls = Array.from(slides).map(slide => slide.querySelector('img').src);
    const captions = Array.from(slides).map(slide => slide.querySelector('.caption').textContent);

    let currentIndex = 0;
    let intervalId;

    const showSlideshow = () => {
      if (sliderContainer) sliderContainer.style.display = 'none';
      if (mobileSlider) mobileSlider.style.display = 'block';

      if (intervalId) clearInterval(intervalId);

      const nextImage = () => {
        if (imageUrls.length > 0) {
          mobileSliderImg.src = imageUrls[currentIndex];
          mobileCaption.textContent = captions[currentIndex];
          currentIndex = (currentIndex + 1) % imageUrls.length;
        }
      };

      nextImage();
      intervalId = setInterval(nextImage, 3000);
    };

    const showMarquee = () => {
      if (sliderContainer) sliderContainer.style.display = 'block';
      if (mobileSlider) mobileSlider.style.display = 'none';
      if (intervalId) clearInterval(intervalId);
    };

    const handleResize = () => {
      if (window.innerWidth <= 760) {
        showSlideshow();
      } else {
        showMarquee();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
  };

  handleCommitteeSlider();

});
