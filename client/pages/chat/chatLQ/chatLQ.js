// pages/chat/chatLQ/chatLQ.js

const app = getApp()

Page({
  data: {
    isLoad: false,
    system_in: true,
    system_out: true,
    system_num: true,
    anonymous: false,
    inputHeight: 0,
    scrollTop: 0,
    message: '',
    anonymousName: '匿名用户^_^',
    messageList: [],
    userInfo: {}
  },

  onLoad: function () {
    let that = this
    that.setData({
      userInfo: app.globalData.userInfo
    })
    that.getData()
    that.connect()
    if (that.data.anonymous == false) {
      setTimeout(function () {
        var temp = '{ "content": "' + app.globalData.userInfo.nickName + '进入了聊天室' + '", "type": "system_in", "nickName": "' + '' + '", "avatarUrl": "' + '' + '" }'
        wx.sendSocketMessage({
          data: temp
        })
      }, 800)
    }
    that.setData({
      isLoad: true
    })
  },

  onShow: function () {
    let that = this
    if (that.data.isLoad == true) {
      that.getData()
    }
  },

  onUnload: function () {
    let that = this
    if (that.data.anonymous == false) {
      let temp = '{ "content": "' + app.globalData.userInfo.nickName + '退出了聊天室' + '", "type": "system_out", "nickName": "' + '' + '", "avatarUrl": "' + '' + '" }'
      wx.sendSocketMessage({
        data: temp
      })
    }
    setTimeout(function () {
      wx.closeSocket()
      wx.onSocketClose(function (res) {
        console.log('close success')
      })
    }, 1500)
    wx.getStorage({
      key: 'chat_history',
      success(res) {
        let l_a = res.data.length
        let l_b = that.data.messageList.length
        if (l_b > 100) {
          wx.setStorage({
            key: 'chat_history',
            data: that.data.messageList.slice(l_b - 100, )
          })
        } else if (l_a + l_b <= 100) {
          wx.setStorage({
            key: 'chat_history',
            data: res.data.concat(that.data.messageList)
          })
        } else {
          let temp = res.data.slice(l_a + l_b - 100, )
          wx.setStorage({
            key: 'chat_history',
            data: temp.concat(that.data.messageList)
          })
        }
      }
    })
  },

  connect: function () {
    let that = this
    wx.connectSocket({
      url: 'ws://localhost:3000/'
    })
    wx.onSocketOpen(function (res) {
      console.log('open success')
      wx.onSocketMessage(function (res) {
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
    wx.onSocketError(function (res) {
      wx.showToast({
        title: '无法连接服务器，请重试',
        icon: "none",
        duration: 3000
      })
    })
  },

  getData: function () {
    let that = this
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
      key: 'anonymous',
      success(res) {
        that.setData({
          anonymous: res.data,
        })
      },
    })
    wx.getStorage({
      key: 'anonymousName',
      success(res) {
        that.setData({
          anonymousName: res.data,
        })
      },
    })
  },

  inputMessage: function (e) {
    let that = this
    that.setData({
      message: e.detail.value
    })
  },

  inputFocus: function (e) {
    let that = this
    that.setData({
      inputHeight: e.detail.height
    })
  },

  inputBlur: function (e) {
    let that = this
    that.setData({
      inputHeight: 0
    })
  },

  sendMessage: function () {
    let that = this
    let mes = that.data.message
    that.setData({
      message: ''
    })
    if (mes == '') {
      return
    }
    let temp = ''
    if (that.data.anonymous == true) {
      temp = '{ "content": "' + mes + '", "type": "text", "nickName": "[匿名]' + that.data.anonymousName + '", "avatarUrl": "' + app.globalData.userInfo.avatarUrl + '" }'
    } else {
      temp = '{ "content": "' + mes + '", "type": "text", "nickName": "' + app.globalData.userInfo.nickName + '", "avatarUrl": "' + app.globalData.userInfo.avatarUrl + '" }'
    }
    wx.sendSocketMessage({
      data: temp,
      success: function (res) {
        console.log('send success')
        that.toBottom()
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
    let that = this
    that.setData({
      scrollTop: 10000,
    })
  },

  toSetting: function () {
    wx.navigateTo({
      url: '/pages/chat/chatSetting/chatSetting'
    })
  },

  toHistory: function () {
    wx.navigateTo({
      url: '/pages/chat/chatHistory/chatHistory'
    })
  },
})