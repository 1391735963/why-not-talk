class BaseSouceData {
  obj = {
    code: 200,
    data: {},
    msg: "",
  };
  /**
   * 格式化返回数据
   * @param {obj} data 传递到前端的数据
   * @param {number} code 状态码，同HTTP状态码
   * @param {string} msg 消息
   */
  constructor(data, code = 200, msg) {
    this.obj.data = data;
    this.obj.code = code;
  }
  getData() {
    return { ...this.obj };
  }
}

module.exports = BaseSouceData;
