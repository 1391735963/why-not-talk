"use strict";

const { Controller } = require("ee-core");
const Log = require("ee-core/log");
const Services = require("ee-core/services");

/**
 * FloatingWindow
 * @class
 */
class FloatingWindowController extends Controller {
  constructor(ctx) {
    super(ctx);
    Log.info("注册");
  }

  /**
   * 所有方法接收两个参数
   * @param args 前端传的参数
   * @param event - ipc通信时才有值。详情见：控制器文档
   */

  /**
   * floatWindow
   */
  async float() {
    const result = await Services.get("floatingwindow");
    Log.info("service result:", result);

    return "hello electron-egg";
  }
}

FloatingWindowController.toString = () => "[class FloatingWindowController]";
module.exports = FloatingWindowController;
