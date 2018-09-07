import Api from './api.js';
let instance;

class User {
  constructor() {
    if (instance) return instance;

    this.token = '';
    this.isLogin = false;
    this.userInfo = null;
    this.isSetInfo = false;
    this.loginSuccessCbs = [];

    instance = this;
    this.init();
  }

  init() {
    let token = wx.getStorageSync('bearer-token');
    if (token) {
      this.token = token;
      this.isLogin = true;
    } else {
      // this.login();
    }
  }

  getCode(cb) {
    wx.login({
      success: res => {
        let code = res.code;
        cb && cb(code);
      }
    });
  }

  loginSuccess() {

    let i = this.loginSuccessCbs.length;
    while (i--) {
      // 执行请求
      let cb = this.loginSuccessCbs.pop();
      try {
        // 重新发送请求时是不带参数的，可以传入用户信息
        cb();
      } catch (e) {
        console.log('Error on ' + cb.name + ' : ' + e);
      }
    }
  }

  login(request) {
    typeof request === 'function' && this.loginSuccessCbs.push(request);

    this.getCode((code) => {
      Api.common.login({
        code: code
      }).then(res => {
        wx.setStorageSync('bearer-token', res.data);
        this.token = res.data;
        this.isLogin = true;

        this.loginSuccess();
      }, res => {
        console.log(res);
      })
    });
  }

  // 获取用户信息
  getUserInfo(cb) {
    Api.common.getinfo().then(res => {
      cb && cb(res);
    })
  }

  //
  runWhenLogin(cb) {
    if (this.isLogin) {
      cb && cb();
    } else {
      this.login(cb);
    }
  }

  checkLogin() {
    return this.isLogin;
  }

  checkIsSetInfo() {
    return this.isLogin && this.isSetInfo;
  }

  // 给匿名用户设置信息
  setInfo(cb) {
    this.getSetting().then(() => {
      wx.getUserInfo({
        success: (res) => {
          this._setInfo(res, cb);
        }
      });
    }, () => {
      this.createButton((res, button) => {
        this._setInfo(res, cb, button);
      });
    });
  }

  _setInfo(res, cb, button) {
    Api.common.setinfo(res.userInfo).then(() => {
      this.isSetInfo = true;
      button && button.destroy();
      cb && cb();
      // wx.hideLoading();
    })
  }

  createButton(cb) {
    let {windowWidth, windowHeight} = wx.getSystemInfoSync();

    let button = wx.createUserInfoButton({
      type: 'text',
      text: '点击同步游戏数据',
      style: {
        left: 0.5 * windowWidth - 0.5 * 200,
        top: 0.5 * windowHeight - 0.5 * 40,
        width: 200,
        height: 40,
        lineHeight: 40,
        backgroundColor: '#48af49',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        borderRadius: 4
      }
    });
    button.onTap((res) => {
      // console.log(res);
      cb && cb(res, button);
    });

  }

  getSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          // console.log(res);
          if (res.authSetting['scope.userInfo']) {
            resolve();
          } else {
            reject();
          }
        },
        fail: () => {
          reject();
        }
      });
    });
  }

}

export default new User();