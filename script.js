let allNews = [];

function loadNews() {
  fetch('news.json')
    .then(response => response.json())
    .then(data => {
      allNews = data;
      renderNews(allNews);
    });
}

function renderNews(newsList) {
  const container = document.getElementById("newsContainer");
  container.innerHTML = "";
  newsList.forEach(news => {
    const card = document.createElement("div");
    card.className = `news-card ${news.category}`;
    card.innerHTML = `
      <img src="${news.image}" alt="${news.title}">
      <h2>${news.title}</h2>
      <p>${news.summary}</p>
    `;
    container.appendChild(card);
  });
}

function filterNews(category) {
  if (category === 'all') {
    renderNews(allNews);
  } else {
    const filtered = allNews.filter(n => n.category === category);
    renderNews(filtered);
  }
}

window.onload = loadNews;
