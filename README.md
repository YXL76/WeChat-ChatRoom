# WeChat-ChatRoom

## 目录

- [WeChat-ChatRoom](#wechat-chatroom)
  - [目录](#目录)
  - [介绍](#介绍)
  - [使用](#使用)
  - [自定义参数](#自定义参数)
  - [开发记录](#开发记录)
  - [已知问题](#已知问题)
  - [未来计划](#未来计划)

## 介绍

微信聊天室小程序，使用[Mpx](https://mpxjs.cn)框架开发，也可以编译为其他平台的小程序

## 使用

```bash
# 安装依赖
yarn

# 构建
yarn build:prod

# 启动服务器
yarn server
```

之后将`dist/wx`文件夹导入开发者工具

## 自定义参数

- 小程序项目设置：`static/wx/project.config.json`
- 监听端口：修改`src/server.js`中的`port`和`src/pages/chat/index.ts`中的`URL`

## 开发记录

[Change Log](./CHANGELOG.md)

## 已知问题

- ~~当消息为`?`、 `;`等符号时不会自动换行。（无解？）~~
- ~~用户开启匿名选项时进入退出聊天室时仍会发送系统消息。~~

## 未来计划

- ~~匿名昵称、头像。~~
- ~~输入框渲染优化。~~
- ~~交互动画。~~
- 更多的颜色主题。（添加主题真是一个又费时间有没有成就感的事）
- ~~自己写的后端程序。~~
- ~~用`Typescript`重构逻辑层~~
