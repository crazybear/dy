import MD5 from 'md5';
const appid = '20190615000307699';
const key = 'Q4TkL1C8ScCNC2cv964T';
const from = 'zh';
// const to = 'en';
const to = 'kor';

const trans_cache = {};

export default function sendTxtToApi(q) {
  function urlParams(data) {
    let res = [];
    for (let k in data) {
      res.push(`${k}=${encodeURIComponent(data[k])}`);
    }
    return res.join('&');
  }
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
            reject();
          }
        });
      }
      
    });
  }
  // const sendUrl = `https://api.fanyi.baidu.com/api/trans/vip/translate?${sendP}`;
  // const xhr = new XMLHttpRequest();
  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState === 4) {
  //     if (xhr.status === 200) {
  //       const responseJson = JSON.parse(xhr.responseText);
  //       const { trans_result } = responseJson;
  //       successCallback(trans_result[0]);
  //     } else {
  //       // HTTP error
  //       console.log(xhr.status);
  //       errorCallback();
  //     }
  //   }
  // }
  // xhr.onerror = function () {
  //   errorCallback();
  // }
  // xhr.open('GET', sendUrl, true);
  // xhr.send();
}