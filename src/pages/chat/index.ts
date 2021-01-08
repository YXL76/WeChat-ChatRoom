import { errorHandler, store } from "../../utils";
import { createPage } from "@mpxjs/core";

const URL = "ws://localhost:3000/";

interface Data {
  settings: Chat.Settings;
  message: string;
  messageList: Chat.Message[];
  connected: boolean;
}

interface Methods {
  userInfo(): WechatMiniprogram.UserInfo | undefined;
}

createPage<Data, {}, Methods>({
  data: {
    settings: {
      systemIn: true,
      systemOut: true,
      systemNum: true,
      anonymous: false,
      anonymousName: "匿名用户^_^",
    },
    message: "",
    messageList: [],
    connected: false,
  },

  computed: {
    userInfo() {
      return store.state.userInfo;
    },
  },

  attached() {
    const settings = wx.getStorageSync("chatSettings") as Chat.Settings;
    if (settings) {
      this.settings = settings;
    }

    void wx.showLoading({ title: "正在进入聊天室", mask: true });
    wx.connectSocket({
      url: URL,
      complete: () => {
        void wx.hideLoading();
      },
    });
    wx.onSocketOpen(() => {
      console.log("open success");
      this.connected = true;
      wx.onSocketMessage(({ data }: { data: string }) => {
        this.messageList.push(JSON.parse(data) as Chat.Message);
      });
      if (!this.settings.anonymous) {
        void wx.sendSocketMessage({
          data: JSON.stringify({
            content: `${this.userInfo?.nickName || ""}进入了聊天室`,
            type: "systemIn",
          }),
        });
      }
    });
    void wx.onSocketError(({ errMsg }) => {
      errorHandler(errMsg);
    });
  },

  detached() {
    if (!this.connected) {
      return;
    }
    if (!this.settings.anonymous) {
      wx.sendSocketMessage({
        data: JSON.stringify({
          content: `${this.userInfo?.nickName || ""}退出了聊天室`,
          type: "systemOut",
        }),
        complete() {
          wx.onSocketClose(() => {
            console.log("close success");
          });
          void wx.closeSocket();
        },
      });
    } else {
      wx.onSocketClose(() => {
        console.log("close success");
      });
      void wx.closeSocket();
    }

    const history = (wx.getStorageSync("chatHistory") as Chat.Message[]) || [];
    wx.setStorageSync(
      "chatHistory",
      history.concat(this.messageList).reverse().slice(0, 100).reverse(),
    );
  },

  sendMessage() {
    if (!this.message) {
      return;
    }
    wx.sendSocketMessage({
      data: JSON.stringify({
        content: this.message,
        type: "text",
        nickName: this.settings.anonymous
          ? `[匿名]${this.settings.anonymousName}`
          : this.userInfo?.nickName,
        avatarUrl: this.userInfo?.avatarUrl,
      }),
      success: () => {
        this.message = "";
        setTimeout(() => {
          void wx.pageScrollTo({ scrollTop: 100000, duration: 300 });
        }, 400);
      },
      fail: ({ errMsg }) => {
        errorHandler(errMsg);
      },
    });
  },

  toSetting() {
    void wx.navigateTo({ url: "./setting" });
  },

  toHistory() {
    void wx.navigateTo({ url: "./history" });
  },
});
