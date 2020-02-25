// pages/chat/chat.js

const app = getApp()

Component({

  options: {
    pureDataPattern: /^_/
  },

  data: {
    theme: 'Grey',
    systemIn: true,
    systemOut: true,
    systemNum: true,
    _anonymous: false,
    _anonymousName: '匿名用户^_^',
    message: '',
    messageList: [],
    userInfo: {}
  },

  lifetimes: {

    attached: function () {
      this.setData({ userInfo: app.globalData.userInfo })
      this.getData()
      this.connect()
      wx.showLoading({ title: '正在进入聊天室', mask: true })
      setTimeout(function () { wx.hideLoading() }, 2000)
    },

    detached: function () {
      let that = this
      if (!that.data._anonymous) {
        wx.sendSocketMessage({
          data: '{ "content": "' + app.globalData.userInfo.nickName + '退出了聊天室' + '", "type": "systemOut", "nickName": "' + '' + '", "avatarUrl": "' + '' + '" }',
          complete() {
            wx.closeSocket()
            wx.onSocketClose(function (res) { console.log('close success') })
          }
        })
      } else {
        wx.closeSocket()
        wx.onSocketClose(function (res) { console.log('close success') })
      }
      wx.getStorage({
        key: 'chatHistory',
        success(res) {
          let length = res.data.length + that.data.messageList.length
          wx.setStorage({
            key: 'chatHistory',
            data: res.data.concat(that.data.messageList).slice(length > 99 ? length - 99 : 0)
          })
        }
      })
    }
  },

  pageLifetimes: {
    show: function () {
      setTimeout(() => {
        this.getData()
      }, 800);
    }
  },

  methods: {

    connect: function () {
      const that = this
      wx.connectSocket({ url: 'ws://localhost:3000/' })
      wx.onSocketOpen(function (res) {
        console.log('open success')
        wx.onSocketMessage(function (res) {
          let list = that.data.messageList
          let newItem = JSON.parse(res.data)
          list.push(newItem)
          that.setData({ messageList: list })
          if (newItem.type === "text") that.toBottom()
        })
        if (!that.data._anonymous) {
          wx.sendSocketMessage({ data: '{ "content": "' + app.globalData.userInfo.nickName + '进入了聊天室' + '", "type": "systemIn", "nickName": "' + '' + '", "avatarUrl": "' + '' + '" }' })
        }
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
      const that = this
      wx.getStorage({
        key: 'theme',
        success(res) { that.setData({ theme: res.data }) }
      })
      wx.getStorage({
        key: 'systemIn',
        success(res) { that.setData({ systemIn: res.data }) }
      })
      wx.getStorage({
        key: 'systemOut',
        success(res) { that.setData({ systemOut: res.data }) }
      })
      wx.getStorage({
        key: 'systemNum',
        success(res) { that.setData({ systemNum: res.data }) }
      })
      wx.getStorage({
        key: 'anonymous',
        success(res) { that.setData({ _anonymous: res.data }) }
      })
      wx.getStorage({
        key: 'anonymousName',
        success(res) { that.setData({ _anonymousName: res.data, }) }
      })
    },

    inputMessage: function (e) {
      this.setData({ message: e.detail.value })
    },

    sendMessage: function () {
      if (this.data.message === '') return
      const that = this
      const mes = that.data.message
      that.setData({ message: '' })
      let temp = ''
      if (that.data._anonymous) temp = '{ "content": "' + mes + '", "type": "text", "nickName": "[匿名]' + that.data._anonymousName + '", "avatarUrl": "' + app.globalData.userInfo.avatarUrl + '" }'
      else temp = '{ "content": "' + mes + '", "type": "text", "nickName": "' + app.globalData.userInfo.nickName + '", "avatarUrl": "' + app.globalData.userInfo.avatarUrl + '" }'
      wx.sendSocketMessage({
        data: temp,
        success: function (res) { that.toBottom() },
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
      wx.pageScrollTo({ scrollTop: 100000, duration: 300 })
    },

    toSetting: function () {
      wx.navigateTo({ url: '/pages/chat/setting/setting' })
    },

    toHistory: function () {
      wx.navigateTo({ url: '/pages/chat/history/history' })
    }
  }
})