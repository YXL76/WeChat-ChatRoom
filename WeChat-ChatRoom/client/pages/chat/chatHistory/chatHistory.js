// pages/chat/chatHistory/chatHistory.js

var app = getApp()

Page({
  data: {
    system_in: true,
    system_out: true,
    system_num: true,
    scrollTop: 0,
    messageList: [],
    userInfo: {}
  },

  onLoad: function () {
    let that = this
    that.setData({
      userInfo: app.globalData.userInfo
    })
    wx.getStorage({
      key: 'system_in',
      success(res) {
        that.setData({
          system_in: res.data,
        })
      },
    })
    wx.getStorage({
      key: 'system_out',
      success(res) {
        that.setData({
          system_out: res.data,
        })
      },
    })
    wx.getStorage({
      key: 'system_num',
      success(res) {
        that.setData({
          system_num: res.data,
        })
      },
    })
    wx.getStorage({
      key: 'chat_history',
      success(res) {
        that.setData({
          messageList: res.data,
        })
      },
    })
    setTimeout(() => {
      that.setData({
        scrollTop: 10000,
      })
    }, 700);
  },
})