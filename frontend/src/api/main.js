/**
 * 主进程与渲染进程通信频道定义
 * Definition of communication channels between main process and rendering process
 */
/**
 * 
 */
const ipcApiRoute = {
  test: "controller.example.test",
  floatWindow: "controller.floatingwindow.float",
  getLocalIPV4: "controller.getsourcedata.getLocalIPV4",
  getLocalIPV6: "controller.getsourcedata.getLocalIPV6",
};

export { ipcApiRoute };
