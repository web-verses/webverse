document.addEventListener('DOMContentLoaded', () => {

    // =================================================================================
    // MOCK DATABASE 
    // =================================================================================
    const comicsData = [
        { id: 'quantum-ranger', title: 'The Quantum Ranger', author: 'Jane Doe', artist: 'John Smith', status: 'Ongoing', chapters: 72, rank: 1, genres: ['Action', 'Sci-Fi', 'Adventure', 'Superhero'], summary: 'When a failed experiment gives high-schooler Alex a gateway to other dimensions, he must become the Quantum Ranger to protect his reality from cosmic threats.', cover: 'https://placehold.co/400x600/E53935/FFFFFF?text=Quantum+Ranger', heroArt: 'https://placehold.co/1200x500/1E1E1E/FFFFFF?text=The+Quantum+Ranger' },
        { id: 'arcane-sorcerer', title: 'Arcane Sorcerer', author: 'Mark Johnson', artist: 'Emily White', status: 'Ongoing', chapters: 105, rank: 4, genres: ['Fantasy', 'Magic', 'Adventure'], summary: 'A once-in-a-millennium magical prodigy is reincarnated into a world where magic has been forgotten. He must rediscover the ancient arts to face a looming darkness.', cover: 'https://placehold.co/400x600/1E88E5/FFFFFF?text=Arcane+Sorcerer' },
        { id: 'blade-of-the-fallen', title: 'Blade of the Fallen', author: 'Chris Lee', artist: 'Sara Chen', status: 'Completed', chapters: 45, rank: 5, genres: ['Action', 'Fantasy', 'Tragedy'], summary: 'The sole survivor of a legendary order of knights seeks vengeance on the empire that betrayed them, wielding a cursed blade that devours the souls of his enemies.', cover: 'https://placehold.co/400x600/43A047/FFFFFF?text=Blade+of+Fallen' },
        { id: 'martial-gods-return', title: "Martial God's Return", author: 'Kim Park', artist: 'Lee Kim', status: 'Ongoing', chapters: 150, rank: 2, genres: ['Action', 'Fantasy', 'Martial Arts'], summary: 'The strongest martial artist is betrayed and killed by his closest friend. He is given a second chance at life, returning 20 years in the past to right the wrongs and achieve even greater power.', cover: 'https://placehold.co/400x600/FDD835/000000?text=Martial+God' },
        { id: 'the-last-necromancer', title: 'The Last Necromancer', author: 'David Allen', artist: 'Anna Bell', status: 'Ongoing', chapters: 88, rank: 3, genres: ['Fantasy', 'Horror', 'Action'], summary: 'In a world that has outlawed and eradicated necromancers, a young man discovers he has the forbidden power. Hunted by the church and the state, he must survive by embracing the darkness.', cover: 'https://placehold.co/400x600/8E24AA/FFFFFF?text=Necromancer' },
        { id: 'level-up-king', title: 'Level-Up King', author: 'Author Name', artist: 'Artist Name', status: 'Ongoing', chapters: 120, rank: 6, genres: ['Isekai', 'Action', 'System'], summary: 'A mediocre gamer is transported into his favorite video game. Armed with his knowledge of quests and exploits, he aims to become the undisputed king of this new world.', cover: 'https://placehold.co/400x600/FB8C00/FFFFFF?text=Level-Up+King' },
        { id: 'cosmic-drifter', title: 'Cosmic Drifter', author: 'G. Wells', artist: 'H. Verne', status: 'Ongoing', chapters: 30, rank: 7, genres: ['Sci-Fi', 'Space Opera', 'Adventure'], summary: 'A lone pilot traverses the galaxy in a beat-up starship, taking on odd jobs and escaping a mysterious past that is quickly catching up to him.', cover: 'https://placehold.co/400x600/00ACC1/FFFFFF?text=Cosmic+Drifter' }
    ];

    // =================================================================================
    // ROUTER: Determines which functions to run based on the current page.
    // =================================================================================
    const path = window.location.pathname.split("/").pop();

    if (path === 'index.html' || path === '') {
        renderHomepage();
    } else if (path === 'all-comics.html') {
        renderAllComicsPage();
    } else if (path === 'comic.html') {
        renderComicDetailPage();
    } else if (path === 'chapter.html') {
        renderChapterPage();
    } else if (path === 'genres.html') {
        renderGenresPage();
    }

    // =================================================================================
    // PAGE RENDERING FUNCTIONS
    // =================================================================================

    function renderHomepage() {
        const featuredComic = comicsData.find(c => c.id === 'quantum-ranger');
        const latestUpdates = [...comicsData].sort((a, b) => b.chapters - a.chapters).slice(0, 6);
        const popularComics = [...comicsData].sort((a, b) => a.rank - b.rank).slice(0, 5);

        const featuredSection = document.getElementById('featured-section');
        if (featuredSection && featuredComic) {
            featuredSection.innerHTML = `
                <div class="featured-background" style="background-image: url('${featuredComic.heroArt || featuredComic.cover}');"></div>
                <div class="featured-content">
                    <img src="${featuredComic.cover}" alt="${featuredComic.title} Cover" class="featured-cover">
                    <div class="featured-info">
                        <span class="comic-rank">#${featuredComic.rank} IN ACTION</span>
                        <h1>${featuredComic.title}</h1>
                        <p class="featured-summary">${featuredComic.summary}</p>
                        <div class="featured-tags">${featuredComic.genres.map(g => `<span>${g}</span>`).join('')}</div>
                        <a href="comic.html?id=${featuredComic.id}" class="btn primary-btn">Start Reading Now</a>
                    </div>
                </div>`;
        }
        
        const latestGrid = document.getElementById('latest-updates-grid');
        if(latestGrid) {
            latestGrid.innerHTML = latestUpdates.map(comic => createComicCard(comic)).join('');
        }

        const popularList = document.getElementById('popular-comics-list');
        if (popularList) {
            popularList.innerHTML = popularComics.map(comic => `
                 <a href="comic.html?id=${comic.id}" class="popular-card">
                    <span class="popular-rank">${comic.rank}</span>
                    <img src="${comic.cover}" alt="${comic.title}">
                    <div class="popular-info">
                        <h4>${comic.title}</h4>
                        <p>${comic.genres.slice(0, 2).join(' / ')}</p>
                    </div>
                </a>
            `).join('');
        }
    }

    function renderAllComicsPage() {
        const grid = document.getElementById('all-comics-grid');
        const titleEl = document.getElementById('all-comics-title');
        const searchInput = document.getElementById('search-input-page');
        const searchButton = document.getElementById('search-button-page');
        
        const params = new URLSearchParams(window.location.search);
        const searchQuery = params.get('search') || '';
        const genreQuery = params.get('genre') || '';
        
        if (searchInput) searchInput.value = searchQuery;

        function filterAndRender() {
            const currentSearch = (searchInput ? searchInput.value : searchQuery).toLowerCase().trim();
            let filteredComics = comicsData;

            if (genreQuery) {
                titleEl.textContent = `${genreQuery} Comics`;
                filteredComics = comicsData.filter(comic => 
                    comic.genres.some(g => g.toLowerCase() === genreQuery.toLowerCase())
                );
            } else if (currentSearch) {
                titleEl.textContent = `Search Results for "${currentSearch}"`;
                filteredComics = comicsData.filter(comic => 
                    comic.title.toLowerCase().includes(currentSearch)
                );
            } else {
                titleEl.textContent = 'All Comics';
            }

            if (grid) {
                if (filteredComics.length > 0) {
                    grid.innerHTML = filteredComics.map(comic => createComicCard(comic)).join('');
                } else {
                    grid.innerHTML = `<p>No comics found.</p>`;
                }
            }
        }
        
        filterAndRender();
        
        if(searchButton) searchButton.addEventListener('click', filterAndRender);
        if(searchInput) searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') filterAndRender();
        });
    }

    function renderComicDetailPage() {
        const params = new URLSearchParams(window.location.search);
        const comicId = params.get('id');
        const comic = comicsData.find(c => c.id === comicId);
        const mainContent = document.getElementById('comic-detail-main');

        if (!comic) {
            if (mainContent) mainContent.innerHTML = `<div class="container"><p>Comic not found.</p></div>`;
            return;
        }

        document.title = `${comic.title} - Web-Verse`;

        let chapterListHTML = '';
        for (let i = comic.chapters; i >= 1; i--) {
            chapterListHTML += `<li><a href="chapter.html?id=${comic.id}&chapter=${i}"><span class="chapter-title">Chapter ${i}</span><span class="chapter-date">Some time ago</span></a></li>`;
        }

        if(mainContent) mainContent.innerHTML = `
            <section class="comic-detail-header"><div class="container"><div class="comic-cover"><img src="${comic.cover}" alt="${comic.title} Cover"></div><div class="comic-info"><h1>${comic.title}</h1><div class="info-meta"><span><strong>Author:</strong> ${comic.author}</span><span><strong>Artist:</strong> ${comic.artist}</span><span><strong>Status:</strong> ${comic.status}</span></div><div class="info-genres">${comic.genres.map(g => `<a href="all-comics.html?genre=${g}" class="genre-tag">${g}</a>`).join('')}</div><p class="info-summary"><strong>Summary:</strong> ${comic.summary}</p><div class="info-actions"><a href="chapter.html?id=${comic.id}&chapter=1" class="btn primary-btn">Read First Chapter</a><a href="chapter.html?id=${comic.id}&chapter=${comic.chapters}" class="btn secondary-btn">Read Latest Chapter</a></div></div></div></section>
            <section class="chapter-list-section"><div class="container"><h2>Chapter List</h2><div class="chapter-list-container"><ul class="chapter-list">${chapterListHTML}</ul></div></div></section>
        `;
    }

    function renderChapterPage() {
        const params = new URLSearchParams(window.location.search);
        const comicId = params.get('id');
        const chapterNum = parseInt(params.get('chapter') || '1');
        const comic = comicsData.find(c => c.id === comicId);

        if (!comic) return;

        document.title = `Chapter ${chapterNum} - ${comic.title} - Web-Verse`;

        const comicLink = document.getElementById('reader-comic-link');
        const backLink = document.getElementById('reader-back-link');
        const chapterSelect = document.getElementById('chapter-select');

        if(comicLink) {
            comicLink.textContent = comic.title;
            comicLink.href = `comic.html?id=${comic.id}`;
        }
        if(backLink) backLink.href = `comic.html?id=${comic.id}`;

        if(chapterSelect) {
            let optionsHTML = '';
            for (let i = comic.chapters; i >= 1; i--) {
                optionsHTML += `<option value="${i}" ${i === chapterNum ? 'selected' : ''}>Chapter ${i}</option>`;
            }
            chapterSelect.innerHTML = optionsHTML;
            chapterSelect.addEventListener('change', (e) => {
                window.location.href = `chapter.html?id=${comic.id}&chapter=${e.target.value}`;
            });
        }
    }
    
    function renderGenresPage() {
        const genreGrid = document.getElementById('genre-grid');
        if (!genreGrid) return;

        const allGenres = [...new Set(comicsData.flatMap(comic => comic.genres))];
        allGenres.sort();

        genreGrid.innerHTML = allGenres.map(genre => `
            <a href="all-comics.html?genre=${genre}" class="genre-card">
                <div class="genre-icon">🔥</div>
                <h3 class="genre-name">${genre}</h3>
            </a>
        `).join('');
    }

    // =================================================================================
    // HELPER FUNCTIONS
    // =================================================================================
    function createComicCard(comic) {
        return `
            <a href="comic.html?id=${comic.id}" class="comic-card">
                <div class="card-image">
                    <img src="${comic.cover}" alt="${comic.title}">
                    <div class="overlay">Chapter ${comic.chapters}</div>
                </div>
                <div class="card-body">
                    <h3>${comic.title}</h3>
                </div>
            </a>`;
    }

    // =================================================================================
    // MOBILE MENU TOGGLE
    // =================================================================================
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }
});
