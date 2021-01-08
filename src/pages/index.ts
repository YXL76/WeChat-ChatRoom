import { createPage } from "@mpxjs/core";
import { store } from "../utils";

interface Methods {
  userInfo(): WechatMiniprogram.UserInfo | undefined;
}

createPage<{}, {}, Methods>({
  computed: {
    userInfo() {
      return store.state.userInfo;
    },
  },

  enterRoom() {
    void wx.navigateTo({ url: "./chat/index" });
  },

  async onShow() {
    if (!store.state.userInfo) {
      await store.dispatch("getAndSetUserInfo");
    }
  },

  async onUserInfo({
    detail: { userInfo },
  }: WechatMiniprogram.ButtonGetUserInfo) {
    if (userInfo) {
      await store.dispatch("getAndSetUserInfo");
    }
  },
});
