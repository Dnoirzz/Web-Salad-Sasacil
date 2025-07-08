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

        // Menu Data
        let saladMenuData = [];
        let filteredSaladData = [];
        let showAll = false;
        let showAllBestSeller = false;
        let filteredBestsellData = [];
        const initialDisplayCount = 5;

        // Load menu data
        async function loadSaladMenu() {
            try {
                const response = await fetch('data.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Use data from JSON or fallback to sample data
                saladMenuData = data.menu || getSampleMenuData();

                // Initialize with Salad items
                filteredSaladData = saladMenuData.filter(item =>
                    item.kategori.toLowerCase() === "salad"
                );

                        // Initialize best seller items (rating >= 4.6)
        filteredBestsellData = saladMenuData.filter(item =>
            item.rating >= 4.7
        );

                renderSaladCards();
                renderBestsellCards();
                updateMenuCounts();
                
                // Automatically show Salad category items on page load
                showCategoryItems("Salad");
            } catch (error) {
                console.error('Error loading menu data:', error);
                // Use sample data if fetch fails
                saladMenuData = getSampleMenuData();
                filteredSaladData = saladMenuData.filter(item =>
                    item.kategori.toLowerCase() === "salad"
                );
                renderSaladCards();
                renderBestsellCards();
                updateMenuCounts();
                showCategoryItems("Salad");
            }
        }

        // Update item counts for each category
        function updateMenuCounts() {
            document.querySelectorAll('.menu-card').forEach(card => {
                const category = card.querySelector('.menu-name').textContent;
                const count = saladMenuData.filter(item =>
                    item.kategori.toLowerCase() === category.toLowerCase()
                ).length;
                card.querySelector('.menu-count').textContent = `${count} Items`;
            });
        }

        // Render salad cards
        function renderSaladCards() {
            const container = document.getElementById('recommend-cards');
            const toggleViewBtn = document.getElementById('toggleViewBtn');
            container.innerHTML = '';

            if (filteredSaladData.length === 0) {
                container.innerHTML = '<div class="no-results">No items found matching your search</div>';
                toggleViewBtn.style.display = 'none';
                return;
            }

            const itemsToDisplay = showAll ? filteredSaladData : filteredSaladData.slice(0, initialDisplayCount);

            itemsToDisplay.forEach((item) => {
                const card = document.createElement('div');
                card.className = 'recommend-card';
                card.innerHTML = `
                    <div class="card-img">
                        <img src="${item.img}" alt="${item.nama_menu}" loading="lazy">
                    </div>
                    <div class="card-body">
                        <span class="card-rating"><i class="fas fa-star"></i><span> ${item.rating}</span></span>
                        <h3 class="card-title">${item.nama_menu}</h3>
                        <p class="card-price">Rp ${item.harga.toLocaleString('id-ID')}</p>
                        <button class="card-btn">Order Now</button>
                    </div>
                `;
                container.appendChild(card);
            });

            if (filteredSaladData.length <= initialDisplayCount) {
                toggleViewBtn.style.display = 'none';
            } else {
                toggleViewBtn.style.display = 'inline-block';
                toggleViewBtn.textContent = showAll ? 'Hide' : 'View all';
            }
        }

        // Toggle view all/hide items
        document.getElementById('toggleViewBtn').addEventListener('click', () => {
            showAll = !showAll;
            renderSaladCards();
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filteredSaladData = saladMenuData.filter(item =>
                item.nama_menu.toLowerCase().includes(searchTerm) ||
                (item.deskripsi && item.deskripsi.toLowerCase().includes(searchTerm))
            );
            showAll = false;
            renderSaladCards();
        });

        // Category Menu Functionality
        const menuCards = document.querySelectorAll('.menu-card');
        const kategoriContainer = document.getElementById('kategoriContainer');
        const kategoriTitle = document.createElement('h3');
        kategoriTitle.className = 'kategori-title';

        menuCards.forEach(card => {
            card.addEventListener('click', function() {
                menuCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');

                const category = this.querySelector('.menu-name').textContent;
                showCategoryItems(category);
            });
        });

        // Show items for selected category
        function showCategoryItems(category) {
            kategoriContainer.style.display = 'grid';

            // Update kategori title
            kategoriContainer.innerHTML = '';
            kategoriTitle.innerHTML = `
                <i class="back-to-categories"></i> Kategori
                ${category}
            `;
            kategoriContainer.appendChild(kategoriTitle);

            // Filter items by category
            const categoryItems = saladMenuData.filter(item =>
                item.kategori.toLowerCase() === category.toLowerCase()
            );

            // Display category items
            if (categoryItems.length === 0) {
                kategoriContainer.innerHTML = `
                    <div class="no-results" style="grid-column: 1 / -1;">
                        No items found in ${category} category
                    </div>
                `;
                return;
            }

            categoryItems.forEach(item => {
                const card = document.createElement('div');
                card.className = 'kategori-card';
                card.innerHTML = `
                    <div class="card-img">
                        <img src="${item.img}" alt="${item.nama_menu}" loading="lazy">
                    </div>
                    <div class="card-body">
                        <span class="card-rating"><i class="fas fa-star"></i><span> ${item.rating}</span></span>
                        <h3 class="card-title">${item.nama_menu}</h3>
                        <p class="card-price">Rp ${item.harga.toLocaleString('id-ID')}</p>
                        <button class="card-btn">Order Now</button>
                    </div>
                `;
                kategoriContainer.appendChild(card);
            });

            // Scroll to kategori section
            kategoriContainer.scrollIntoView({ behavior: 'smooth' });

            // Back button functionality
            document.querySelector('.back-to-categories').addEventListener('click', backToCategories);
        }

        // Back to categories view
        function backToCategories() {
            kategoriContainer.style.display = 'none';
            menuCards.forEach(c => c.classList.remove('active'));

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            loadSaladMenu();

            // Order button functionality
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('card-btn')) {
                    const card = e.target.closest('.recommend-card') || e.target.closest('.kategori-card') || e.target.closest('.best-seller-card'); 
                    const title = card.querySelector('.card-title').textContent;
                    alert(`Harap Login Terlebih Dahulu Sebelum Melakukan Pemesanan!`);
                }
            });
        });

        // Render Best Seller cards
