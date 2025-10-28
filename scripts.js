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
