import MD5 from 'md5';
const appid = '20190608000305728';
const key = 'HCH7HXYi7LFqep5D_fru';
const from = 'zh';
// const to = 'en';
const to = 'kor';

export default function sendTxtToApi(q, successCallback, errorCallback) {
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
  const sendP = urlParams({
    q,
    appid,
    salt,
    from,
    to,
    sign,
  });
  const sendUrl = `https://api.fanyi.baidu.com/api/trans/vip/translate?${sendP}`;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const responseJson = JSON.parse(xhr.responseText);
        const { trans_result } = responseJson;
        successCallback(trans_result[0]);
      } else {
        // HTTP error
        console.log(xhr.status);
        errorCallback();
      }
    }
  }
  xhr.onerror = function () {
    errorCallback();
  }
  xhr.open('GET', sendUrl, true);
  xhr.send();
}