function renderBestsellCards() {
    const container = document.getElementById('best-seller-cards');
    const toggleViewBtn = document.getElementById('toggleViewBestSellerBtn');
    container.innerHTML = '';

    if (filteredBestsellData.length === 0) {
        container.innerHTML = '<div class="no-results">No items found matching your search</div>';
        toggleViewBtn.style.display = 'none';
        return;
    }

    const itemsToDisplay = showAllBestSeller ? filteredBestsellData : filteredBestsellData.slice(0, initialDisplayCount);

    itemsToDisplay.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'best-seller-card';
        card.innerHTML = `
            <div class="card-img">
                <img src="${item.img}" alt="${item.nama_menu}" loading="lazy">
            </div>
            <div class="card-body">
                <span class="card-rating"><i class="fas fa-star"></i><span> ${item.rating}</span></span>
                <h3 class="card-title">${item.nama_menu}</h3>
                <p class="card-price">Rp ${item.harga.toLocaleString('id-ID')}</p>
                <button class="card-btn">Order Now</button>
            </div>
        `;
        container.appendChild(card);
    });

    if (filteredBestsellData.length <= initialDisplayCount) {
        toggleViewBtn.style.display = 'none';
    } else {
        toggleViewBtn.style.display = 'inline-block';
        toggleViewBtn.textContent = showAllBestSeller ? 'Hide' : 'View all';
    }
}

document.getElementById('toggleViewBestSellerBtn').addEventListener('click', () => {
    showAllBestSeller = !showAllBestSeller;
    renderBestsellCards();
});