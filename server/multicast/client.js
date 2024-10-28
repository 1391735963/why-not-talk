const PORT = 4000;
const MULTICAST_ADDR = "224.0.0.215";
const CWS = require("../ws/index.js");
const cws = CWS;

const dgram = require("dgram");
const process = require("process");
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
let clientArr = [];
getLocalIPV4().forEach((item, index) => {
  console.log("🚀 ~ getLocalIPV4 ~ item client:", item);
  clientArr[index] = dgram.createSocket("udp4");
  clientArr[index].on("listening", function () {
    var address = clientArr[index].address();
    console.log(
      "UDP Client listening on " + address.address + ":" + address.port
    );
    clientArr[index].setBroadcast(true);
    clientArr[index].setMulticastTTL(128);
    clientArr[index].addMembership("239.1.1.1");
  });
  clientArr[index].on("message", function (message, remote) {
    console.log(
      "From: " + remote.address + ":" + remote.port + " - " + message
    );
    if (getLocalIPV4().some((ip) => ip === remote.address)) {
      return;
    }
    let tempObj = JSON.parse(message.toString());
    tempObj.data.ip = remote.address;
    const findUserObj = JSON.stringify(tempObj);
    if (!!cws.wsObj) {
      cws.wsObj.send(findUserObj);
    }
  });
  clientArr[index].bind(PORT, item);
});
