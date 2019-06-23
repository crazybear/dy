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

function findDom(id, retry = 1, cb = () => {}) {
  if (retry <= 0 || !retry) {
    cb(null);
  }
  setTimeout(() => {
    const targetNode = document.getElementById(id);
    if (!targetNode) {
      return findDom(id, retry - 1, cb);
    } else {
      cb(targetNode);
    }
  }, 1000);
}

if (/huya\.com/.test(hostname)) {
  const targetNode = document.getElementById('chat-room__list');
  if (targetNode) {
    // insert inject-script
    injectCustomJs('huya.js');
  }
}

if (/douyu\.com/.test(hostname)) {
  findDom('js-barrage-list', 10, (targetNode) => {
    if (targetNode) {
      // insert inject-script
      injectCustomJs('douyu.js');
    }
  });
}