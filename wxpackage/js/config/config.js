const all_host = { 
  dev: "",                         // 开发版
  real: "",                         // 仿真环境
  release: "",              // 正式环境
};

const ws_host = {
  dev: "",                         // 开发版
  real: "",                         // 仿真环境
  release: "",
}

const config = {
  mode: 'real',                          // 切换模式
  wsMode: 'dev',
}

export const API_HOST = config['API_HOST'] = all_host[config.mode];
export const WS_HOST = config['WS_HOST'] = ws_host[config.wsMode];;

export default config;
