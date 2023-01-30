<template>
  <div class="common-header-container">
    <div class="logo-container">
      <div class="logo-img">
        <img src="@/assets/hos-logo.png" alt="" />
        <!-- <img src="../../assets/fj.png" alt=""> -->
      </div>
      <div class="title_box">
        <div class="title_first">市级医院急诊室和EICU一体化平台</div>
        <div class="title_sec">
          <div class="title_item">LAN-CN 智慧急诊中心</div>
          <div class="circle"></div>
          <div class="title_item">Dandelion 卒中专科中心系统</div>
        </div>
      </div>
    </div>

    <div class="handle-container">
      <div class="window-handle">
        <!-- <div class="iconMar">
          <el-popover
            placement="bottom"
            width="200"
            trigger="click"
          >
            <img
              src="@/assets/chinese-medicine/zhuti.png"
              slot="reference"
              alt=""
            />
            <div class="skin_box">
              <div @click="handleChangeSkin('pramiry')" >默认</div>
               <div @click="handleChangeSkin('red')">红色</div>
            </div>
          </el-popover>
        </div> -->
        <div class="iconMar" @click="miniWindow">
          <i class="iconfont icon-zuixiaohua"></i>
        </div>
        <div class="iconMar" v-show="isMax" @click="resizeWindow(false)">
          <i class="iconfont icon-igw-l-enlarge-1"></i>
        </div>
        <div class="iconMar" v-show="!isMax" @click="resizeWindow(true)">
          <i class="iconfont icon-icon-"></i>
        </div>
        <div class="iconMar" @click="closeMainWindow">
          <i class="iconfont icon-guanbi"></i>
        </div>
      </div>
      <el-popover placement="bottom" :width="150" trigger="click" popper-class="tab_box">
        <template #default>
          <router-link to="/">
            <div class="tab_item">切换用户</div>
          </router-link>
        </template>
        <template #reference>
          <div class="user-info">
            <img src="@/assets/morentouxiang.png" alt="" />
            <span class="user-name">用户：{{ userTrueName }}</span>
            <span class="lock"></span>
          </div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { setTheme } from "@/theme/style";
import { getSkin, setSkin, getUserRelName } from "@/utils/storage";

export default {
  data() {
    return {
      active: 0,
      parentInfo: {
        secMenus: [],
      },
      tagIndex: 0,
      isMax: true,
      userTrueName: getUserRelName(),
    };
  },
  props: ["lock"],
  created() {
    // this.$store.dispatch('user/getUserInfo')
  },
  methods: {
    miniWindow() {
      // 最小化窗口
      window?.electron?.minimizeMainWindow();
    },
    resizeWindow(bool) {
      this.isMax = bool;
      window?.electron?.resizeWindow();
    },
    closeMainWindow() {
      window?.electron?.closeMainWindow();
    },
    handleChangeSkin(skin) {
      if (getSkin() !== skin) {
        setTheme(skin);
        setSkin(skin);
        // this.getBgImg()
      } else {
        return false;
      }
    },
    getBgImg() {
      const atr = document.getElementsByTagName("body")[0].getAttribute("style").split(";");
      atr.forEach((item) => {
        const valArr = item.split(":");
        const reg = /--aside_bg_img/;
        if (reg.test(valArr[0])) {
          const dom = document.getElementById("header_aside");
          dom.setAttribute(
            "style",
            `background: url(${valArr[1]}) no-repeat  center;background-size: 100% 100%`
          );
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme/style";
.tab_box {
  .tab_item {
    line-height: 30px;
    -webkit-app-region: no-drag;
  }
}
.common-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background: $header_menu_background;
  height: 80px;
  -webkit-app-region: drag;
  position: relative;
  z-index: 20;
  .logo-container {
    display: flex;
    align-items: center;
    padding-left: 28px;
    .logo-img {
      -webkit-app-region: no-drag;
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .hospital-name {
        margin-right: 20px;
        margin-left: 20px;
        font-size: 14px;
        line-height: 23px;
        font-weight: 600;
        text-align: left;
      }
      img {
        height: 50px;
      }
    }
    .title_box {
      display: flex;
      flex-direction: column;
      margin-left: 19px;
      .title_first {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        color: #ffffff;
        text-shadow: 0px 2px 1px rgba(10, 20, 31, 0.3);
      }
      .title_sec {
        display: flex;
        align-items: center;
        margin-top: 5px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
        text-shadow: 0px 3px 1px rgba(10, 20, 31, 0.35);
        .circle {
          width: 8px;
          height: 8px;
          background: #ffffff;
          box-shadow: 0px 3px 1px 0px rgba(10, 20, 31, 0.35);
          border-radius: 50%;
          margin: 0 6px;
        }
      }
    }
  }

  .header-navs {
    flex: 1;
    font-size: 14px;

    ul {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    li {
      width: 98px;
      height: 80px;
      text-align: center;
      margin-right: 6px;
      position: relative;
      cursor: pointer;

      &.active {
        &::after {
          content: "";
          position: absolute;
          left: 41px;
          border-top: 8px solid transparent;
          border-bottom: 8px solid #fff;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
        }
      }

      .img {
        padding-top: 14px;
      }

      i {
        font-size: 24px;
      }

      .i-title {
        margin-top: 2px;
      }
    }
  }

  .handle-container {
    display: flex;
    height: 80px;
    position: relative;
    -webkit-app-region: no-drag;
    .window-handle {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      margin: 4px 12px 0 0;
      position: absolute;
      right: 0;
      z-index: 999;
      -webkit-app-region: no-drag;
      .iconMar {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 25px;
        padding: 4px;
        line-height: 25px;
        transition: 0.3s;
        &:hover {
          transform: rotate(180deg);
        }
        .iconfont {
          color: #fff;
        }
        cursor: pointer;
        -webkit-app-region: no-drag;
        img {
          vertical-align: middle;
        }
      }
      .iconfont {
        width: 100%;
        text-align: center;
        font-size: 15px;
        -webkit-app-region: no-drag;
        &:before {
          -webkit-app-region: no-drag;
        }
      }
    }

    .user-info {
      font-size: 16px;
      width: 170px;
      display: flex;
      align-items: center;
      text-align: right;
      cursor: pointer;
      margin-right: 80px;
      -webkit-app-region: no-drag;
      > i {
        margin-right: 6px;
      }
      .user-name {
        margin-left: 16px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        text-shadow: 0px 1px 1px rgba(10, 20, 31, 0.2);
      }
      .lock {
        margin-left: 10px;
        cursor: pointer;

        i {
          transform: scale(1.3);
        }
      }
    }
  }
}

.skin_box {
  text-align: center;
  div {
    padding: 10px 5px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
