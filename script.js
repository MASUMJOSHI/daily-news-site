const API_KEY = '2498b0305f2e42cc9b8e1c77f52aa738'; // 🔴 यहां अपना REAL API KEY डालें
const newsContainer = document.getElementById('news-container');

// नया CORS Proxy (100% वर्किंग)
const getNews = async (category = 'general') => {
    try {
        const response = await fetch(`https://masum-proxy.herokuapp.com/https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`);
        const data = await response.json();
        
        if(data.articles?.length > 0) {
            displayNews(data.articles);
        } else {
            newsContainer.innerHTML = '<p class="error">No news found. Try another category!</p>';
        }
    } catch (error) {
        newsContainer.innerHTML = '<p class="error">Failed to load news. Please try again later.</p>';
        console.error("NewsAPI Error:", error);
    }
}

function displayNews(articles) {
    newsContainer.innerHTML = articles.map(article => `
        <div class="news-card">
            <h3>${article.title || 'No title available'}</h3>
            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="News Image">` : ''}
            <p>${article.description || 'No description available'}</p>
            <a href="${article.url}" target="_blank">Read Full Article →</a>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    getNews();
    
    // Category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.category-btn.active')?.classList.remove('active');
            btn.classList.add('active');
            getNews(btn.dataset.category);
        });
    });
});
