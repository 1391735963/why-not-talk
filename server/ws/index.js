const WebSocket = require("ws");
const ServerConfig = require("../config/index.js");
class CWS {
  wsObj = null;
  webSocketServer = null;
  startTime = null;
  userName = null;
  avatar = null;
  initMessage = null;
  constructor() {
    this.webSocketServer = new WebSocket.Server({
      host: "127.0.0.1",
      port: ServerConfig.websocketPort,
    });
    this.webSocketServer.on("connection", (ws) => {
      console.log("WS connected");
      ws.on("message", (e) => {
        this.initMessage = JSON.parse(e.toString());
        if (this.initMessage.code === 404) {
          return;
        }
        if (this.initMessage.code === 100) {
          this.userName = this.initMessage.data.userName;
          this.avatar = this.initMessage.data.avatar;
          this.startTime = this.initMessage.data.startTime;
        }
        this.wsObj = ws;
        console.log("🚀 ~ CWS ~ ws.on ~ e:", typeof e, e.toString());
      });
      ws.on("close", () => {
        console.log("WS disconnected");
      });
    });
  }
}

module.exports = new CWS();
