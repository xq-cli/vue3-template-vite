<template>
  <div class="common_layout_container">
    <el-container>
      <el-header> <Header /></el-header>
      <el-container>
        <el-aside style="width: 205px" class="bounce" v-show="showMenu">
          <Navs @close="closeDraw" />
        </el-aside>
        <el-main>
          <transition name="fade">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
          <div class="manage-name-box">©2022蓝想大数据科技（上海）有限公司</div>
        </el-main>
      </el-container>
    </el-container>
    <Draw v-show="showDraw && !showMenu" @close="closeDraw">
      <transition name="bounce">
        <el-aside style="width: 205px" v-show="showDraw && !showMenu">
          <Navs @close="closeDraw" />
        </el-aside>
      </transition>
    </Draw>

    <div
      class="show_menu_tap"
      v-show="!showDraw && !showMenu"
      @click="hanldeShowDraw($event)"
    >
      <img src="@/assets/arrow.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import Header from "./Header/index.vue";
import Navs from "./navs/index.vue";
import Draw from "./navs/Draw.vue";
const showMenu = ref(true);
const showDraw = ref(true);
let timer = null;
const changeMenuType = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    showMenu.value = document.body.clientWidth > 1280;
  }, 200);
};
onBeforeMount(() => {
  window.addEventListener("resize", changeMenuType);
  document.body.addEventListener("click", closeDraw);
});
const closeDraw = () => {
  showDraw.value = false;
};
const hanldeShowDraw = (e) => {
  e.stopPropagation();
  showDraw.value = true;
};
onUnmounted(() => {
  clearTimeout(timer);
  window.removeEventListener("resize", changeMenuType);
  document.body.removeEventListener("click", closeDraw);
});
</script>

<style lang="scss" scoped>
@import "@/theme/style";
.common_layout_container {
  height: 100%;
  width: 100%;
  .el-header {
    padding: 0;
    height: 80px;
  }
  .left_nav {
    overflow: visible !important;
    :deep(.el-scrollbar__wrap) {
      margin-bottom: 0px !important;
      .el-scrollbar__view {
        width: 200px;
      }
    }
  }
  .el-header {
    padding: 0;
  }

  .el-main {
    height: calc(100vh - 120px);
    padding: 16px;
    box-sizing: border-box;
    border-bottom: none;
    overflow: hidden;
    background: #f7f8fa;
    position: relative;
    &.no-border {
      border: none;
    }
  }
  .manage-name-box {
    position: fixed;
    bottom: 0px;
    right: 0px;
    width: 100%;
    height: 40px;
    text-align: right;
    line-height: 40px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #a5a5a5;
    background: #f7f8fa;
    padding-right: 16px;
  }

  .el-aside {
    background-color: $header_menu_background;
    height: calc(100vh - 80px);
    position: relative;
  }

  .el-dialog__wrapper {
    :deep(.lock-dialog) {
      height: 420px;
      background: url("../assets/lock-bg-new.png") no-repeat center;
      box-shadow: none;
      :deep(.el-dialog__header) {
        display: none;
      }
    }

    .unlock-container {
      margin-left: 140px;
      padding: 10px 80px 5px;
      border-radius: 8px;
      width: 440px;
      .logo-box {
        display: flex;
        justify-content: center;
      }

      .el-form {
        text-align: center;
        .el-form-item {
          margin-bottom: 0;
        }
        :deep(.el-form-item__label) {
          font-size: 14px;
        }

        :deep(input) {
          height: 40px;
          line-height: 40px;
        }

        .el-button {
          color: #fff;
          font-size: 14px;
          padding: 9px 40px;
        }
      }
    }
  }

  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }

  @keyframes bounce-in {
    from {
      margin-left: -200px;
    }
    to {
      margin-left: 0px;
    }
  }

  .show_menu_tap {
    position: fixed;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    padding: 0 0px;
    width: 15px;
    height: 80px;
    background: #ffffff;
    box-shadow: 0px 0px 5px 0px rgba(10, 20, 31, 0.35);
    border-radius: 0px 5px 5px 0px;
  }
}

@media screen and (max-width: 1280px) {
  .common_layout_container {
    // /deep/ .el-container {
    //   .el-aside {
    //     width: 150px !important;
    //   }
    // }
    .el-main {
      padding: 24px 24px 1px 24px !important;
    }
    .data_management {
      .table_container {
        height: calc(100% - 178px) !important;
      }
    }
    .manage-name {
      width: 100%;
    }
  }
}
</style>
