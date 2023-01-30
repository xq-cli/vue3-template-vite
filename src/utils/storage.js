const ptId = "CURRENT_PTID";
const token = "IUC_URSER_TOKEN";
const account = "ICU_CURRENT_ACCOUNT";
const visitId = "VISITEDID";
const skin = "SKIN";
const userRole = "USERROLE";
const userIdentify = "USERIDENTIFY";
const userRelName = "USERRELNAME";
export function setStoragePtId(val) {
  return localStorage.setItem(ptId, val);
}

export function getStoragePtId() {
  return localStorage.getItem(ptId);
}

export function removeStorage(name) {
  return localStorage.removeItem(name);
}

export function clearStorage() {
  return localStorage.clear();
}

export function setUserToken(val) {
  return localStorage.setItem(token, val);
}

export function getUserToken() {
  return localStorage.getItem(token);
}

export function removeUserToken() {
  return localStorage.removeItem(token);
}

export function setCurrentAccount(val) {
  return localStorage.setItem(account, val);
}

export function getCurrentAccount(val) {
  return localStorage.getItem(account, val) || "";
}
export function setStroagePtVisitId(val) {
  return localStorage.setItem(visitId, val) || "";
}
export function getStroagePtVisitId() {
  return localStorage.getItem(visitId) || "";
}
export function getSkin() {
  return localStorage.getItem(skin) || "pramiry";
}
export function setSkin(val) {
  return localStorage.setItem(skin, val) || "pramiry";
}
export function setUserRole(val) {
  return localStorage.setItem(userRole, val);
}
export function getUserRole() {
  return localStorage.getItem(userRole) || [];
}

export function setUserIndentify(val) {
  return localStorage.setItem(userIdentify, val);
}

export function getUserIndentify() {
  return localStorage.getItem(userIdentify) || "";
}

export function setUserRelName(val) {
  return localStorage.setItem(userRelName, val);
}
export function getUserRelName() {
  return localStorage.getItem(userRelName) || "";
}
