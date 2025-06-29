// नया कोड (CORS समस्या का समाधान)
const API_KEY = '2498b0305f2e42cc9b8e1c77f52aa738'; // NewsAPI.org से लें
const PROXY_URL = 'https://api.allorigins.win/raw?url='; // नया CORS प्रॉक्सी
const API_URL = `${PROXY_URL}https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;

async function fetchNews(category = 'general') {
    try {
        const response = await fetch(`${API_URL}&category=${category}`);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Error:", error);
        newsContainer.innerHTML = '<p>Failed to load news. Try refreshing.</p>';
    }
}
