const ServerConfig = {
  // webrtc呼叫端口，传统Http实现
  webRTCServicePort: 1024,
  // UDP组播端口
  multicastPort: 26554,
  // UDP服务端口
  udpServerPort: 26555,
  //   UDP客户端端口
  udpClientPort: 26556,
  //   UDP组播IP
  multicastIp: "224.0.0.215",
  //   websocket端口
  websocketPort: 26557,
};
module.exports = ServerConfig;
