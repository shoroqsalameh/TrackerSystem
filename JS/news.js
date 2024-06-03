
document.addEventListener('DOMContentLoaded', function () {
  // Initialize swiper
  const swiper = new Swiper(".slide-content", {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: true,
      loopFillGroupWithBlank: true,
      centerSlide: true,
      fade: true,
      grabCursor: true,
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
      },
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
      effect: 'slide',
      autoplay: {
          delay: 3000,
          disableOnInteraction: false,
      },
      breakpoints: {
          0: { slidesPerView: 1 },
          520: { slidesPerView: 2 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          950: { slidesPerView: 3 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
      }
  });

  // Load news data
  fetch('data/news.json')
      .then(response => response.json())
      .then(data => {
          const news = data.news;
          for (let i = 0; i < news.length; i++) {
              const img = document.getElementById(`img${i + 1}`);
              const p = document.getElementById(`p${i + 1}`);
              img.src = news[i].image;
              p.innerHTML = news[i].description;
          }
      })
      .catch(error => console.error('Error fetching news data:', error));
});
