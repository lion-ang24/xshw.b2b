// Simple carousel interactions for demo
document.addEventListener('DOMContentLoaded', () => {
    // These buttons don't actually scroll in the demo unless we build a true slider.
    // For a wow effect, let's just make them do a little flash animation to the grid.
    const animateGrid = (gridId) => {
        const grid = document.getElementById(gridId);
        if (grid) {
            grid.style.opacity = '0.5';
            grid.style.transform = 'scale(0.98)';
            setTimeout(() => {
                grid.style.opacity = '1';
                grid.style.transform = 'scale(1)';
                grid.style.transition = 'all 0.3s ease';
            }, 150);
        }
    };

    document.getElementById('cat-prev')?.addEventListener('click', () => animateGrid('cat-carousel'));
    document.getElementById('cat-next')?.addEventListener('click', () => animateGrid('cat-carousel'));
    document.getElementById('prod-prev')?.addEventListener('click', () => animateGrid('prod-grid'));
    document.getElementById('prod-next')?.addEventListener('click', () => animateGrid('prod-grid'));
});

// Mega Menu Tab Logic
document.addEventListener('DOMContentLoaded', () => {
    const categoryItems = document.querySelectorAll('.mega-category-item');
    const megaPanels = document.querySelectorAll('.mega-panel');

    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Remove active class from all
            categoryItems.forEach(i => i.classList.remove('active'));
            megaPanels.forEach(p => p.classList.remove('active'));

            // Add active class to current hovered item
            item.classList.add('active');
            
            // Show corresponding panel or fallback to generic
            const targetId = item.getAttribute('data-target');
            let targetPanel = document.getElementById(targetId);
            
            if (!targetPanel) {
                targetPanel = document.getElementById('cat-generic');
                // Dynamically update generic panel title to match category
                if (targetPanel) {
                    const titleEl = targetPanel.querySelector('.generic-title');
                    if (titleEl) {
                        titleEl.innerHTML = item.textContent + ' <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>';
                    }
                }
            }

            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});

    // Accordion Logic for Subcategories
    const panelSubTitles = document.querySelectorAll('.panel-sub-title');
    panelSubTitles.forEach(title => {
        title.addEventListener('click', () => {
            const group = title.closest('.panel-group');
            group.classList.toggle('expanded');
        });
    });

// AI Search Dropdown Logic
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('ai-search-input');
    const searchDropdown = document.getElementById('search-dropdown');
    
    const stateDefault = document.getElementById('search-default');
    const stateLoading = document.getElementById('search-loading');
    const stateResults = document.getElementById('search-results');
    
    let typingTimer;

    if(searchInput && searchDropdown) {
        // Focus opens dropdown with default state
        searchInput.addEventListener('focus', () => {
            searchDropdown.classList.add('show');
            if(searchInput.value.trim() === '') {
                stateDefault.classList.remove('hidden');
                stateLoading.classList.add('hidden');
                stateResults.classList.add('hidden');
            }
        });

        // Click outside closes dropdown
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchDropdown.classList.remove('show');
            }
        });

        // Typing triggers AI loading then results
        searchInput.addEventListener('input', () => {
            clearTimeout(typingTimer);
            const query = searchInput.value.trim();
            
            if (query === '') {
                // Revert to default
                stateDefault.classList.remove('hidden');
                stateLoading.classList.add('hidden');
                stateResults.classList.add('hidden');
                return;
            }

            // Show loading
            stateDefault.classList.add('hidden');
            stateLoading.classList.remove('hidden');
            stateResults.classList.add('hidden');

            // Simulate AI fetch
            typingTimer = setTimeout(() => {
                stateLoading.classList.add('hidden');
                stateResults.classList.remove('hidden');
            }, 800); // 800ms AI thought process
        });
    }
});

// Hero Brand Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('brand-track');
    const indicators = document.querySelectorAll('#brand-indicators .indicator');
    
    if (track && track.children.length > 3) {
        let currentIndex = 0;
        const totalItems = track.children.length;
        let isAnimating = false;
        let autoSlideInterval;

        const slideCarousel = (steps = 1) => {
            if (isAnimating || steps === 0) return;
            isAnimating = true;

            const firstChild = track.children[0];
            const itemWidth = firstChild.getBoundingClientRect().width;
            const gap = 15; // match CSS gap
            const moveDistance = (itemWidth + gap) * steps;

            if (indicators.length > 0) {
                indicators[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + steps) % totalItems;
                indicators[currentIndex].classList.add('active');
            }

            track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
            track.style.transform = `translateX(-${moveDistance}px)`;

            setTimeout(() => {
                track.style.transition = 'none';
                for (let i = 0; i < steps; i++) {
                    track.appendChild(track.children[0]);
                }
                track.style.transform = 'translateX(0)';
                isAnimating = false;
            }, 600);
        };

        const startAutoSlide = () => {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => slideCarousel(1), 5000);
        };

        startAutoSlide();

        indicators.forEach((indicator, index) => {
            indicator.style.cursor = 'pointer';
            indicator.addEventListener('click', () => {
                if (isAnimating || index === currentIndex) return;
                let steps = (index - currentIndex + totalItems) % totalItems;
                slideCarousel(steps);
                startAutoSlide();
            });
        });
    }
});

// Language Switcher Logic
document.addEventListener('DOMContentLoaded', () => {
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangText = document.getElementById('current-lang');

    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            const selectedText = e.target.textContent;
            if (currentLangText) {
                currentLangText.textContent = selectedText;
            }
        });
    });
});

