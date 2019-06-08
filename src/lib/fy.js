import MD5 from 'md5';

const appid = '20190608000305728';
const key = 'HCH7HXYi7LFqep5D_fru';
const api = '//api.fanyi.baidu.com/api/trans/vip/translate';
const from = 'zh';
const to = 'en';

function urlParams(data){
  let res = [];
  for(let k in data) {
    res.push(`${k}=${encodeURIComponent(data[k])}`);
  }
  return res.join('&');
}

export default function (q, successCallback) {
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
}