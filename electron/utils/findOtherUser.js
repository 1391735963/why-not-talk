const dgram = require("dgram-as-promised");
class FindOtherUser {
  constructor(mode) {
    switch (mode) {
      case "service":
        this.serivce();
        break;
      case "client":
        this.client();
        break;
      case "fullduplex":
        this.serivce();
        this.client();
        break;
    }
  }

  serivce() {
    const port = 11451; // 端口号

    // 创建 UDP 套接字
    const server = dgram.createSocket("udp4");

    // 监听消息
    server.on("message", (msg, rinfo) => {
      console.log(
        `Received request from ${rinfo.address}:${rinfo.port} - ${msg.toString()}`
      );
      const response = `Server at ${rinfo.address}:${port}`;
      server
        .send(response, 0, response.length, rinfo.port, rinfo.address)
        .catch((err) => {
          console.error("Error sending response:", err);
        });
    });

    // 绑定套接字
    server
      .bind(port)
      .then(() => {
        console.log(`Server listening on port ${port}`);
      })
      .catch((err) => {
        console.error("Error binding server:", err);
      });
  }
  client() {
    const broadcastAddress = "255.255.255.255"; // 广播地址
    const port = 11451; // 端口号

    // 创建 UDP 套接字
    const client = dgram.createSocket("udp4");

    // 监听消息
    client.on("message", (msg, rinfo) => {
      console.log(
        `Received response from ${rinfo.address}:${rinfo.port} - ${msg.toString()}`
      );
    });

    // 绑定套接字
    client
      .bind()
      .then(() => {
        const message = Buffer.from("FindServer");
        client.setBroadcast(true);
        return client.send(message, 0, message.length, port, broadcastAddress);
      })
      .catch((err) => {
        console.error("Error binding or sending broadcast:", err);
      });
  }
}
FindOtherUser.toString = () => "[class FindOtherUser]";
module.exports = FindOtherUser;
