var targetNode = document.getElementById('chat-room__list');
var config = { childList: true, subtree: false };

var observe = new MutationObserver(function(mutations, observer){
  mutations.forEach((m) => {
    if(m.type === 'childList') {
      if(m.addedNodes) {
        m.addedNodes.forEach(node => {
          if (node.children[0]){
            node.children[0].style.backgroundColor = '#F00';
          }
        });
      }
    }
  });
})

observe.observe(targetNode, config);