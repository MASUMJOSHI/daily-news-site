const API_KEY = '2498b0305f2e42cc9b8e1c77f52aa738'; // NewsAPI.org से फ्री API KEY लो (नीचे स्टेप 3 देखो)
const newsContainer = document.getElementById('news-container');

async function fetchNews(category = 'general') {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`);
    const data = await response.json();
    displayNews(data.articles);
}

function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || 'No description'}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(newsCard);
    });
}

// कैटेगरी बटन्स के लिए इवेंट लिस्नर
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => fetchNews(btn.dataset.category));
});

// पहली बार लोड होने पर जनरल न्यूज दिखाओ
fetchNews();
