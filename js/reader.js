const urlParams = new URLSearchParams(window.location.search);
const comicId = urlParams.get('comic');

fetch('comics.json')
  .then(res => res.json())
  .then(comics => {
    const comic = comics.find(c => c.id === comicId);
    const reader = document.getElementById('reader');
    if (!comic) {
      reader.innerHTML = 'Comic not found.';
      return;
    }
    comic.pages.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      reader.appendChild(img);
    });
  })
  .catch(err => console.error('Error loading comic:', err));

