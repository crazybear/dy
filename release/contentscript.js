!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}({6:function(e,t){var n=window.location.host;function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"js/inject.js",t=document.createElement("script"),n=chrome.extension.getURL(e);console.log("inject",n),t.setAttribute("type","text/javascript"),t.src=n,document.body.appendChild(t)}/huya\.com/.test(n)&&(document.getElementById("chat-room__list")&&o("huya.js"));/douyu\.com/.test(n)&&function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};(n<=0||!n)&&o(null),setTimeout(function(){var r=document.getElementById(t);if(!r)return e(t,n-1,o);o(r)},1e3)}("js-barrage-list",10,function(e){e&&o("douyu.js")})}});