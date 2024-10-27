const PORT = 4000;
const MULTICAST_ADDR = "224.0.0.215";

const dgram = require("dgram");
const process = require("process");

const client = dgram.createSocket({ type: "udp4" });
client.on("listening", function () {
  var address = client.address();
  console.log(
    "UDP Client listening on " + address.address + ":" + address.port
  );
  client.setBroadcast(true);
  client.setMulticastTTL(128);
  client.addMembership("239.1.1.1");
});

client.on("message", function (message, remote) {
  console.log("From: " + remote.address + ":" + remote.port + " - " + message);
});

client.bind(PORT);
