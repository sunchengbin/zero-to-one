class UtilClass {
  sleep(s) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('promise resolved')
      }, s * 1000)
    })
  }

  getParamByUrl(url) {
    let paramObj = {};
    if (~url.indexOf('?')) {
      var params = url.substr(url.indexOf('?') + 1);
      params = params.split('&');
      for (var i = 0; i < params.length; i++) {
        var kv = params[i].split('=');
        paramObj[kv[0]] = kv[1];
      }
    }
    return paramObj;
  }

  getUrlPrem(key, url) {
    const _search = url
    const _pattern = new RegExp(`[?&]${key}=([^&]+|\\w+)`, 'g')
    const _matcher = _pattern.exec(_search)
    let _items = null
    if (_matcher !== null) {
      try {
        _items = decodeURIComponent(decodeURIComponent(_matcher[1]))
      } catch (e) {
        try {
          _items = decodeURIComponent(_matcher[1])
        } catch (e) {
          _items = _matcher[1]
        }
      }
    }
    return _items
  }

  LCS(a, b) {
    let obj = {}
    let str = []
    let newStr = []
    let index = 0
    let array = new Array(a.length > b.length ? b.length : a.length)
    for (let i = 0; i < array.length; i++) {
      array[i] = new Array(array.length)
      for (let j = 0; j < array.length; j++) {
        array[i][j] = 0
        if (a[i] == b[j]) {
          array[i][j] = 1
          if (a[i + 1] && b[j + 1] && a[i + 1] == b[j + 1]) {
            index++
            str.push(a[i] + a[i + 1])
          }
        }
      }
    }
    str = str.join("")
    for (let u = 0; u < str.length; u++) {
      if (newStr.indexOf(str[u]) < 0) {
        newStr.push(str[u])
      }
    }
    obj.num = index
    obj.arr = str
    obj.str = newStr.join("")
    obj.percent = obj.str.length / a.length
    return obj
  }

  dateFormat(format, date) {
    if (!(date instanceof Date)) {
      date = new Date(date)
    }
    if (date == 'Invalid Date') {
      return '';
    }
    var o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  }

  randomCommon(min, max, count) {
    let integers = [];
    if (min < 0) {
      min = 0;
    }
    if ((max - min) + 1 < count) {
      count = (max - min) + 1;
    }
    if (max < min) {
      max = min;
    }
    if (max < 0 || count < 0) {
      return integers;
    }
    for (let i = 1; i <= count; i++) {
      let randomNumber = Math.round(Math.random() * (max - min) + min);
      if (~integers.indexOf(randomNumber)) {
        i--;
      } else {
        integers.push(randomNumber);
      }
    }
    return integers;
  }
}
let Util = new UtilClass()
export {
  Util
}



