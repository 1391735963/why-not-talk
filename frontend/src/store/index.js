import { defineStore } from "pinia";
import { ref } from "vue";
export default defineStore("counter", () => {
  const login = ref(false);
  const userName = ref(localStorage.token);
  const submit = ref();
  const chatBox = ref(true);
  const myName = ref();
  const userList = ref();
  const videoChat = ref(true);
  const back = ref();
  const myVideo = ref();
  const otherVideo = ref();
  const connectUri = ref(localStorage.connectUri);
  return {
    login,
    userName,
    submit,
    chatBox,
    myName,
    userList,
    videoChat,
    back,
    myVideo,
    otherVideo,
    connectUri,
  };
});
