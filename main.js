// Slider for intro section
    let currentIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        dots[i].classList.toggle("active", i === index);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    setInterval(nextSlide, 3000);

    // Scroll functionality for recommendation cards
    const cardsContainer = document.querySelector('.recomend-cards-container');
    const leftBtn = document.querySelector('.circle-btnR.outline:first-child');
    const rightBtn = document.querySelector('.circle-btnR.outline:last-child');

    leftBtn.addEventListener('click', () => {
      cardsContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      cardsContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Scroll functionality for menu cards
    const menuCardsContainer = document.querySelector('.menu-cards');
    const menuLeftBtn = document.querySelector('.menu-section .circle-btn.outline:first-child');
    const menuRightBtn = document.querySelector('.menu-section .circle-btn.outline:last-child');

    if (menuLeftBtn && menuRightBtn) {
      menuLeftBtn.addEventListener('click', () => {
        menuCardsContainer.scrollBy({ left: -150, behavior: 'smooth' });
      });

      menuRightBtn.addEventListener('click', () => {
        menuCardsContainer.scrollBy({ left: 150, behavior: 'smooth' });
      });
    }

    
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const recomendContainer = document.getElementById('recomend-container');
    const menus = data.menu.slice(0, 8); // Ambil 8 item pertama

    menus.forEach(item => {
      const card = document.createElement('div');
      card.className = 'recomend-card';
      card.innerHTML = `
        <div class="card-image">
          <img src="${item.img}" alt="${item.nama_menu}">
        </div>
        <div class="card-body">
          <div class="rating"><i class="fas fa-star"></i> ${item.rating}</div>
          <p class="card-title">${item.nama_menu}</p>
          <p class="card-price">Rp ${item.harga.toLocaleString('id-ID')},00</p>
          <button class="card-button">Order Now</button>
        </div>
      `;
      recomendContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Gagal memuat data:', error));
