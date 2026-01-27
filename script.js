/* script.js */

// 1. Data for "My Works" (Index Page)
const myComics = [
    { title: "I'm The Strongest One", chapter: "Ch. 3", img: "https://placehold.co/300x450/1a1a1a/ff3b3b?text=Red+Slayer", url: "comic.html" },
    { title: "War For Eternity", chapter: "Ch. 10", img: "images/my-banner.jpg" },
    { title: "Cyber Ronin", chapter: "Ch. 1", img: "https://placehold.co/300x450/1a1a1a/00ff00?text=Ronin", url: "comic.html" },
    { title: "Abyss King", chapter: "Ch. 5", img: "https://placehold.co/300x450/1a1a1a/purple?text=Abyss", url: "comic.html" },
    { title: "Shadowless", chapter: "Ch. 20", img: "https://placehold.co/300x450/1a1a1a/orange?text=Shadow", url: "comic.html" }
];

// 2. Generate Grid Cards
function renderGrid(data, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;

    container.innerHTML = data.map(comic => `
        <div class="card">
            <a href="${comic.url}">
                <div class="card-img-wrapper">
                    <img src="${comic.img}" alt="${comic.title}">
                </div>
                <div class="card-info">
                    <div class="card-title">${comic.title}</div>
                    <div class="card-chap">
                        <span>${comic.chapter}</span>
                        <span>Update</span>
                    </div>
                </div>
            </a>
        </div>
    `).join('');
}

// 3. BOOKMARK LOGIC
function toggleBookmark() {
    const title = document.getElementById('comic-title').innerText;
    const img = document.getElementById('comic-cover').src;
    const url = window.location.href; // Save current page URL

    // Get current library
    let library = JSON.parse(localStorage.getItem('webverse_library')) || [];

    // Check if exists
    const index = library.findIndex(item => item.title === title);

    if (index === -1) {
        // Add to library
        library.push({ title, img, url, chapter: "Saved" });
        localStorage.setItem('webverse_library', JSON.stringify(library));
        updateBtn(true);
    } else {
        // Remove from library
        library.splice(index, 1);
        localStorage.setItem('webverse_library', JSON.stringify(library));
        updateBtn(false);
    }
}

function checkBookmarkStatus(title) {
    let library = JSON.parse(localStorage.getItem('webverse_library')) || [];
    const exists = library.some(item => item.title === title);
    updateBtn(exists);
}

function updateBtn(isSaved) {
    const btn = document.getElementById('bookmark-btn');
    const txt = document.getElementById('btn-text');
    if (!btn) return;

    if (isSaved) {
        btn.style.background = "#ff3b3b"; // Red
        txt.innerText = "Saved in Library";
    } else {
        btn.style.background = "#333"; // Dark
        txt.innerText = "Add to Library";
    }
}

function loadBookmarksPage() {
    let library = JSON.parse(localStorage.getItem('webverse_library')) || [];
    const container = document.getElementById('bookmarks-grid');
    const emptyMsg = document.getElementById('empty-msg');

    if (library.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        renderGrid(library, 'bookmarks-grid');
    }
}

// 4. Initialize Index Page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('comic-grid')) {
        renderGrid(myComics, 'comic-grid');
    }
});
