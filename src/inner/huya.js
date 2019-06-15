import translate from '../lib/translate';

function translateNode(node, hasSrc = false) {
  const text = node.text().trim();
  if (text) {
    translate(text).then(response => {
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
  const nameNode = _node.find('.name');
  const msgNode = _node.find('.msg');
  translateNode(nameNode, true);
  translateNode(msgNode);
}

function observeChatList() {
  const targetNode = document.getElementById('chat-room__list');
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
  })
  observe.observe(targetNode, config);
  return observe;
}

function insertCtrBtn(){
  const container = $('body');
  let html = [
    '<ul style="position:absolute; right:0; top:0; padding:10px; width:100px; z-index:2000; ">',
    '<li class="master" style="height:30px; margin-bottom:10px; line-height:30px; color:#FFF; background-color:#ff8700; border-radius: 30px; text-align:center; cursor:pointer;">FULL</li>',
    '<li class="translate" style="height:30px; line-height:30px; color:#FFF; background-color:#ff8700; border-radius: 30px; text-align:center; cursor:pointer;">OPEN 한담하다</li>',
    '</ul>',
  ].join('');
  html = $(html);
  //J_playerMain
  html.find('.master').on('click', function(){
    $("#J_playerMain").remove();
    $('#chatRoom, #watchChat_pub, .room-core .room-core-r').css('width', '100%');
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
