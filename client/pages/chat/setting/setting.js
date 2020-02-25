// pages/chat/setting/setting.js

Component({

    data: {
        settings: {
            theme: 'Grey',
            systemIn: true,
            systemOut: true,
            systemNum: true,
            anonymous: false,
            anonymousName: '匿名用户^_^'
        },
        themes: ['Grey', 'Blue-Gray', 'White', 'Black', 'Red', 'Pink',
            'Purple', 'Teal', 'Light-Green', 'Yellow', 'Brown'],
        options: [{
            title: '系统消息',
            subOptions: [{
                title: '进入消息',
                id: 'systemIn',
                type: 'switch'
            }, {
                title: '退出消息',
                id: 'systemOut',
                type: 'switch'
            }, {
                title: '人数消息',
                id: 'systemNum',
                type: 'switch'
            }]
        }, {
            title: '匿名',
            subOptions: [{
                title: '启用',
                id: 'anonymous',
                type: 'switch'
            }, {
                title: '昵称',
                id: 'anonymousName',
                type: 'input'
            }]
        }]
    },

    lifetimes: {

        attached: function () {
            const that = this
            wx.getStorage({
                key: 'theme',
                success(res) { that.setData({ ['settings.theme']: res.data }) }
            })
            wx.getStorage({
                key: 'systemIn',
                success(res) { that.setData({ ['settings.systemIn']: res.data }) }
            })
            wx.getStorage({
                key: 'systemOut',
                success(res) { that.setData({ ['settings.systemOut']: res.data }) }
            })
            wx.getStorage({
                key: 'systemNum',
                success(res) { that.setData({ ['settings.systemNum']: res.data }) }
            })
            wx.getStorage({
                key: 'anonymous',
                success(res) { that.setData({ ['settings.anonymous']: res.data }) }
            })
            wx.getStorage({
                key: 'anonymousName',
                success(res) { that.setData({ ['settings.anonymousName']: res.data, }) }
            })
        },

        detached: function () {
            const that = this
            wx.showLoading({ title: '保存中', mask: true })
            wx.setStorageSync('theme', that.data.settings.theme)
            wx.setStorageSync('systemIn', that.data.settings.systemIn)
            wx.setStorageSync('systemOut', that.data.settings.systemOut)
            wx.setStorageSync('systemNum', that.data.settings.systemNum)
            wx.setStorageSync('anonymous', that.data.settings.anonymous)
            wx.setStorageSync('anonymousName', that.data.settings.anonymousName)
            wx.hideLoading()
        }
    },

    methods: {

        changeTheme: function (event) {
            this.setData({
                ['settings.theme']: event.currentTarget.id
            })
        },

        changeSetting: function (event) {
            this.setData({
                ['settings.' + event.currentTarget.id]: event.detail.value
            })
        }
    }
})