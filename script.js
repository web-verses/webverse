/* script.js */

const comics = [
    { title: "Solo Leveling", ch: "179", img: "https://placehold.co/300x400/2b2b2b/FFF?text=SL" },
    { title: "The Beginning After The End", ch: "175", img: "https://placehold.co/300x400/2b2b2b/FFF?text=TBATE" },
    { title: "Omniscient Reader", ch: "209", img: "https://placehold.co/300x400/2b2b2b/FFF?text=ORV" },
    { title: "Nano Machine", ch: "140", img: "https://placehold.co/300x400/2b2b2b/FFF?text=Nano" },
    { title: "Return of the Mount Hua Sect", ch: "72", img: "https://placehold.co/300x400/2b2b2b/FFF?text=Mt+Hua" },
    { title: "SSS-Class Suicide Hunter", ch: "90", img: "https://placehold.co/300x400/2b2b2b/FFF?text=SSS+Hunter" },
    { title: "Overgeared", ch: "180", img: "https://placehold.co/300x400/2b2b2b/FFF?text=Overgeared" },
    { title: "Tower of God", ch: "550", img: "https://placehold.co/300x400/2b2b2b/FFF?text=TOG" },
];

// Card Template
function getCard(comic) {
    return `
    <div class="card">
        <a href="comic.html">
            <div class="card-img">
                <img src="${comic.img}" alt="${comic.title}">
                <div class="card-overlay">
                    <div class="card-title">${comic.title}</div>
                    <span class="card-chapter">Chapter ${comic.ch}</span>
                </div>
            </div>
        </a>
    </div>
    `;
}

// Render Functions
function render(id, count) {
    const el = document.getElementById(id);
    if (!el) return;
    
    // Duplicate data to fill grid if needed
    const data = count > comics.length 
        ? [...comics, ...comics].slice(0, count) 
        : comics.slice(0, count);

    el.innerHTML = data.map(c => getCard(c)).join('');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    render('latest-grid', 8); // Home
    render('all-grid', 12);   // All Comics
    render('genre-grid', 6);  // Genres
});
