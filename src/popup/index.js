const chatBtn = document.getElementById('chatBtn');
const danmuBtn = document.getElementById('danmuBtn');
const bg = chrome.extension.getBackgroundPage();
chatBtn.addEventListener('click', () => {
  bg.runChat();
});
danmuBtn.addEventListener('click', () => {
  bg.runDanmu();
});