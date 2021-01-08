const WebSocket = require("ws");

const port = 3000;

const wss = new WebSocket.Server({ port });

wss.on("listening", () => {
  console.log(`listensing on port ${port}`);
});

const broadcast = (msg) => {
  wss.clients.forEach((ws) => {
    ws.send(msg);
  });
};

wss.on("connection", (ws) => {
  broadcast(
    JSON.stringify({
      content: `当前共有${wss.clients.size}人在线`,
      type: "system",
    }),
  );

  ws.on("close", () => {
    broadcast(
      JSON.stringify({
        content: `当前共有${wss.clients.size}人在线`,
        type: "system",
      }),
    );
  });

  ws.on("message", (data) => {
    console.log(data);
    broadcast(data);
  });
});
