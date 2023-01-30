import axios from "axios";
import { ElMessage } from "element-plus";
import { getUserToken } from "./storage";
import Router from "../router";
const baseUrl = "http://192.168.1.229:7001";
const service = axios.create({
  baseURL: baseUrl,
});

service.interceptors.request.use(
  (config) => {
    const token = getUserToken();
    if (token) {
      config.headers.token = token; // 将token放到请求头发送给服务器
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.config.responseType === "blob") {
      return response.data;
    }
    const res = response.data;
    if (res.code !== 200) {
      ElMessage({
        message: res.msg || "系统异常",
        type: "error",
        duration: 5 * 1000,
      });
      return Promise.reject(res);
    } else {
      return res.data;
    }
  },
  (error) => {
    if (
      error.response &&
      error.response.request &&
      error.response.request.response
    ) {
      const res = JSON.parse(error.response.request.response);
      if (res.msg === "无效的token信息") {
        ElMessage({
          message: "登录过期",
          type: "error",
          duration: 5 * 1000,
        });
        Router.push("/");
      } else {
        ElMessage({
          message: res.msg || "系统异常",
          type: "error",
          duration: 5 * 1000,
        });
      }
    } else {
      ElMessage({
        message: "系统异常",
        type: "error",
        duration: 5 * 1000,
      });
    }

    return Promise.reject(error);
  }
);

export default service;
