from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

chatPort = 3000
chatClients = []


class Chat(WebSocket):

    def handleMessage(self):
        for client in chatClients:
            client.sendMessage(self.data)

    def handleConnected(self):
        chatClients.append(self)
        nums = r"""{ "content": "当前共有""" + str(
            len(chatClients)) + r"""人在线", "type": "system", "nickName": "", "avatarUrl": "" }"""
        for client in chatClients:
            client.sendMessage(nums)

    def handleClose(self):
        chatClients.remove(self)
        nums = r"""{ "content": "当前共有""" + str(
            len(chatClients)) + r"""人在线", "type": "system", "nickName": "", "avatarUrl": "" }"""
        for client in chatClients:
            client.sendMessage(nums)


server = SimpleWebSocketServer('', chatPort, Chat)
server.serveforever()
