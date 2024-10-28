const dgram = require("dgram");
const BaseSourceData = require("../pojo/index.js");
const CWS = require("../ws/index.js");
const cws = CWS;
const PORT = 4000;
let arr = [];
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

getLocalIPV4().forEach((item, index) => {
  console.log("🚀 ~ getLocalIPV4 ~ item: server", item);
  arr[index] = dgram.createSocket("udp4");

  arr[index].bind(PORT, item, function () {
    arr[index].setBroadcast(true);
    arr[index].setMulticastTTL(128);
    setInterval(() => {
      sendMessage(arr[index], item);
      console.log("🚀 ~ sendMessage ~ item:", item);
    }, 2000);
  });
});

const sendMessage = function (server, ip) {
  console.log("Sent " + message + " to the wire..." + ip);
  const findUserObj = new BaseSourceData({
    time: Date.now(),
    userName: cws.userName,
    startTime: cws.startTime,
    avatar: cws.avatar,
  });
  const message = Buffer.from(JSON.stringify(findUserObj));
  server.send(message, 0, message.length, PORT, "239.1.1.1");
};
