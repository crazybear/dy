import $ from 'jquery';
import LOG from '../lib/logger';
import EventEmitter from '../lib/eventEmitter';


LOG('content run');

const t_key = '__TRANS_TAG';
const backgroundMessage = new EventEmitter();
backgroundMessage.send = (message, data = {}) => {
  console.log('send Message:', message, data);
  if (backgroundMessage.port) {
    backgroundMessage.port.postMessage({ message, data})
  }
}
backgroundMessage.sendRequest = (name, data, callback) => {
  const _sid = `${name}_${new Date().getTime()}`;
  backgroundMessage.send(name, {
    data,
    _sid,
  });
  const handler = (data) => {
    if (data._sid === _sid) {
      callback(data.data);
      backgroundMessage.off(handler);
    }
  };
  backgroundMessage.on(`${name}_response`, handler);
}

let hasSetChatList = false;
function setChatList() {
  if (hasSetChatList) {
    alert('已经绑定过了');
    return false;
  }
  const chatList = $('#chat-room__list');
  chatList.on('mouseenter', '.msg', function(){
    const messageElement = $(this);
    if (!messageElement.data(t_key)) {
      const text = messageElement.text();
      messageElement.css({
        backgroundColor: 'rgb(51, 103, 214)',
      });
      LOG('[Chat Msg]',text);
      if (!text) {
        return false;
      }
      backgroundMessage.sendRequest('fy', { text }, response => {
        messageElement.css({
          backgroundColor: 'transparent',
        });
        const {src, dst} = response;
        messageElement.data(t_key, {src, dst});
        messageElement.text(dst);
      });
    } else {
      LOG('翻译过了', messageElement.data(t_key));
    }
  });
  hasSetChatList = true;
  alert('绑定聊天成功！');
}

let hasSetDamuList = false;
function setDanmuList() {
  if (hasSetDamuList) {
    alert('已经绑定过了');
    return false;
  }
  const dmList = $('#danmudiv');
  dmList.on('mouseenter', '.danmu-item', function(){
    const messageElement = $(this);
    if (!messageElement.data(t_key)) {
      const text = messageElement.find('span').text();
      messageElement.css({
        backgroundColor: 'rgb(51, 103, 214)',
      });
      LOG('[Damu Msg]',text);
      if (!text) {
        return false;
      }
      backgroundMessage.sendRequest('fy', { text }, response => {
        messageElement.css({
          backgroundColor: 'transparent',
        });
        const {src, dst} = response;
        messageElement.data(t_key, {src, dst});
        messageElement.find('span').text(dst);
      });
    } else {
      LOG('翻译过了', messageElement.data(t_key));
    }
  }); 
  hasSetDamuList = true;
  alert('绑定弹幕成功！');
}

backgroundMessage.on('bindChat', () => {
  setChatList();
});

backgroundMessage.on('bindDanmu', () => {
  setDanmuList();
});

backgroundMessage.port = chrome.runtime.connect({name: 'content-script'});

console.log(backgroundMessage.port);

backgroundMessage.port.onMessage.addListener(msg => {
  const { message, data } = msg;
  LOG('[onMessage]', message, data);
  backgroundMessage.emit(message, data);
})

