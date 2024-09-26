import { initSocket } from "@/utils/socket";
import router from "@/router";
const checkToken = () => {
  console.log("localStorage.token", localStorage.token);

  if (localStorage.token) {
    // login.value = true;
    // chatBox.value = false;
    initSocket(localStorage.token); //初始化socket连接
  } else {
    // login.value = false;
    // chatBox.value = true;
    console.log(router);
    router.push("login");
  }
};

export { checkToken };
