import MD5 from 'md5';
const appid = '20190615000307699';
const key = 'Q4TkL1C8ScCNC2cv964T';
const from = 'zh';
// const to = 'en';
const to = 'kor';

const trans_cache = {};

export default function sendTxtToApi(q, $ = window.$, retry = 0) {
  const salt = new Date().getTime();
  const str1 = appid + q + salt + key;
  const sign = MD5(str1);
  const sendP = {
    q,
    appid,
    salt,
    from,
    to,
    sign,
  };

  if ($ && $.ajax) {
    // 走jquery
    return new Promise((resolve, reject) => {
      if (trans_cache[q]) {
        // 走缓存
        // console.log('走缓存')
        resolve(trans_cache[q]);
      } else {
        $.ajax({
          url: '//api.fanyi.baidu.com/api/trans/vip/translate',
          type: 'get',
          dataType: 'jsonp',
          timeout: 3000,
          data: sendP,
          success(response){
            resolve(response);
            if (response.trans_result) {
              response.trans_result.forEach((item) => {
                trans_cache[item.src] = response;
              });
            }
          },
          error() {
            if (retry < 1) {
              console.log('retry!', q);
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