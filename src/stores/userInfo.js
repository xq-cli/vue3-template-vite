import { defineStore } from "pinia";

export const useUserInfoStore = defineStore("userInfo", {
  state: () => ({
    userInfo: {},
  }),
  actions: {
    increment(data) {
      this.userInfo = data;
    },
  },
});
