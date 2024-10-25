const WebSocket = require("ws");
const ServerConfig = require("../config/index.js");
class CWS {
  wsObj = null;
  webSocketServer = null;
  startTime = null;
  name = null;
  avatar = null;
  constructor() {
    this.webSocketServer = new WebSocket.Server({
      port: ServerConfig.websocketPort,
    });
    this.webSocketServer.on("connection", (ws) => {
      console.log("WS connected");
      this.wsObj = ws;
      ws.on("close", () => {
        console.log("WS disconnected");
      });
    });
  }
}

module.exports = CWS;
