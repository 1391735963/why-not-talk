const dgram = require("dgram");
const WebSocket = require("ws");
const serverPort = 11451;
const clientPort = 11452;
const host = "127.0.0.1";
const serverIp = "239.255.255.253";
const clientIp = "239.255.255.254";
const broadcastAddress = "239.255.255.254";

const server = dgram.createSocket("udp4");
const client = dgram.createSocket("udp4");
const webSocketServer = new WebSocket.Server({ port: 11453 });
let wsObj = {};
// 服务
server.on("listening", function () {
  server.setMulticastTTL(128);
  server.addMembership(serverIp);
});
setInterval(broadCast, 1000);
function broadCast() {
  console.log("broadcast");
  let buf = new Buffer(new Date().toLocaleString());
  server.send(buf, 0, buf.length, serverPort, serverIp);
}
// 客户端
client.on("listening", function () {
  client.addMembership(serverIp);
});
client.on("message", function (message, remote) {
  wsObj.send(`[websocket云端]您已经连接云端!数据推送中!${wsObj}`);
  console.log(message.toString());
  console.log("get message");
});
client.bind(serverPort, "192.168.124.13");

console.log(
  "multicast is running",
  "serverPort",
  serverPort,
  "clientPort",
  clientPort
);

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
