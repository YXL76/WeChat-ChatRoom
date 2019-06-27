// pages/index/index.js

var app = getApp()

Page({
  data: {
    notGet: true
  },

  in: function () {
    wx.navigateTo({
      url: '/pages/chat/chat'
    });
  },

  get: function (e) {
    let that = this
    if (e.detail.userInfo) {
      that.setData({
        notGet: false
      })
      app.globalData.userInfo = e.detail.userInfo
    }
  },
})