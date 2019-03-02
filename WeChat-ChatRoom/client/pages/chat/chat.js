// pages/chat/chat.js

const app = getApp()

Page({
  data: {
    inputHeight: 0,
    scrollTop: 0,
    message: '',
    messageList: [],
    userInfo: {}
  },

  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.connect()
    setTimeout(function () {
      var temp = '{ "content": "' + app.globalData.userInfo.nickName + '进入了聊天室' + '", "type": "system", "nickName": "' + '' + '", "avatarUrl": "' + '' + '" }'
      wx.sendSocketMessage({
        data: temp
      })
    }, 1000)
  },

  onUnload: function () {
    var that = this
    var temp = '{ "content": "' + this.data.userInfo.nickName + '退出了聊天室' + '", "type": "system", "nickName": "' + '' + '", "avatarUrl": "' + '' + '" }'
    wx.sendSocketMessage({
      data: temp
    })
    setTimeout(function() {
      wx.closeSocket()
      wx.onSocketClose(function (res) {
        console.log('close success')
      })
    }, 1000)  
  },

  connect: function () {
    var that = this
    wx.connectSocket({
      url: 'ws://localhost:3000/'
    })
    wx.onSocketOpen(function (res) {
      console.log('open success')
      wx.onSocketMessage(function (res) {
        //console.log(JSON.parse(res.data))
        var list = that.data.messageList
        list.push(JSON.parse(res.data))
        that.setData({
          messageList: list
        })
        that.toBottom()
      })
    })
    wx.onSocketError(function (res) {
      wx.showToast({
        title: '无法连接服务器，请重试',
        icon: "none",
        duration: 3000
      })
    })
  },

  inputMessage: function (e) {
    var that = this
    that.setData({
      message: e.detail.value
    })
  },

  inputFocus: function (e) {
    var that = this
    that.setData({
      inputHeight: e.detail.height
    })
  },

  inputBlur: function (e) {
    var that = this
    that.setData({
      inputHeight: 0
    })
  },

  sendMessage: function () {
    var that = this
    if (that.data.message === '') { return }
    var temp = '{ "content": "' + this.data.message + '", "type": "text", "nickName": "' + this.data.userInfo.nickName + '", "avatarUrl": "' + this.data.userInfo.avatarUrl + '" }'
    wx.sendSocketMessage({
      data: temp,
      success: function (res) {
        console.log('send success')
        that.setData({
          message: ''
        })
        setTimeout(function () {
          that.toBottom()
        }, 500)
      },
      fail: function (res) {
        wx.showToast({
          title: '消息发送失败，请重试',
          icon: "none",
          duration: 2000
        })
      },
    })
  },

  toBottom: function () {
    var that = this
    that.setData({
      scrollTop: 1000000,
    })
  }
})