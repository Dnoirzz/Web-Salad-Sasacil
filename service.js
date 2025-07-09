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

        // Menu from JSON
        let currentPage = 0;
        let topMenus = [];
        const cardsPerPage = 10;
        const cardsPerRow = 5;
        let totalPages = 0;

// Sample testimonial data
        const testimonials = [
            {
                id: 1,
                author: "Endang Listyowati",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                rating: 5,
                date: "2023-05-15"
            },
            {
                id: 2,
                author: "Sari Putriani",
                content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
                rating: 4,
                date: "2023-06-20"
            },
            {
                id: 3,
                author: "Deronimus Chrismas",
                content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
                rating: 3,
                date: "2023-07-10"
            },
            {
                id: 4,
                author: "Ryan",
                content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
                rating: 5,
                date: "2023-08-05"
            },
            {
                id: 5,
                author: "Muhammad Mizan Umar",
                content: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
                rating: 2,
                date: "2023-09-12"
            }
        ];

        // Load menu data from JSON
        async function loadMenuData() {
            try {
                const response = await fetch('data.json');
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                topMenus = data.menu?.sort((a, b) => b.rating - a.rating) || [];

                if (topMenus.length === 0) {
                    console.warn('No menu data available');
                    topMenus = getFallbackData();
                }

                totalPages = Math.ceil(topMenus.length / cardsPerPage);
                renderMenuCards();
                renderPageDots();
                updateNavButtons();
            } catch (error) {
                console.error('Error loading menu data:', error);
                topMenus = getFallbackData();
                totalPages = Math.ceil(topMenus.length / cardsPerPage);
                renderMenuCards();
                renderPageDots();
                updateNavButtons();
            }
        }

        function getFallbackData() {
            return [
                {
                    nama_menu: "Salad Buah Special",
                    harga: 25000,
                    rating: 4.8,
                    img: "assets/images/menu/Salad/Salad Buah 500ml Taro.webp"
                },
                {
                    nama_menu: "Salad Sayur Segar",
                    harga: 22000,
                    rating: 4.7,
                    img: "assets/images/menu/Salad/Salad Sayur.webp"
                },
                {
                    nama_menu: "Sushi Salmon Mentai",
                    harga: 35000,
                    rating: 4.9,
                    img: "assets/images/menu/Sushi/Sushi Salmon Mentai.jpg"
                },
                {
                    nama_menu: "Avocado Smoothie",
                    harga: 18000,
                    rating: 4.6,
                    img: "assets/images/menu/Drink/Avocado Smoothies.png"
                },
                {
                    nama_menu: "Seblak Ceker Pedas",
                    harga: 20000,
                    rating: 4.5,
                    img: "assets/images/menu/Seblak/Seblak Ceker.jpg"
                },
                {
                    nama_menu: "Dimsum Ayam",
                    harga: 15000,
                    rating: 4.4,
                    img: "assets/images/menu/Dimsum/Dimsum ayam.jpg"
                },
                {
                    nama_menu: "Nasi Goreng Special",
                    harga: 25000,
                    rating: 4.3,
                    img: "assets/images/menu/Makanan/Nasi goreng.jpg"
                }
            ];
        }

        // Render menu cards for current page
        function renderMenuCards() {
            const container = document.getElementById('menu-cards-container');
            container.innerHTML = '';

            const startIndex = currentPage * cardsPerPage;
            const endIndex = startIndex + cardsPerPage;
            const itemsToShow = topMenus.slice(startIndex, endIndex);

            // Create two rows (5 cards each)
            for (let row = 0; row < 2; row++) {
                const rowStart = row * cardsPerRow;
                const rowEnd = rowStart + cardsPerRow;
                const rowItems = itemsToShow.slice(rowStart, rowEnd);

                if (rowItems.length === 0) continue;

                const rowDiv = document.createElement('div');
                rowDiv.className = 'menu-cards-row';

                rowItems.forEach((item, index) => {
                    const card = document.createElement('div');
                    card.className = 'menu-card';
                    card.style.animation = `slideInRight 0.5s ease ${index * 0.1}s forwards`;
                    card.style.opacity = '0';
                    card.innerHTML = `
                        <div class="card-img">
                            <img src="${item.img}" alt="${item.nama_menu}" loading="lazy">
                        </div>
                        <div class="card-body">
                            <span class="card-rating"><i class="fas fa-star"></i><span> ${item.rating}</span></span>
                            <h3 class="card-title">${item.nama_menu}</h3>
                            <p class="card-price">Rp ${item.harga.toLocaleString('id-ID')}</p>
                            <a href="login.html" class="card-btn">Order Now</a>
                        </div>
                    `;
                    
                    // Add click event to show rating and scroll to it
                    card.addEventListener('click', () => {
                        const name = item.nama_menu;
                        const rating = item.rating;
                        document.querySelector('.menu-name').textContent = name;
                        document.querySelector('.rating-value').textContent = rating;
                        
                        // Show the rating display
                        document.querySelector('.menu-rating').classList.add('active');

                        // Show testimonial section
                        document.querySelector('.testimonial-section').classList.add('active');

                        // Load testimonials
                        renderTestimonials();
                        
                        // Scroll to rating section smoothly
                        document.getElementById('rating-section').scrollIntoView({
                            behavior: 'smooth'
                        });
                    });
                    
                    rowDiv.appendChild(card);
                });

                container.appendChild(rowDiv);
            }
        }

        // Render testimonials
        function renderTestimonials(filter = 'all') {
            const container = document.getElementById('testimonial-cards');
            container.innerHTML = '';

            let filteredTestimonials = testimonials;
            
            if (filter !== 'all') {
                const ratingFilter = parseInt(filter);
                filteredTestimonials = testimonials.filter(t => t.rating >= ratingFilter);
            }

            if (filteredTestimonials.length === 0) {
                container.innerHTML = '<p>No testimonials found for this filter</p>';
                return;
            }

            filteredTestimonials.forEach(testimonial => {
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                
                // Create star rating
                let stars = '';
                for (let i = 0; i < 5; i++) {
                    stars += i < testimonial.rating ? '★' : '☆';
                }
                
                card.innerHTML = `
                    <div class="testimonial-author">${testimonial.author}</div>
                    <div class="testimonial-rating">${stars}</div>
                    <p class="testimonial-content">${testimonial.content}</p>
                    <div class="testimonial-date" style="color: #888; font-size: 12px; margin-top: 5px;">${testimonial.date}</div>
                `;
                
                container.appendChild(card);
            });
        }

        // Initialize testimonial filter buttons
        function initTestimonialFilters() {
            document.querySelectorAll('.rating-filter-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    document.querySelectorAll('.rating-filter-btn').forEach(b => {
                        b.classList.remove('active');
                    });
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Get filter value
                    const filter = this.getAttribute('data-filter');
                    
                    // Filter testimonials
                    renderTestimonials(filter);
                });
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
                    renderMenuCards();
                    updateActiveDot();
                    updateNavButtons();
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

        // Update navigation buttons state
        function updateNavButtons() {
            document.querySelector('.prev-btn').disabled = currentPage === 0;
            document.querySelector('.next-btn').disabled = currentPage === totalPages - 1;
        }

        // Navigation buttons
        document.querySelector('.prev-btn').addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                renderMenuCards();
                updateActiveDot();
                updateNavButtons();
            }
        });

        document.querySelector('.next-btn').addEventListener('click', () => {
            if (currentPage < totalPages - 1) {
                currentPage++;
                renderMenuCards();
                updateActiveDot();
                updateNavButtons();
            }
        });

        // Order button click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('card-btn')) {
                const card = e.target.closest('.menu-card');
                const title = card.querySelector('.card-title').textContent;
                alert(`Harap Login Terlebih Dahulu !`);
            }
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            loadMenuData();
            initTestimonialFilters();
        });