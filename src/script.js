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
