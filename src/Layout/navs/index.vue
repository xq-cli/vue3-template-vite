<template>
  <div class="icu-common-navs-container" @click="handlestopPropagation">
    <transition name="fade" mode="out-in">
      <el-menu
        class="icu-navs-list"
        :default-active="active"
        unique-opened
        :collapse-transition="false"
      >
        <template v-for="item in asyRoutes" :key="item.path">
          <el-sub-menu v-if="item?.children && item.children.length > 1">
            <template #title>
              <i :class="['iconfont', 'font-mr', getIcon(item.name)]"></i>
              <span style="padding-right: 5px">{{ item.meta.title }}</span>
            </template>
            <el-menu-item
              @click="handleToPath(`${item.path}/${item1.path}`)"
              :index="item1.path"
              class="menu_item_one"
              v-for="item1 of item.children"
              :key="item1.path"
            >
              <template #title>
                <div class="menu_item_detail_one">
                  {{ item1.meta.title }}
                </div>
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item
            @click="handleToPath(item.path)"
            :index="item.path"
            class="menu_item_one"
            v-else
          >
            <template #title>
              <i :class="['iconfont', 'font-mr', getIcon(item.name)]"></i>
              <div class="menu_item_detail_one">
                {{ item.meta.title }}
              </div>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </transition>
    <div class="nav_logo">
      <img src="@/assets/nav-bg-logo.png" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "",
    };
  },
  computed: {
    asyRoutes() {
      return this.$router.options.routes.filter((item) => {
        return !item.meta.hidden;
      });
    },
  },
  watch: {
    $route: {
      handler() {
        this.getActived();
      },
      immediate: true,
    },
  },
  methods: {
    handleToPath(path) {
      this.$emit("close");
      this.$router.push(path);
    },
    handlestopPropagation(e) {
      e.stopPropagation();
    },
    getActived() {
      const paths = this.$route.path.split("/");
      this.active = "/" + paths[1];
    },
    getIcon(name) {
      switch (name) {
        case "dataManagement":
          return "icon-database";
        case "qualityControlManagement":
          return "icon-zhikong";
        case "dataCheck":
          return "icon-tongji";
        case "followupVerification":
          return "icon-suifang";
        case "systemManagement":
          return "icon-huizhiguiji";
        case "timeManagement":
          return "icon-huizhiguiji";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme/style";
.icu-common-navs-container {
  position: relative;
  z-index: 2;
  min-height: calc(100vh - 80px);
  padding-bottom: 183px;
  .nav_logo {
    img {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 205px;
      height: 180px;
    }
  }
  .font-mr {
    margin-right: 15px;
    font-size: 20px;
  }
  .icu-navs-list {
    border-right: none;
    background: transparent;
    img {
      margin-right: 9px;
    }
    :deep(.el-menu) {
      background-color: $header_menu_background;
    }
    :deep(.el-sub-menu) {
      &.is-active,
      &:hover {
        .el-sub-menu__title {
          font-weight: bold;
        }
      }
      .el-menu-item {
        padding: 0 20px !important;
        text-align: center;
        min-width: 0px;
        margin: 0 auto;
        //background: $el_menu_item;
        height: 65px;
        position: relative;
        text-align: left;
        font-size: 16px;
        font-weight: 400;
        &:hover {
          font-size: 18px;
          font-weight: bold;
          color: $el_menu_item_hover;
        }
        &.is-active,
        &:focus {
          .menu_item_detail {
            background: #fff;
            font-size: 18px;
            font-weight: bold;
            color: $el_menu_item_hover;
            min-width: 80%;
            padding: 0 5px;
            height: 40px;
            line-height: 40px;
            margin: 0 auto;
            border-radius: 8px;
          }
        }
        .menu_item_detail {
          color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          min-width: 80%;
          padding: 0 5px;
          text-align: center;
        }
      }
    }
    :deep(.el-sub-menu__title) {
      color: #fff;
      font-size: 18px;
      position: relative;
      font-weight: 400;

      font-family: Microsoft YaHei;
      text-shadow: 0px 2px 1px rgba(10, 20, 31, 0.3);
      &:hover {
        background: $el_submenu_title_background;
      }
      .el-sub-menu__icon-arrow {
        font-size: 18px;
      }
    }
  }
  .menu_item_one {
    color: #fff;
    font-size: 18px;
    position: relative;
    font-weight: 400;
    font-size: 18px;
    font-family: Microsoft YaHei;
    text-shadow: 0px 3px 1px rgba(10, 20, 31, 0.35);
    &:hover {
      font-weight: bold;
      background: $el_submenu_title_background;
    }
    &.is-active,
    &:focus {
      .menu_item_detail_one {
        font-size: 18px;
        font-weight: bold;
      }
      background: $el_submenu_title_background;
    }
    i {
      color: #fff;
      width: 16px;
    }
  }
  .icon-31shouqi {
    transform: rotate(90deg);
    margin-left: 10px;
  }
  .icon-zhankai {
    margin-left: 10px;
  }
}

// @media screen and (max-width:1280px) {
//    .icu-common-navs-container {
//       .nav_logo{
//     img{
//       width: 150px;
//     }
//   }
//    .menu_item_detail_one{
//     font-size: 15px !important;
//    }
// }
// }
</style>
