# WeChat-ChatRoom

## 介绍

微信聊天室小程序，花了`3`天左右的时间开发出了一个`demo`。

前端配色来自`TIM`，不够完善，比如键盘升起时的界面、消息框的位置。

后端用到了`python`的[simple-websocket-server](https://github.com/dpallot/simple-websocket-server)

## 安装

1. 启动`server`文件夹中的`python`脚本

   ```
   python3 server.py
   ```

2. 将`client`文件夹导入微信开发者工具

3. 修改`AppID`

4. 修改`chat.js`中的`url`

## 开发记录

2019-03-04    v1.1.0    

- 新增了设置界面，目前可单独设置是否显示系统消息。
- 更新自动滚动规则，当有系统消息时不自动滚动。

2019-03-03    v1.0.1

- 解决键盘弹起后消息列表被遮挡问题。

2019-03-01    v1.0.0    

- 测试版。
