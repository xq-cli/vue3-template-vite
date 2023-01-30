export function setTheme(name) {
  const themes = {
    pramiry: {
      header_menu_background: "#61AFB7",
      el_submenu_title_background: "#5199a1",
      el_menu_item_hover: "#61AFB7",
      el_menu_item: "#5199a1",
      button_background: "#61AFB7",
      border_color: "#61AFB7",
      text_color: "#61AFB7",
      aside_bg_img: new URL("@/assets/aside-bg.png", import.meta.url).href,
      color_primary: "#61AFB7",
      "el-color-primary": "#61AFB7",
    },
    red: {
      header_menu_background: "red",
      el_submenu_title_background: "red",
      el_menu_item_hover: "red",
      el_menu_item: "red",
      button_background: "red",
      border_color: "red",
      text_color: "red",
      aside_bg_img: new URL("@/assets/aside-bg.png", import.meta.url).href,
      color_primary: "red",
      "el-color-primary": "red",
    },
  };
  const item = themes[name];
  let itemKey;
  for (itemKey in item) {
    document.body.style.setProperty(`--${itemKey}`, item[itemKey]);
  }
}
