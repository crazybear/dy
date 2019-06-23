import translate from '../lib/translate';
import $ from 'jquery';


function translateNode(node, hasSrc = false) {
  if (!node) {
    return false;
  }
  const text = node.text().trim();
  if (/赠送给主播/.test(text)) {
    // 送礼的～不翻译
    return false;
  }
  if (text) {
    translate(text, $).then(response => {
      // console.log(text, node, response);
      const { trans_result } = response;
      node.text(`${trans_result[0].dst}${hasSrc ? ` (${trans_result[0].src})` : ''}`);
    }).catch(e => {
      console.log('translate error', e);
    });
  }
}

function translateChatItem(node) {
  const _node = $(node);
  const nameNode = _node.find('.Barrage-nickName');
  const msgNode = _node.find('.Barrage-content');
  const textNode = _node.find('.Barrage-text');
  const combo = _node.find('.Barrage-message--red');
  translateNode(nameNode, true);
  translateNode(msgNode);
  translateNode(textNode);
  translateNode(combo);
}

function observeChatList(){
  const targetNode = document.getElementById('js-barrage-list');
  const config = { childList: true, subtree: false };
  const observe = new MutationObserver(function(mutations, observer){
    mutations.forEach((m) => {
      if(m.type === 'childList') {
        if(m.addedNodes) {
          m.addedNodes.forEach(node => {
            if (node.children[0]){
              translateChatItem(node);
            }
          });
        }
      }
    });
  });
  const bannerNode = $('#js-player-barrage .BarrageBanner');
  const bannerObserve = new MutationObserver(function(mutations, observer){
    mutations.forEach((m) => {
      if(m.type === 'childList') {
        if(m.addedNodes) {
          m.addedNodes.forEach(node => {
            const _node = $(node);
            const _name = _node.find('.BannerMarquee-cont');
            translateNode(_name[0]);
          });
        }
      }
    });
  });
  const res = {};
  res.disconnect = () => {
    observe.disconnect();
  };
  bannerObserve.observe(bannerNode[0], config);
  observe.observe(targetNode, config);
  return res;
}

function insertCtrBtn(){
  const container = $('body');
  let html = [
    '<ul style="position:fixed; right:0; top:0; padding:10px; width:100px; z-index:2000; ">',
    '<li class="master" style="height:30px; margin-bottom:10px; line-height:30px; color:#FFF; background-color:#ff8700; border-radius: 30px; text-align:center; cursor:pointer;">FULL</li>',
    '<li class="translate" style="height:30px; line-height:30px; color:#FFF; background-color:#ff8700; border-radius: 30px; text-align:center; cursor:pointer;">OPEN 한담하다</li>',
    '</ul>',
  ].join('');
  html = $(html);
  //J_playerMain
  html.find('.master').on('click', function(){
    $(".layout-Player-aside").css('width', '100%');
    $('.layout-Player-video').empty();
  });
  html.find('.translate').on('click', function(){
    const btn = $(this);
    if (btn.data('_data_observe')) {
      btn.data('_data_observe').disconnect();
      btn.data('_data_observe', null);
      btn.html('OPEN 한담하다');
    } else {
      let observe = observeChatList();
      btn.data('_data_observe', observe);
      btn.html('CLOSE 한담하다');
    }
   
  });
  container.append(html);
}

insertCtrBtn();
