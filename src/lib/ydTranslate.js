var sha256 = require('js-sha256').sha256;
const appid = '60e2a410bd8b2821';
const key = 'pypzNGvtf8HVJ0CUwqkvOmnCClOM2DkK';
const from = 'zh-CHS';
const to = 'ko';


const trans_cache = {};

function getInput(input){
	if (input.length == 0) {
		return null;
	}
	let result;
	let len = input.length;
	if(len <= 20){
		result = input;
	}else{
		let startStr = input.substring(0,10);
		let endStr = input.substring(len-10,len);
		result = startStr + len +endStr;
	}
	return result;

}

export default function sendTxtToApi(q, $ = window.$, retry = 0) {
  const salt = new Date().getTime();
  const curtime = Math.round(new Date().getTime()/1000);
  const str1 = appid + getInput(q) + salt + curtime + key;
  const sign = sha256(str1);
  const sendP = {
    q,
    appKey: appid,
    salt,
    from,
    to,
    curtime,
    signType: 'v3',
    sign,
  };

  if ($ && $.ajax) {
    // 走jquery
    return new Promise((resolve, reject) => {
      if (trans_cache[q]) {
        // 走缓存
        resolve(trans_cache[q]);
      } else {
        $.ajax({
          url: '//openapi.youdao.com/api',
          type: 'get',
          dataType: 'jsonp',
          timeout: 3000,
          data: sendP,
          success(response){
            if (response.errorCode == '0') {
              if (response.translation) {
                response.trans_result = [];
                response.trans_result.push({
                  dst: response.translation[0],
                  src: q,
                })
                // 缓存
                response.trans_result.forEach((item) => {
                  trans_cache[item.src] = response;
                });
              }
              resolve(response);
            } else {
              if (retry < 1) {
                resolve(sendTxtToApi(q, $, retry + 1));
              } else {
                reject();
              }
            }
          },
          error() {
            if (retry < 1) {
              resolve(sendTxtToApi(q, $, retry + 1));
            } else {
              reject();
            }
          }
        });
      }
      
    });
  }
}