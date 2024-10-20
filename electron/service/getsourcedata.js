"use strict";
const BaseSourceData = require("../pojo/basesourcedata");
const Log = require("ee-core/log");

const { Service } = require("ee-core");

/**
 * 示例服务（service层为单例）
 * @class
 */
class GetSourceDataService extends Service {
  constructor(ctx) {
    super(ctx);
    Log.info("注册");
  }

  /**
   * 获取当前本机IPV4地址
   * @param {*} ver
   * @returns
   */
  getLocalIPV4(ver = 4) {
    const interfaces = require("os").networkInterfaces();
    for (let netDev in interfaces) {
      for (let netProt of interfaces[netDev]) {
        if (
          netProt.family === `IPv${ver}` &&
          !netProt.internal &&
          netProt.address !== "127.0.0.1"
        ) {
          return new BaseSourceData(netProt.address);
        }
      }
    }
    return new BaseSourceData("", 404);
  }

  getLocalIPV6(ver = 6) {
    const interfaces = require("os").networkInterfaces();
    for (let netDev in interfaces) {
      for (let netProt of interfaces[netDev]) {
        if (
          netProt.family === `IPv${ver}` &&
          !netProt.internal &&
          netProt.address !== "127.0.0.1"
        ) {
          return new BaseSourceData(netProt.address);
        }
      }
    }
    return new BaseSourceData("", 404);
  }
}

GetSourceDataService.toString = () => "[class GetSourceDataService]";
module.exports = GetSourceDataService;
