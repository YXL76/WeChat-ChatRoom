// pages/chat/chat.js

Page({
  data: {
    isHide: false,
  },

  onLoad: function () {
    let that = this
    wx.showLoading({
      title: '正在进入聊天室'
    })
    wx.getStorage({
      key: 'system_in',
      fail() {
        wx.setStorage({
          key: 'system_in',
          data: true
        })
      }
    })
    wx.getStorage({
      key: 'system_out',
      fail() {
        wx.setStorage({
          key: 'system_out',
          data: true
        })
      }
    })
    wx.getStorage({
      key: 'system_num',
      fail() {
        wx.setStorage({
          key: 'system_num',
          data: true
        })
      }
    })
    wx.getStorage({
      key: 'anonymous',
      fail() {
        wx.setStorage({
          key: 'anonymous',
          data: false
        })
      }
    })
    wx.getStorage({
      key: 'anonymousName',
      fail() {
        wx.setStorage({
          key: 'anonymousName',
          data: '匿名用户^_^'
        })
      }
    })
    wx.getStorage({
      key: 'bg_color',
      fail() {
        wx.setStorage({
          key: 'bg_color',
          data: 'F2F3F5'
        })
      }
    })
    wx.getStorage({
      key: 'user_bg_color',
      fail() {
        wx.setStorage({
          key: 'user_bg_color',
          data: '0188FB'
        })
      }
    })
    wx.getStorage({
      key: 'other_bg_color',
      fail() {
        wx.setStorage({
          key: 'other_bg_color',
          data: 'FFFFFF'
        })
      }
    })
    wx.getStorage({
      key: 'user_font_color',
      fail() {
        wx.setStorage({
          key: 'user_font_color',
          data: 'FFFFFF'
        })
      }
    })
    wx.getStorage({
      key: 'other_font_color',
      fail() {
        wx.setStorage({
          key: 'other_font_color',
          data: '000000'
        })
      }
    })
    wx.getStorage({
      key: 'font_size',
      fail() {
        wx.setStorage({
          key: 'font_size',
          data: '32'
        })
      }
    })
    wx.getStorage({
      key: 'chat_history',
      fail() {
        let temp = []
        wx.setStorage({
          key: 'chat_history',
          data: temp
        })
      }
    })
    setTimeout(function () {
      wx.hideLoading()
      that.intoChatroon()
    }, 1200)
  },

  onShow: function () {
    let that = this
    if (that.data.isHide == true) {
      wx.showLoading({
        title: '正在退出聊天室'
      })
      setTimeout(function () {
        wx.hideLoading()
        wx.navigateBack({
          delta: 1
        })
      }, 1600)
    }
  },

  onHide: function () {
    let that = this
    that.setData({
      isHide: true
    })
  },

  intoChatroon: function () {
    wx.getStorage({
      key: 'page_state',
      success(res) {
        if (res.data == true) {
          wx.navigateTo({
            url: '/pages/chat/chatLQ/chatLQ'
          })
        } else {
          wx.navigateTo({
            url: '/pages/chat/chatHQ/chatHQ'
          })
        }
      },
      fail() {
        wx.setStorage({
          key: 'page_state',
          data: true
        })
        wx.navigateTo({
          url: '/pages/chat/chatLQ/chatLQ'
        })
      }
    })
  },
})