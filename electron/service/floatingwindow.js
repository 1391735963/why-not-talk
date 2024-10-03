"use strict";
const Log = require("ee-core/log");

const { Service } = require("ee-core");

/**
 * 示例服务（service层为单例）
 * @class
 */
class FloatingWindowService extends Service {
  constructor(ctx) {
    super(ctx);
    Log.info("注册");
  }

  /**
   * floatWindow
   */
  async float(args) {
    let obj = {
      status: "ok",
      params: args,
    };

    return obj;
  }
}

FloatingWindowService.toString = () => "[class FloatingWindowService]";
module.exports = FloatingWindowService;
