!function(n){var t={};function r(e){if(t[e])return t[e].exports;var o=t[e]={i:e,l:!1,exports:{}};return n[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:e})},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.t=function(n,t){if(1&t&&(n=r(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)r.d(e,o,function(t){return n[t]}.bind(null,o));return e},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="",r(r.s=8)}([function(n,t,r){"use strict";function e(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}var o=function(){function n(){!function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.__EVENTS={}}var t,r,o;return t=n,(r=[{key:"on",value:function(n,t){this.__EVENTS[n]||(this.__EVENTS[n]=[]),this.__EVENTS[n].push(t)}},{key:"once",value:function(n,t){var r=this;this.on(n,function e(){r.off(n,e);for(var o=arguments.length,i=new Array(o),u=0;u<o;u++)i[u]=arguments[u];t.apply(r,i)})}},{key:"off",value:function(n,t){var r=this,e=this.__EVENTS[n],o=function(){delete r.__EVENTS[n]};e&&(t?0===(e=e.filter(function(n){if(n!==t)return n})).length?(this.__EVENTS[n]=[],o()):this.__EVENTS[n]=e:o())}},{key:"emit",value:function(n){for(var t=this,r=arguments.length,e=new Array(r>1?r-1:0),o=1;o<r;o++)e[o-1]=arguments[o];var i=this.__EVENTS[n];i&&i.length>0&&i.forEach(function(n){n.apply(t,e)})}}])&&e(t.prototype,r),o&&e(t,o),n}();t.a=o},,function(n,t){var r={utf8:{stringToBytes:function(n){return r.bin.stringToBytes(unescape(encodeURIComponent(n)))},bytesToString:function(n){return decodeURIComponent(escape(r.bin.bytesToString(n)))}},bin:{stringToBytes:function(n){for(var t=[],r=0;r<n.length;r++)t.push(255&n.charCodeAt(r));return t},bytesToString:function(n){for(var t=[],r=0;r<n.length;r++)t.push(String.fromCharCode(n[r]));return t.join("")}}};n.exports=r},function(n,t,r){var e,o,i,u,a;e=r(4),o=r(2).utf8,i=r(5),u=r(2).bin,(a=function(n,t){n.constructor==String?n=t&&"binary"===t.encoding?u.stringToBytes(n):o.stringToBytes(n):i(n)?n=Array.prototype.slice.call(n,0):Array.isArray(n)||(n=n.toString());for(var r=e.bytesToWords(n),s=8*n.length,f=1732584193,c=-271733879,l=-1732584194,p=271733878,h=0;h<r.length;h++)r[h]=16711935&(r[h]<<8|r[h]>>>24)|4278255360&(r[h]<<24|r[h]>>>8);r[s>>>5]|=128<<s%32,r[14+(s+64>>>9<<4)]=s;var d=a._ff,g=a._gg,v=a._hh,y=a._ii;for(h=0;h<r.length;h+=16){var b=f,_=c,T=l,m=p;f=d(f,c,l,p,r[h+0],7,-680876936),p=d(p,f,c,l,r[h+1],12,-389564586),l=d(l,p,f,c,r[h+2],17,606105819),c=d(c,l,p,f,r[h+3],22,-1044525330),f=d(f,c,l,p,r[h+4],7,-176418897),p=d(p,f,c,l,r[h+5],12,1200080426),l=d(l,p,f,c,r[h+6],17,-1473231341),c=d(c,l,p,f,r[h+7],22,-45705983),f=d(f,c,l,p,r[h+8],7,1770035416),p=d(p,f,c,l,r[h+9],12,-1958414417),l=d(l,p,f,c,r[h+10],17,-42063),c=d(c,l,p,f,r[h+11],22,-1990404162),f=d(f,c,l,p,r[h+12],7,1804603682),p=d(p,f,c,l,r[h+13],12,-40341101),l=d(l,p,f,c,r[h+14],17,-1502002290),f=g(f,c=d(c,l,p,f,r[h+15],22,1236535329),l,p,r[h+1],5,-165796510),p=g(p,f,c,l,r[h+6],9,-1069501632),l=g(l,p,f,c,r[h+11],14,643717713),c=g(c,l,p,f,r[h+0],20,-373897302),f=g(f,c,l,p,r[h+5],5,-701558691),p=g(p,f,c,l,r[h+10],9,38016083),l=g(l,p,f,c,r[h+15],14,-660478335),c=g(c,l,p,f,r[h+4],20,-405537848),f=g(f,c,l,p,r[h+9],5,568446438),p=g(p,f,c,l,r[h+14],9,-1019803690),l=g(l,p,f,c,r[h+3],14,-187363961),c=g(c,l,p,f,r[h+8],20,1163531501),f=g(f,c,l,p,r[h+13],5,-1444681467),p=g(p,f,c,l,r[h+2],9,-51403784),l=g(l,p,f,c,r[h+7],14,1735328473),f=v(f,c=g(c,l,p,f,r[h+12],20,-1926607734),l,p,r[h+5],4,-378558),p=v(p,f,c,l,r[h+8],11,-2022574463),l=v(l,p,f,c,r[h+11],16,1839030562),c=v(c,l,p,f,r[h+14],23,-35309556),f=v(f,c,l,p,r[h+1],4,-1530992060),p=v(p,f,c,l,r[h+4],11,1272893353),l=v(l,p,f,c,r[h+7],16,-155497632),c=v(c,l,p,f,r[h+10],23,-1094730640),f=v(f,c,l,p,r[h+13],4,681279174),p=v(p,f,c,l,r[h+0],11,-358537222),l=v(l,p,f,c,r[h+3],16,-722521979),c=v(c,l,p,f,r[h+6],23,76029189),f=v(f,c,l,p,r[h+9],4,-640364487),p=v(p,f,c,l,r[h+12],11,-421815835),l=v(l,p,f,c,r[h+15],16,530742520),f=y(f,c=v(c,l,p,f,r[h+2],23,-995338651),l,p,r[h+0],6,-198630844),p=y(p,f,c,l,r[h+7],10,1126891415),l=y(l,p,f,c,r[h+14],15,-1416354905),c=y(c,l,p,f,r[h+5],21,-57434055),f=y(f,c,l,p,r[h+12],6,1700485571),p=y(p,f,c,l,r[h+3],10,-1894986606),l=y(l,p,f,c,r[h+10],15,-1051523),c=y(c,l,p,f,r[h+1],21,-2054922799),f=y(f,c,l,p,r[h+8],6,1873313359),p=y(p,f,c,l,r[h+15],10,-30611744),l=y(l,p,f,c,r[h+6],15,-1560198380),c=y(c,l,p,f,r[h+13],21,1309151649),f=y(f,c,l,p,r[h+4],6,-145523070),p=y(p,f,c,l,r[h+11],10,-1120210379),l=y(l,p,f,c,r[h+2],15,718787259),c=y(c,l,p,f,r[h+9],21,-343485551),f=f+b>>>0,c=c+_>>>0,l=l+T>>>0,p=p+m>>>0}return e.endian([f,c,l,p])})._ff=function(n,t,r,e,o,i,u){var a=n+(t&r|~t&e)+(o>>>0)+u;return(a<<i|a>>>32-i)+t},a._gg=function(n,t,r,e,o,i,u){var a=n+(t&e|r&~e)+(o>>>0)+u;return(a<<i|a>>>32-i)+t},a._hh=function(n,t,r,e,o,i,u){var a=n+(t^r^e)+(o>>>0)+u;return(a<<i|a>>>32-i)+t},a._ii=function(n,t,r,e,o,i,u){var a=n+(r^(t|~e))+(o>>>0)+u;return(a<<i|a>>>32-i)+t},a._blocksize=16,a._digestsize=16,n.exports=function(n,t){if(null==n)throw new Error("Illegal argument "+n);var r=e.wordsToBytes(a(n,t));return t&&t.asBytes?r:t&&t.asString?u.bytesToString(r):e.bytesToHex(r)}},function(n,t){var r,e;r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",e={rotl:function(n,t){return n<<t|n>>>32-t},rotr:function(n,t){return n<<32-t|n>>>t},endian:function(n){if(n.constructor==Number)return 16711935&e.rotl(n,8)|4278255360&e.rotl(n,24);for(var t=0;t<n.length;t++)n[t]=e.endian(n[t]);return n},randomBytes:function(n){for(var t=[];n>0;n--)t.push(Math.floor(256*Math.random()));return t},bytesToWords:function(n){for(var t=[],r=0,e=0;r<n.length;r++,e+=8)t[e>>>5]|=n[r]<<24-e%32;return t},wordsToBytes:function(n){for(var t=[],r=0;r<32*n.length;r+=8)t.push(n[r>>>5]>>>24-r%32&255);return t},bytesToHex:function(n){for(var t=[],r=0;r<n.length;r++)t.push((n[r]>>>4).toString(16)),t.push((15&n[r]).toString(16));return t.join("")},hexToBytes:function(n){for(var t=[],r=0;r<n.length;r+=2)t.push(parseInt(n.substr(r,2),16));return t},bytesToBase64:function(n){for(var t=[],e=0;e<n.length;e+=3)for(var o=n[e]<<16|n[e+1]<<8|n[e+2],i=0;i<4;i++)8*e+6*i<=8*n.length?t.push(r.charAt(o>>>6*(3-i)&63)):t.push("=");return t.join("")},base64ToBytes:function(n){n=n.replace(/[^A-Z0-9+\/]/gi,"");for(var t=[],e=0,o=0;e<n.length;o=++e%4)0!=o&&t.push((r.indexOf(n.charAt(e-1))&Math.pow(2,-2*o+8)-1)<<2*o|r.indexOf(n.charAt(e))>>>6-2*o);return t}},n.exports=e},function(n,t){function r(n){return!!n.constructor&&"function"==typeof n.constructor.isBuffer&&n.constructor.isBuffer(n)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
n.exports=function(n){return null!=n&&(r(n)||function(n){return"function"==typeof n.readFloatLE&&"function"==typeof n.slice&&r(n.slice(0,0))}(n)||!!n._isBuffer)}},,,function(n,t,r){"use strict";r.r(t);var e=r(0),o=r(3),i=r.n(o),u="20190608000305728",a="HCH7HXYi7LFqep5D_fru",s="zh",f="kor";var c=new e.a;c.send=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};console.log("send Message:",n,t),c.port&&c.port.postMessage({message:n,data:t})},window.runChat=function(){c.send("bindChat")},window.runDanmu=function(){c.send("bindDanmu")},c.on("fy",function(n){var t=n.data,r=n._sid;!function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},e=(new Date).getTime(),o=u+n+e+a,c=i()(o),l=function(n){var t=[];for(var r in n)t.push("".concat(r,"=").concat(encodeURIComponent(n[r])));return t.join("&")}({q:n,appid:u,salt:e,from:s,to:f,sign:c}),p="https://api.fanyi.baidu.com/api/trans/vip/translate?".concat(l),h=new XMLHttpRequest;h.onreadystatechange=function(){if(4===h.readyState)if(200===h.status){var n=JSON.parse(h.responseText).trans_result;t(n[0])}else console.log(h.status),r()},h.onerror=function(){r()},h.open("GET",p,!0),h.send()}(t.text,function(n){c.send("fy_response",{data:n,_sid:r})})}),chrome.runtime.onConnect.addListener(function(n){console.log(n),"content-script"==n.name&&(c.port&&c.port.disconnect(),c.port=n,n.onMessage.addListener(function(n){var t=n.message,r=n.data;console.log("content-script msg:",t,r),c.emit(t,r)}))})}]);