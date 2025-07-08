// Burger Menu Toggle
const burgerMenu = document.querySelector('.burger-menu');
const navContainer = document.querySelector('.nav-container');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
  navContainer.classList.toggle('active');
});

// Close menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
    navContainer.classList.remove('active');
  });
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Auto slide every 3 seconds
setInterval(nextSlide, 3000);

// Click on dots to navigate
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Recommended Menu from JSON
let currentPage = 0;
let topMenus = [];
const cardsPerPage = 5;
let totalPages = 0;

// Load menu data from JSON
async function loadMenuData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Sort by rating (highest first) and take top 15
    topMenus = data.menu.sort((a, b) => b.rating - a.rating).slice(0, 15);
    totalPages = Math.ceil(topMenus.length / cardsPerPage);

    renderRecommendedCards();
    renderPageDots();
  } catch (error) {
    console.error('Error loading menu data:', error);
    // Fallback data if JSON fails to load
    topMenus = [
      {
        nama_menu: "Salad Buah Special",
        harga: 25000,
        rating: 4.8,
        img: "assets/images/menu/Salad/Salad Buah 500ml Taro.webp"
      },
      // ... more fallback items
    ].slice(0, 15);
    totalPages = Math.ceil(topMenus.length / cardsPerPage);
    renderRecommendedCards();
    renderPageDots();
  }
}

// Render recommended cards for current page
function renderRecommendedCards() {
  const container = document.getElementById('recommend-cards');
  container.innerHTML = '';

  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const itemsToShow = topMenus.slice(startIndex, endIndex);

  itemsToShow.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'recommend-card';
    card.style.animation = `slideInRight 0.5s ease ${index * 0.1}s forwards`;
    card.style.opacity = '0';
    card.innerHTML = `
          <div class="card-img">
            <img src="${item.img}" alt="${item.nama_menu}" loading="lazy">
          </div>
          <div class="card-body">
            <span class="card-rating"><i class="fas fa-star"></i><span> ${item.rating}</span></span>
            <h3 class="card-title">${item.nama_menu}</h3>
            <p class="card-price">Rp ${item.harga.toLocaleString('id-ID')},00</p>
            <a href="menu.html" class="card-btn">Order Now</a>
          </div>
        `;
    container.appendChild(card);
  });
}

// Render page dots
function renderPageDots() {
  const dotsContainer = document.getElementById('page-dots');
  dotsContainer.innerHTML = '';

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('div');
    dot.className = 'page-dot';
    if (i === currentPage) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentPage = i;
      renderRecommendedCards();
      updateActiveDot();
    });
    dotsContainer.appendChild(dot);
  }
}

// Update active dot
function updateActiveDot() {
  const dots = document.querySelectorAll('.page-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentPage);
  });
}

// Navigation buttons
document.querySelector('.prev-btn').addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    renderRecommendedCards();
    updateActiveDot();
  }
});

document.querySelector('.next-btn').addEventListener('click', () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    renderRecommendedCards();
    updateActiveDot();
  }
});

// Order button click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('card-btn')) {
    const card = e.target.closest('.recommend-card');
    const title = card.querySelector('.card-title').textContent;
  }
});

// Initialize
loadMenuData();