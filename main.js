require("./server/index");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
const { ElectronEgg } = require("ee-core");
new ElectronEgg();
