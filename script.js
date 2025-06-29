document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    let count = parseInt(btn.textContent.match(/\d+/)[0]);
    count++;
    btn.textContent = `👍 Like (${count})`;
  });
});

document.querySelectorAll('.comment-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const comment = prompt('अपना कमेंट लिखें:');
    if (comment) alert('धन्यवाद! आपका कमेंट दर्ज हो गया है।');
  });
});

document.querySelector('.newsletter form').addEventListener('submit', e => {
  e.preventDefault();
  alert('धन्यवाद! आपने सब्सक्राइब कर लिया है।');
});
