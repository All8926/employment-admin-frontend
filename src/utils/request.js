import Axios from 'axios';

import { load } from '@/lib/loadingPlugin.js';


let loadingCounter = 0;

// 默认 axios 实例请求配置
const configDefault = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  timeout: 30000,
  baseURL: import.meta.env.VITE_BASE_API,
  data: {},
};


class Http {
  // 当前实例的 axios 实例
  axiosInstance;

  constructor(config) {
    this.axiosInstance = Axios.create(config);
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
    this.axiosInstance.withCredentials = true;
  }

  // 请求拦截
  httpInterceptorsRequest() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        manageLoading(true, config);
        setHeaders(config);
        config.withCredentials = true;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  // 响应拦截
  httpInterceptorsResponse() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        manageLoading(false, response.config); // 关闭加载提示
        return handleResponse(response);
      },
      (error) => {
        manageLoading(false, error.response?.config || error.config);
        // handleError(error);
        return Promise.reject(error);
      },
    );
  }

  // 通用请求函数
  request(paramConfig) {
    const config = { ...this.axiosInstance.defaults, ...paramConfig };
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

function manageLoading(isLoading, config) {
  if (!config) return;
  // 是否请求时显示 loading 效果，默认显示，指定 isNotLoading 为true 则不显示
  if (isLoading && !config.isNotLoading) {
    loadingCounter++;
    load.show('请稍后...');
  } else if (!isLoading && !config.isNotLoading) {
    loadingCounter--;
    if (loadingCounter <= 0) {
      loadingCounter = 0;
      load.hide();
    }
  }
}

// 设置请求头
function setHeaders(config) {

  if (config.method === 'post' && config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
}

// 处理响应
function handleResponse(response) {

  if(response.data.code !== 0){
    ElMessage.error(response.data.message)
    throw new Error(response.data.message)
  }
 return response.data

}

export const http = new Http(configDefault);
