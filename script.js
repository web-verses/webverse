document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mock Data for Chapters ---
    // In a real application, you would fetch this from a server/database.
    const totalChapters = 72;
    
    // Function to generate chapter list items
    function generateChapterList() {
        const chapterList = document.getElementById('chapter-list');
        if (!chapterList) return; // Only run if the chapter list exists on the page

        let listHTML = '';
        for (let i = totalChapters; i >= 1; i--) {
            // Simulate a release date
            const date = new Date();
            date.setDate(date.getDate() - (totalChapters - i) * 3); // Approx. release every 3 days
            const dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            listHTML += `
                <li>
                    <a href="chapter.html">
                        <span class="chapter-title">Chapter ${i}</span>
                        <span class="chapter-date">${dateString}</span>
                    </a>
                </li>
            `;
        }
        chapterList.innerHTML = listHTML;
    }

    // Function to populate the chapter dropdown on the reader page
    function populateChapterDropdown() {
        const chapterSelect = document.getElementById('chapter-select');
        if (!chapterSelect) return; // Only run if the dropdown exists

        let optionsHTML = '';
        for (let i = totalChapters; i >= 1; i--) {
            // Assume we are on Chapter 1 for this example
            const isSelected = i === 1 ? 'selected' : '';
            optionsHTML += `<option value="${i}" ${isSelected}>Chapter ${i}</option>`;
        }
        chapterSelect.innerHTML = optionsHTML;
    }

    // --- Run the functions ---
    generateChapterList();
    populateChapterDropdown();

});
