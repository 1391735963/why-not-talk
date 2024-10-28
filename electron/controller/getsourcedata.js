"use strict";

const { Controller } = require("ee-core");
const Log = require("ee-core/log");
const Services = require("ee-core/services");

/**
 * FloatingWindow
 * @class
 */
class GetSourceDataContorller extends Controller {
  constructor(ctx) {
    super(ctx);
    Log.info("注册");
  }

  async getLocalIPV4() {
    const result = await Services.get("getsourcedata").getLocalIPV4();
    Log.info("service result:", result);
    return result;
  }
  async getLocalIPV6() {
    const result = await Services.get("getsourcedata").getLocalIPV6();
    Log.info("service result:", result);
    return "hello electron-egg";
  }
}

GetSourceDataContorller.toString = () => "[class GetSourceDataContorller]";
module.exports = GetSourceDataContorller;
