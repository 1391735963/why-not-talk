<template>
  <div class="login-container">
    <video id="myVideo" src="http://www.w3school.com.cn/i/movie.mp4" class="myVideo" muted></video>
    <video id="otherVideo" src="http://www.w3school.com.cn/i/movie.mp4" class="otherVideo"></video>
    <button id="back" v-if="!back">挂断</button>
  </div>
</template>

<script setup>
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { initSocket } from '../../utils/socket';
import { storeToRefs } from 'pinia';
import {ipc} from '../../utils/ipcRenderer';
import {ipcApiRoute} from '../../api/main';
import storeIndex from "@/store/index";

const router = useRouter();
const store = storeIndex();

const { userName, login, connectUri, chatBox, userList, videoChat, back } = storeToRefs(store);
const formState = reactive({
  userName: null,
  houseOwner:null
})

const onFinish = (values) => {
  connectUri.value = formState.houseOwner
  userName.value = formState.userName
  initSocket(formState.userName)
  router.push("/hall")
};

const onFinishFailed = (errorInfo) => {
  
};

const sendMessage = (params) => {
  ipc.invoke(ipcApiRoute.floatWindow , {name:'张三'}).then(r => {
	// r为返回的数据
  console.log(r);
})
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #000;
  #myVideo{
    width: 25%;
    height: 25%;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 10px;
  }
  #otherVideo{
    width: 100%;
    height: 100%;
  }
}

</style>
