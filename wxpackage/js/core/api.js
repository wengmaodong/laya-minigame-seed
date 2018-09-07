 import Http from './http.js';
 let http = new Http();

const common = {

  // 登录相关
  login: params => http.post('/users/login', params),

};

export default {
  common: common
}