import service from "@/utils/request";

// 登录
export function login(data) {
  const formData = new FormData();
  formData.append("username", "cz_" + data.name);
  formData.append("password", data.password);
  return service({
    url: "/dandelion-security/login",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function getLoginInfo() {
  return service({
    url: "/dandelion-security/security/getLoginInfo",
    method: "get",
  });
}
