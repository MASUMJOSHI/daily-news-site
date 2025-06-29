const API_KEY = '2498b0305f2e42cc9b8e1c77f52aa738'; // 🔴 यहाँ अपना API KEY डालें (NewsAPI.org से लें)
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');

// CORS Proxy (अगर NewsAPI सीधे नहीं चल रहा तो)
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const BASE_URL = 'https://newsapi.org/v2/top-headlines?country=in';

async function fetchNews(category = 'general', keyword = '') {
    try {
        const url = `${PROXY_URL}${BASE_URL}&category=${category}&q=${keyword}&apiKey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if(data.articles && data.articles.length > 0) {
            displayNews(data.articles);
        } else {
            newsContainer.innerHTML = '<p>No news found. Try another category!</p>';
        }
    } catch (error) {
        newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
        console.error("Error fetching news:", error);
    }
}

function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <h3>${article.title || 'No title'}</h3>
            <p>${article.description || 'No description available'}</p>
            <a href="${article.url}" target="_blank">Read More →</a>
        `;
        newsContainer.appendChild(newsCard);
    });
}

// Category Buttons Event Listeners
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.category-btn.active').classList.remove('active');
        btn.classList.add('active');
        fetchNews(btn.dataset.category);
    });
});

// Search Functionality
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const activeCategory = document.querySelector('.category-btn.active').dataset.category;
        fetchNews(activeCategory, searchInput.value.trim());
    }
});

// Initial Load
fetchNews();
