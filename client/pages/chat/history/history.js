// pages/chat/history/history.js

const app = getApp()

Component({

  data: {
    theme: '',
    messageList: [],
    userInfo: {}
  },

  lifetimes: {

    attached: function () {
      const that = this
      that.setData({ userInfo: app.globalData.userInfo })
      wx.getStorage({
        key: "chatHistory",
        success(res) {
          that.setData({ messageList: res.data })
        }
      })
      wx.getStorage({
        key: "theme",
        success(res) { that.setData({ theme: res.data }) }
      })
    }
  }
})
