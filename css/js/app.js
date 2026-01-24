let currentSeries = "";

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goHome() {
  showPage("home");
}

function openSeries(series) {
  currentSeries = series;
  showPage("series");

  if (series === "strongest") {
    seriesTitle.textContent = "I'm The Strongest One";
    seriesGenre.textContent = "Superhero • Action";
  } else {
    seriesTitle.textContent = "War for Eternity";
    seriesGenre.textContent = "Action • Crime";
  }
}

function goSeries() {
  showPage("series");
}

function openChapter(num) {
  showPage("reader");
  chapterTitle.textContent = `Chapter ${num}`;
}

function scrollToComics() {
  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
}

