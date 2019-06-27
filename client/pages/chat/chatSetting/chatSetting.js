// pages/char/chatSeeting/chatSeeting.js

Page({
  data: {
    system_in: true,
    system_out: true,
    system_num: true,
    anonymous: false,
    page_state: false,
    anonymousName: '匿名用户^_^',
    bg_color: 'F2F3F5',
    user_bg_color: '0188FB',
    other_bg_color: 'FFFFFF',
    user_font_color: 'FFFFFF',
    other_font_color: '000000',
    font_size: '32',
  },

  onLoad: function () {
    let that = this
    wx.getStorage({
      key: 'page_state',
      success(res) {
        that.setData({
          page_state: res.data,
        })
      },
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
    wx.getStorage({
      key: 'bg_color',
      success(res) {
        that.setData({
          bg_color: res.data,
        })
      },
    })
    wx.getStorage({
      key: 'user_bg_color',
      success(res) {
        that.setData({
          user_bg_color: res.data,
        })
      },
    })
    wx.getStorage({
      key: 'other_bg_color',
      success(res) {
        that.setData({
          other_bg_color: res.data,
        })
      },
    })
    wx.getStorage({
      key: 'user_font_color',
      success(res) {
        that.setData({
          user_font_color: res.data,
        })
      },
    })
    wx.getStorage({
      key: 'other_font_color',
      success(res) {
        that.setData({
          other_font_color: res.data,
        })
      },
    })
    wx.getStorage({
      key: 'font_size',
      success(res) {
        that.setData({
          font_size: res.data,
        })
      },
    })
  },

  onUnload: function () {
    let that = this
    wx.setStorage({
      key: 'system_in',
      data: that.data.system_in
    })
    wx.setStorage({
      key: 'system_out',
      data: that.data.system_out
    })
    wx.setStorage({
      key: 'system_num',
      data: that.data.system_num
    })
    wx.setStorage({
      key: 'anonymous',
      data: that.data.anonymous
    })
    wx.setStorage({
      key: 'anonymousName',
      data: that.data.anonymousName
    })
    wx.setStorage({
      key: 'page_state',
      data: that.data.page_state
    })
    wx.setStorage({
      key: 'bg_color',
      data: that.data.bg_color
    })
    wx.setStorage({
      key: 'anonymousName',
      data: that.data.anonymousName
    })
    wx.setStorage({
      key: 'user_bg_color',
      data: that.data.user_bg_color
    })
    wx.setStorage({
      key: 'other_bg_color',
      data: that.data.other_bg_color
    })
    wx.setStorage({
      key: 'user_font_color',
      data: that.data.user_font_color
    })
    wx.setStorage({
      key: 'other_font_color',
      data: that.data.other_font_color
    })
    wx.setStorage({
      key: 'font_size',
      data: that.data.font_size
    })
  },

  changeState: function () {
    let that = this
    if (that.data.page_state == true) {
      that.setData({
        page_state: false,
      })
    } else {
      that.setData({
        page_state: true,
      })
    }
  },

  changeIn: function () {
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

  changeOut: function () {
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

  changeNum: function () {
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

  changeAno: function () {
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

  changeName: function (e) {
    let that = this
    if (e.detail.value == '') {
      that.setData({
        anonymousName: '匿名用户^_^',
      })
    } else {
      that.setData({
        anonymousName: e.detail.value,
      })
    }
  },
  
  changeBC: function (e) {
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

  changeUBC: function (e) {
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

  changeUFC: function (e) {
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

  changeOBC: function (e) {
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

  changeOFC: function (e) {
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

  changeFS: function (e) {
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