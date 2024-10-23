const dgram = require("dgram");
const WebSocket = require("ws");
const serverPort = 11451;
const clientPort = 11452;
const broadcastAddress = "255.255.255.255";

const socket = dgram.createSocket("udp4");
const webSocketServer = new WebSocket.Server({ port: 11453 });
let wsObj = {};
console.log(
  "multicast is running",
  "serverPort",
  serverPort,
  "clientPort",
  clientPort
);
socket.on("listening", () => {
  const address = socket.address();
  console.log(`Socket listening on ${address.address}:${address.port}`);
});

socket.on("message", (msg, rinfo) => {
  const message = msg.toString();
  console.log(
    `Received message from ${rinfo.address}:${rinfo.port}: ${message}`
  );

  // 检查消息来源，避免自监听
  if (rinfo.address !== "127.0.0.1" && rinfo.port !== clientPort) {
    if (message === "DISCOVER") {
      const response = "SERVER_INFO:127.0.0.1:27015";
      socket.send(
        response,
        0,
        response.length,
        rinfo.port,
        rinfo.address,
        (err) => {
          if (err) {
            console.error("Error sending response:", err);
          }
        }
      );
      if (!!wsObj) {
        wsObj.send({
          ip: rinfo.address,
          port: rinfo.port,
          timeStamp: Date.now(),
        });
      }
    } else if (message.startsWith("SERVER_INFO")) {
      console.log("Discovered server:", message);
    }
  }
});

socket.bind(clientPort, () => {
  const message = Buffer.from("DISCOVER");
  socket.setBroadcast(true); // 允许发送广播消息
  socket.send(
    message,
    0,
    message.length,
    serverPort,
    broadcastAddress,
    (err) => {
      if (err) {
        console.error("Error sending discovery message:", err);
      } else {
        console.log("Discovery message sent");
      }
    }
  );
});

webSocketServer.on("connection", (ws) => {
  console.log("WS connected");
  wsObj = ws;
  ws.send(`[websocket云端]您已经连接云端!数据推送中!`);
  let index = 1;
  const interval = setInterval(() => {
    ws.send(`[websocket]数据推送第${index}次`);
    index++;
  }, 1000 * 10);

  ws.on("close", () => {
    clearInterval(interval); // 清除定时器
    console.log("[服务器]：客官下次再来呢~");
  });
});
