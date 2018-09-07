import config from '../config/config.js';
import User from './user.js';

export default class Http {
  constructor() {
    this.token = '';
    
  }

  handleMethod(method, url, data) {
    let self = this;
    let header = { 'Content-Type': 'application/json' };
    let options = { header: header };
    let resolveFn = null;
    let rejectFn = null;

    if (/^http[s]?:\/\/.+/.test(url)) {
      options['url'] = url;
    } else {
      options['url'] = config.API_HOST + url;
    }

    if (this._isObj(data)) options['data'] = data;
    else options['data'] = {};

    options['method'] = method.toUpperCase();
    options['success'] = (res) => onSuccess(res, resolveFn);
    options['fail'] = (res) => onFail(res, rejectFn);

    function onSuccess(res) {
      if (res.data && res.data.status == true) {
        resolveFn && resolveFn(res.data);
      } else if (res.data && res.data.status == false && res.data.code == 1101) {
        // 当token失效时，登录获取token后重新发送api请求
        User.login(_request);
      } else {
        rejectFn && rejectFn(res);
      }
    }

    function onFail(err) {
      if (!err) return;
      if (err.data && err.data.msg) {
        wx.showToast({
          title: err.data.msg,
          icon: 'text',
          duration: 1000
        });
      } else if (err.statusCode === 500 || err.statusCode === 501 || err.statusCode === 502) {
        wx.showToast({
          title: '网络超时',
          icon: 'success',
          duration: 1000
        });
      }
      rejectFn && rejectFn(err);
    }

    function _request() {
      if (wx.getStorageSync('bearer-token')) {
        header['Authorization'] = 'Bearer ' + wx.getStorageSync('bearer-token');
        options['header'] = header;
      }
      wx.request(options);
    }

    return new Promise((resolve, reject) => {
      resolveFn = resolve;
      rejectFn = reject;
      _request();
    });
  }

  get(url, data) {
    if (this._isObj(data)) {
      data['_timestamp'] = data['_timestamp'] ? data['_timestamp'] : new Date().getTime();
    } else {
      data = {};
    }
    return this.handleMethod('GET', url, data);
  }
  post(url, data) {
    return this.handleMethod('POST', url, data);
  }

  put(url, data) {
    return this.handleMethod('PUT', url, data);
  }

  delete(url, data) {
    return this.handleMethod('DELETE', url, data);
  }

  request(method, url, data) {
    return this.handleMethod(method, url, data);
  }

  _isObj(obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]'
  }
}





