import { createPage } from "@mpxjs/core";
import { store } from "../../utils";

interface Data {
  messageList: Chat.Message[];
}

interface Methods {
  userInfo(): WechatMiniprogram.UserInfo | undefined;
}

createPage<Data, {}, Methods>({
  data: {
    messageList: [],
  },

  computed: {
    userInfo() {
      return store.state.userInfo;
    },
  },

  attached() {
    const history = wx.getStorageSync("chatHistory") as Chat.Message[];
    if (history) {
      this.messageList = history;
    }
  },
});
