import { createPage } from "@mpxjs/core";

interface Data {
  settings: Chat.Settings;
  option: {
    title: string;
    content: {
      title: string;
      id: string;
      type: string;
    }[];
  }[];
}

createPage<Data>({
  data: {
    settings: {
      systemIn: true,
      systemOut: true,
      systemNum: true,
      anonymous: false,
      anonymousName: "匿名用户^_^",
    },
    option: [
      {
        title: "系统消息",
        content: [
          {
            title: "进入消息",
            id: "systemIn",
            type: "switch",
          },
          {
            title: "退出消息",
            id: "systemOut",
            type: "switch",
          },
          {
            title: "人数消息",
            id: "systemNum",
            type: "switch",
          },
        ],
      },
      {
        title: "匿名",
        content: [
          {
            title: "启用",
            id: "anonymous",
            type: "switch",
          },
          {
            title: "昵称",
            id: "anonymousName",
            type: "input",
          },
        ],
      },
    ],
  },

  attached() {
    const settings = wx.getStorageSync("chatSettings") as Chat.Settings;
    if (settings) {
      this.settings = settings;
    }
  },

  detached() {
    void wx.showLoading({ title: "保存中", mask: true });
    wx.setStorageSync("chatSettings", this.settings);
    void wx.hideLoading();
  },

  changeSetting({
    currentTarget: { id },
    detail: { value },
  }: WechatMiniprogram.SwitchChange) {
    this.setData({
      [`settings.${id}`]: value,
    });
  },
});
