/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
    "vue-global-api",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    //关闭vue名称驼峰检查
    "vue/multi-word-component-names": 0,
  },
};
