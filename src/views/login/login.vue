<template>
  <div class="login-background">
    <div class="content">
      <div class="close" @click="onClose">
        <svg
          viewBox="0 0 14 14"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="6"
            width="14"
            height="2"
            fill="#61afb7"
            transform="rotate(45,7,7)"
          />
          <rect
            x="6"
            y="0"
            width="2"
            height="14"
            fill="#61afb7"
            transform="rotate(45,7,7)"
          />
        </svg>
      </div>
      <el-form ref="formRef" :model="form" class="main" :rules="rules">
        <el-form-item prop="username" class="form-item">
          <div class="label">用户名：</div>
          <el-input
            v-model="form.name"
            placeholder="请输入用户名"
            class="input-text"
            @keyup.enter="focusPassWord('password')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="form-item">
          <div class="label">密码：</div>
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            show-password
            @keyup.enter="focusPassWord('login')"
            ref="password"
          ></el-input>
        </el-form-item>
        <el-button type="primary" class="login-btn" @click="Login"
          >登 录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { login, getLoginInfo } from "@/api/login";
import { ElMessage } from "element-plus";
import { setUserToken } from "@/utils/storage";
import { useUserInfoStore } from "@/stores/userInfo";
const router = useRouter();
const password = ref(null);
const userInfoStore = useUserInfoStore();
const form = ref({
  name: "",
  password: "",
});
const Login = () => {
  router.push("/dataManagement");
  if (form.value.name === "" || form.value.password === "") {
    return;
  }
  login(form.value).then((res) => {
    setUserToken(res);
    getLoginInfo().then((result) => {
      ElMessage.success("登录成功");
      userInfoStore.increment(result.user);
    });
  });
};
const focusPassWord = (next) => {
  next === "login" ? Login() : password.value.focus();
};
</script>

<style scoped lang="scss">
@import "@/theme/style";
.version {
  font-size: 12px;
  position: fixed;
  right: 0;
  bottom: 0;
}
.login-background {
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url("@/assets/login-bg.png");
  display: flex;
  height: 100vh;
  align-items: center;
  -webkit-app-region: drag;
  .content {
    -webkit-app-region: no-drag;
    position: relative;
    width: 800px;
    height: 480px;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url("@/assets/login-form.png");
    font-family: Microsoft YaHei;
    .main {
      width: 230px;
      margin: 135px 0 0 450px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .form-item {
        width: 100%;
        margin-bottom: 18px;
        .label {
          font-size: 14px;
          font-weight: 400;
          color: #919191;
        }
        :deep(.el-input) {
          font-size: 14px;
          font-weight: 400;
          .el-input__wrapper {
            box-shadow: none !important;
            border-bottom: 1px solid #c0c0c0;
            border-radius: 0 !important;
            .el-input__inner {
              height: 30px;
              box-shadow: none !important;
              padding: 0 !important;
              color: #3a3a3a;
            }
          }
        }
      }
      .login-btn {
        width: 136px;
        height: 36px;
        background: $color_primary;
        box-shadow: 0px 2px 6px 0px rgba(42, 135, 145, 0.3);
        border-radius: 18px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
        text-shadow: 0px 2px 2px rgba(5, 47, 51, 0.5);
        margin: 40px auto 0;
      }
    }
    .close {
      position: absolute;
      top: 60px;
      right: 98px;
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
