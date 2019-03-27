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

2019-03-27 &nbsp;&nbsp;&nbsp;&nbsp; v1.2.0

- 设置界面增加匿名、颜色、字体大小选项。

- 修复了消息框错位的问题。（这个问题困扰了我好久了，主要是对`CSS`盒子模型理解不够透彻）

2019-03-04 &nbsp;&nbsp;&nbsp;&nbsp; v1.1.0

- 新增了设置界面，目前可单独设置是否显示系统消息。

- 更新自动滚动规则，当有系统消息时不自动滚动。

2019-03-04 &nbsp;&nbsp;&nbsp;&nbsp; v1.0.1

- 解决键盘弹起后消息列表被遮挡问题。

2019-03-04 &nbsp;&nbsp;&nbsp;&nbsp; v1.0.0

- 测试版。

## 已知问题

- 当消息为`?`, `;`等符号时不会自动换行。（无解？）

## 未来计划

（其实半小时就能搞定，但我懒得弄了）

- 匿名昵称、头像。

- 输入框渲染优化。

- 交互动画。
