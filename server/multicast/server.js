const dgram = require("dgram");
const server = dgram.createSocket("udp4");

const PORT = 4000;

server.bind(function () {
  server.setBroadcast(true);
  server.setMulticastTTL(128);
  setInterval(sendMessage, 2000);
});

const sendMessage = function () {
  const message = new Buffer("multicast test message");
  server.send(message, 0, message.length, PORT, "239.1.1.1");
  console.log("Sent " + message + " to the wire...");
};
