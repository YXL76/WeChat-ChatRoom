// pages/chat/chat.js

const app = getApp()

Page({
  data: {
    messagePage: false,
    settingPage: true,
    system_in: true,
    system_out: true,
    system_num: true,
    anonymous: false,
    inputHeight: 0,
    scrollTop: 0,
    message: '',
    bg_color: 'F2F3F5',
    user_bg_color: '0188FB',
    other_bg_color: 'FFFFFF',
    user_font_color: 'FFFFFF',
    other_font_color: '000000',
    font_size: '32',
    messageList: [],
    userInfo: {}
  },

  onLoad: function() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.connect()
    setTimeout(function() {
      var temp = '{ "content": "' + app.globalData.userInfo.nickName + '进入了聊天室' + '", "type": "system_in", "nickName": "' + '' + '", "avatarUrl": "' + '' + '" }'
      wx.sendSocketMessage({
        data: temp
      })
    }, 1000)
  },

  onUnload: function() {
    let that = this
    let temp = '{ "content": "' + app.globalData.userInfo.nickName + '退出了聊天室' + '", "type": "system_out", "nickName": "' + '' + '", "avatarUrl": "' + '' + '" }'
    wx.sendSocketMessage({
      data: temp
    })
    setTimeout(function() {
      wx.closeSocket()
      wx.onSocketClose(function(res) {
        console.log('close success')
      })
    }, 1000)
  },

  connect: function() {
    let that = this
    wx.connectSocket({
      url: 'ws://localhost:3000/'
    })
    wx.onSocketOpen(function(res) {
      console.log('open success')
      wx.onSocketMessage(function(res) {
        let list = that.data.messageList
        let newItem = JSON.parse(res.data)
        list.push(newItem)
        that.setData({
          messageList: list
        })
        if (newItem.type == "text") {
          that.toBottom()
        }
      })
    })
    wx.onSocketError(function(res) {
      wx.showToast({
        title: '无法连接服务器，请重试',
        icon: "none",
        duration: 3000
      })
    })
  },

  inputMessage: function(e) {
    let that = this
    that.setData({
      message: e.detail.value
    })
  },

  inputFocus: function(e) {
    let that = this
    that.setData({
      inputHeight: e.detail.height
    })
  },

  inputBlur: function(e) {
    let that = this
    that.setData({
      inputHeight: 0
    })
  },

  sendMessage: function() {
    let that = this
    if (that.data.message === '') {
      return
    }
    let temp = ''
    if (that.data.anonymous == true) {
      temp = '{ "content": "' + this.data.message + '", "type": "text", "nickName": "' + '匿名用户^_^' + '", "avatarUrl": "' + app.globalData.userInfo.avatarUrl + '" }'
    } else {
      temp = '{ "content": "' + this.data.message + '", "type": "text", "nickName": "' + app.globalData.userInfo.nickName + '", "avatarUrl": "' + app.globalData.userInfo.avatarUrl + '" }'
    }
    wx.sendSocketMessage({
      data: temp,
      success: function(res) {
        console.log('send success')
        that.setData({
          message: ''
        })
        setTimeout(function() {
          that.toBottom()
        }, 500)
      },
      fail: function(res) {
        wx.showToast({
          title: '消息发送失败，请重试',
          icon: "none",
          duration: 2000
        })
      },
    })
  },

  toBottom: function() {
    let that = this
    that.setData({
      scrollTop: 1000000,
    })
  },

  changePage: function() {
    let that = this
    if (that.data.messagePage == true) {
      that.setData({
        messagePage: false,
        settingPage: true,
      })
    } else {
      that.setData({
        messagePage: true,
        settingPage: false,
      })
    }
  },

  changeIn: function() {
    let that = this
    if (that.data.system_in == true) {
      that.setData({
        system_in: false,
      })
    } else {
      that.setData({
        system_in: true,
      })
    }
  },

  changeOut: function() {
    let that = this
    if (that.data.system_out == true) {
      that.setData({
        system_out: false,
      })
    } else {
      that.setData({
        system_out: true,
      })
    }
  },

  changeNum: function() {
    let that = this
    if (that.data.system_num == true) {
      that.setData({
        system_num: false,
      })
    } else {
      that.setData({
        system_num: true,
      })
    }
  },

  changeAno: function() {
    let that = this
    if (that.data.anonymous == true) {
      that.setData({
        anonymous: false,
      })
    } else {
      that.setData({
        anonymous: true,
      })
    }
  },

  changeBC: function(e) {
    let that = this
    if (e.detail.value == '') {
      that.setData({
        bg_color: 'F2F3F5',
      })
    } else {
      that.setData({
        bg_color: e.detail.value,
      })
    }
  },

  changeUBC: function(e) {
    let that = this
    if (e.detail.value == '') {
      that.setData({
        user_bg_color: '0188FB',
      })
    } else {
      that.setData({
        user_bg_color: e.detail.value,
      })
    }
  },

  changeUFC: function(e) {
    let that = this
    if (e.detail.value == '') {
      that.setData({
        user_font_color: 'FFFFFF',
      })
    } else {
      that.setData({
        user_font_color: e.detail.value,
      })
    }
  },

  changeOBC: function(e) {
    let that = this
    if (e.detail.value == '') {
      that.setData({
        other_bg_color: 'FFFFFF',
      })
    } else {
      that.setData({
        other_bg_color: e.detail.value,
      })
    }
  },

  changeOFC: function(e) {
    let that = this
    if (e.detail.value == '') {
      that.setData({
        other_font_color: '000000',
      })
    } else {
      that.setData({
        other_font_color: e.detail.value,
      })
    }
  },

  changeFS: function(e) {
    let that = this
    if (e.detail.value == '') {
      that.setData({
        font_size: '32',
      })
    } else {
      that.setData({
        font_size: e.detail.value,
      })
    }
  },
})
