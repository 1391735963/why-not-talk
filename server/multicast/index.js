const dgram = require("dgram");
const ServerConfig = require("../config/index.js");
const BaseSouceData = require("../pojo/index.js");
const CWS = require("../ws/index.js");
const { times } = require("lodash");
const server = dgram.createSocket("udp4");
const client = dgram.createSocket("udp4");
const cws = new CWS();
// 服务
server.on("message", function (e1, e2) {
  // 本机不进行处理
  if (getLocalIPV4().some((ip) => ip === e2.address)) {
    return;
  }
  console.log("🚀 ~ e1:", e1.toString());
  let tempObj = JSON.parse(e1.toString());
  tempObj.data.ip = e2.address;
  const findUserObj = JSON.stringify(tempObj);
  cws.wsObj.send(JSON.stringify(findUserObj));
});
server.on("listening", function () {
  console.log("server is listening2");
});
server.bind(ServerConfig.udpServerPort);
// 客户端
client.bind((params) => {
  client.setBroadcast(true);
});
setInterval(() => {
  console.log("send message");
  const findUserObj = new BaseSouceData({
    time: Date.now(),
    userName: null,
    startTime: null,
    avatar: null,
  });
  const message = Buffer.from(JSON.stringify(findUserObj), "utf-8");
  client.send(
    message,
    0,
    message.length,
    ServerConfig.udpServerPort,
    ServerConfig.multicastIp
  );
}, 1000 * 5);

console.log(
  "multicast is running",
  "serverPort",
  ServerConfig.udpServerPort,
  "clientPort",
  ServerConfig.udpClientPort
);

const getLocalIPV4 = (ver = 4) => {
  const interfaces = require("os").networkInterfaces();
  let ips = [];
  for (let netDev in interfaces) {
    for (let netProt of interfaces[netDev]) {
      if (
        netProt.family === `IPv${ver}` &&
        !netProt.internal &&
        netProt.address !== "127.0.0.1"
      ) {
        ips.push(netProt.address);
      }
    }
  }
  return ips;
};
