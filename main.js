// Burger menu functionality
    document.addEventListener('DOMContentLoaded', function() {
      const burgerMenu = document.querySelector('.burger-menu');
      const navContainer = document.querySelector('.nav-container');

      burgerMenu.addEventListener('click', () => {
        navContainer.classList.toggle('active');
        burgerMenu.classList.toggle('active');
      });

      // Close menu when clicking on a link
      document.querySelectorAll('.nav-link, .mobile-only').forEach(link => {
        link.addEventListener('click', () => {
          navContainer.classList.remove('active');
          burgerMenu.classList.remove('active');
        });
      });
    });

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

document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi variabel
    let currentPage = 0;
    let totalPages = 0;
    let menus = [];
    let leftBtn, rightBtn;
    
    // Fungsi untuk memuat data menu
    function loadMenuData() {
        fetch('data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                menus = data.menu.slice(0, 15); // Ambil 15 item pertama
                totalPages = Math.ceil(menus.length / 5); // 5 item per halaman
                initCarousel();
                createPageIndicator();
                showItems(currentPage);
            })
            .catch(error => {
                console.error('Error loading menu data:', error);
                // Fallback atau tampilkan pesan error ke user
                document.getElementById('recomend-container').innerHTML = 
                    '<p class="error-message">Failed to load menu. Please try again later.</p>';
            });
    }

    // Fungsi untuk inisialisasi carousel
    function initCarousel() {
        leftBtn = document.querySelector('.recomend-arrows .circle-btnR:first-child');
        rightBtn = document.querySelector('.recomend-arrows .circle-btnR:last-child');

        if (!leftBtn || !rightBtn) {
            console.error('Navigation buttons not found!');
            return;
        }

        leftBtn.addEventListener('click', goToPreviousPage);
        rightBtn.addEventListener('click', goToNextPage);
    }

    // Fungsi untuk menampilkan items berdasarkan halaman
    function showItems(page) {
        const container = document.getElementById('recomend-container');
        if (!container) return;

        container.innerHTML = '';
        const startIdx = page * 5;
        const endIdx = startIdx + 5;
        const itemsToShow = menus.slice(startIdx, endIdx);

        itemsToShow.forEach(item => {
            const card = document.createElement('div');
            card.className = 'recomend-card';
            card.innerHTML = `
                <div class="card-image">
                    <img src="${item.img}" alt="${item.nama_menu}" loading="lazy">
                </div>
                <div class="card-body">
                    <div class="rating"><i class="fas fa-star"></i> ${item.rating}</div>
                    <p class="card-title">${item.nama_menu}</p>
                    <p class="card-price">Rp ${item.harga.toLocaleString('id-ID')},00</p>
                    <button class="card-button">Order Now</button>
                </div>
            `;
            container.appendChild(card);
        });

        updateButtonStates();
        updatePageIndicator();
    }

    // Fungsi navigasi
    function goToPreviousPage() {
        if (currentPage > 0) {
            currentPage--;
            showItems(currentPage);
        }
    }

    function goToNextPage() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            showItems(currentPage);
        }
    }

    // Fungsi update state tombol
    function updateButtonStates() {
        leftBtn.disabled = currentPage === 0;
        rightBtn.disabled = currentPage === totalPages - 1;
    }

    // Fungsi untuk indikator halaman
    function createPageIndicator() {
        const arrowsContainer = document.querySelector('.recomend-arrows');
        if (!arrowsContainer.querySelector('.page-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'page-indicator';
            arrowsContainer.appendChild(indicator);
        }
    }

    function updatePageIndicator() {
        const indicator = document.querySelector('.page-indicator');
    }

    // Event delegation untuk tombol order
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('card-button')) {
            const card = e.target.closest('.recomend-card');
            if (card) {
                const title = card.querySelector('.card-title').textContent;
                alert(`Added to cart: ${title}`);
            }
        }
    });

    // Mulai dengan memuat data
    loadMenuData();
});