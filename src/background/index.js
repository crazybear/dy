import EventEmitter from '../lib/eventEmitter';
import translate from './translate';
const contentScriptConnect = new EventEmitter();
contentScriptConnect.send = function(message, data = {}) {
  console.log('send Message:', message, data);
  if(contentScriptConnect.port) {
    contentScriptConnect.port.postMessage({message, data});
  }
};


window.runChat = function() {
  contentScriptConnect.send('bindChat');
}
window.runDanmu = function(){
  contentScriptConnect.send('bindDanmu');
}

contentScriptConnect.on('fy', msg => {
  const { data, _sid } = msg;
  const { text } = data;
  translate(text, res => {
    contentScriptConnect.send('fy_response', {
      data: res,
      _sid,
    })
  });
});


// 监听长连接
chrome.runtime.onConnect.addListener(function (port) {
  console.log(port);
  if (port.name == 'content-script') {
    if (contentScriptConnect.port) {
      contentScriptConnect.port.disconnect();
    }
    contentScriptConnect.port = port;
    port.onMessage.addListener((msg) => {
      const { message, data } = msg;
      console.log('content-script msg:', message, data);
      contentScriptConnect.emit(message, data);
    });
  }
});

