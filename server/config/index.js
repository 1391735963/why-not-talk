const ServerConfig = {
  // webrtc呼叫端口，传统Http实现
  webRTCServicePort: 1024,
  // UDP服务端口
  udpServerPort: 11451,
  //   UDP客户端端口
  udpClientPort: 11452,
  //   UDP组播IP
  multicastIp: "255.255.255.255",
  //   websocket端口
  websocketPort: 11453,
};
module.exports = ServerConfig;
