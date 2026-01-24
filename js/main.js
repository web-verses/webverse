// Load comics from comics.json
fetch('comics.json')
  .then(res => res.json())
  .then(comics => {
    const list = document.getElementById('comic-list');
    comics.forEach(comic => {
      const card = document.createElement('div');
      card.className = 'comic-card';
      card.innerHTML = `
        <img src="${comic.cover}" alt="${comic.title}">
        <h3>${comic.title}</h3>
      `;
      card.onclick = () => {
        window.location.href = `reader.html?comic=${comic.id}`;
      };
      list.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading comics:', err));

