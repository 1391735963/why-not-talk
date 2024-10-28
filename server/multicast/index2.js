const PORT = 20000;
const MULTICAST_ADDR = "224.0.0.5";
const BaseSourceData = require("../pojo/index.js");

const dgram = require("dgram");
const process = require("process");
const CWS = require("../ws/index.js");
const cws = CWS;

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
  arr[index] = dgram.createSocket("udp4", { type: "udp4", reuseAddr: true });

  arr[index].bind(PORT, item);

  arr[index].on("listening", function () {
    arr[index].addMembership(MULTICAST_ADDR);
    arr[index].setBroadcast(true);
    setInterval(() => {
      sendMessage(address);
    }, 2500);
    const address = arr[index].address();
    console.log(
      `UDP socket listening on ${address.address}:${address.port} pid: ${
        process.pid
      }`
    );
  });

  function sendMessage(address) {
    const findUserObj = new BaseSourceData({
      time: Date.now(),
      userName: cws.userName,
      startTime: cws.startTime,
      avatar: cws.avatar,
    });
    const message = Buffer.from(JSON.stringify(findUserObj));
    arr[index].send(
      message,
      0,
      message.length,
      PORT,
      MULTICAST_ADDR,
      function () {
        console.info(`Sending message "${message}"`);
      }
    );
  }

  arr[index].on("message", function (message, rinfo) {
    if (getLocalIPV4().some((ip) => ip === rinfo.address)) {
      return;
    }
    let tempObj = JSON.parse(message.toString());
    tempObj.data.ip = rinfo.address;
    const findUserObj = JSON.stringify(tempObj);
    if (!!cws.wsObj) {
      cws.wsObj.send(findUserObj);
    }
    console.info(`Message from: ${rinfo.address}:${rinfo.port} - ${message}`);
  });
});
