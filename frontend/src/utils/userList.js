import { io } from "socket.io-client";
import { startVideoStream } from "./video";
import { socket } from "./socket";
import storeIndex from "../store/index";
import { storeToRefs } from "pinia";
const store = storeIndex();
const { userList, chatBox, login, videoChat } = storeToRefs(store);
function createChatList(data) {
  userList.value = Object.keys(data.userIds).filter((key) => {
    return data.userIds[key] !== localStorage.token;
  });
  console.log("userList.value", userList.value);
  // //新建用户列表
  // console.log(data.msg);
  // let userData = data.userIds;
  // let userList = document.querySelector("#userList");
  // if (userList) {
  //   userList.remove();
  //   userList = null;
  // }
  // userList = createEle(
  //   "ul",
  //   {},
  //   {
  //     id: "userList",
  //     className: "userList",
  //   }
  // );
  // chatBox.appendChild(userList);
  // for (let key in userData) {
  //   if (userData[key] != localStorage.token) {
  //     var li = createEle(
  //       "li",
  //       {},
  //       {
  //         textContent: userData[key],
  //       }
  //     );
  //     li.addEventListener("click", videoStart);
  //     userList.appendChild(li);
  //   }
  // }
}

function createEle(ele, style, attribute) {
  //新增标签，设置属性及样式
  let element = document.createElement(ele);
  if (style) {
    for (let key in style) {
      element.style[key] = style[key];
    }
  }
  if (attribute) {
    for (let key in attribute) {
      element[key] = attribute[key];
    }
  }
  return element;
}

function videoStart(otherId) {
  //用户点击列表某个用户时发送邀请至服务端
  socket.emit("inviteVideo", {
    myId: localStorage.token,
    otherId: otherId,
    type: "inviteVideo",
  });
}

function startVideoChat(otherId) {
  //初始化视频聊天
  videoChat.value = false;
  login.value = true;
  chatBox.value = true;
  localStorage.setItem("otherId", otherId); //将对方的id保存
  startVideoStream();
}

export { createChatList, startVideoChat, videoStart };
