const hostname = window.location.host;

function injectCustomJs(jsPath = 'js/inject.js') {
  const temp = document.createElement('script');
  const src = chrome.extension.getURL(jsPath);
  console.log('inject', src);
  temp.setAttribute('type', 'text/javascript');
  temp.src = src;
  // temp.onload = function(){
  //     this.parentNode.removeChild(this);
  // };
  document.body.appendChild(temp);
}


if (/huya\.com/.test(hostname)) {
  const targetNode = document.getElementById('chat-room__list');
  if (targetNode) {
    // insert inject-script
    injectCustomJs('huya.js');
  }
}