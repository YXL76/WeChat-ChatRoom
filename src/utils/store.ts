import { createStoreWithThis } from "@mpxjs/core";

export const store = createStoreWithThis({
  state: {
    userInfo: undefined as undefined | WechatMiniprogram.UserInfo,
  },

  mutations: {
    setUserInfo(userInfo?: WechatMiniprogram.UserInfo) {
      this.state.userInfo = userInfo;
    },
  },

  actions: {
    async getAndSetUserInfo() {
      const { authSetting } = await wx.getSetting();
      if (authSetting["scope.userInfo"]) {
        wx.getUserInfo({
          lang: "zh_CN",
          withCredentials: true,
          success: ({ userInfo }) => {
            this.commit("setUserInfo", userInfo);
          },
        });
      }
    },
  },
});
