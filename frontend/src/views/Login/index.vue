<template>
  <!-- <div class="login-container">
    <div>
      <a-form
        :model="formState"
        name="basic"
        
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="昵称"
          name="userName"
          :rules="[{ required: true, message: 'man！where is your user name?' }]"
        >
          <a-input v-model:value="formState.userName" placeholder="">
            <template #prefix>
              <user-outlined />
            </template>
<template #suffix>
              <a-tooltip title="随机名称">
                <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
              </a-tooltip>
            </template>
</a-input>
</a-form-item>
<a-form-item label="房主局域网IP" name="houseOwner" :rules="[{ required: true, message: '输入房主局域网IP' }]">
  <a-input v-model:value="formState.houseOwner">
  </a-input>
</a-form-item>
<a-form-item>
  
</a-form-item>
</a-form>
</div>
<button @click="sendMessage">向electron发送消息</button>
</div> -->
  <div class="login-container">

  </div>
  <div class="title">
    <span class="solid-title-font">
      WhyNotTalk
    </span>
    <span>

    </span>
  </div>
  <div class="input-container">
    <div v-if="!localUserName && localUserName ==null">
      <a-input v-model:value="formState.userName" placeholder="昵称">
        <template #prefix>
          <user-outlined />
        </template>
      </a-input>
      <a-button type="primary" @click="setUserName">确定</a-button>
    </div>
    <div v-else>
      <a-select v-model:value="formState.houseOwner" show-search placeholder="选择通话人" :options="options"
      style="width: 300px"
        @change="handleChange"
        @search="handleSearch"
        >
        <a-select-option v-if="unknowIp!==null" :value="unknowIp">{{ unknowIp }}</a-select-option>
        <a-select-option v-for="item in IPOptions" :value="item.ip" :key="item.ip">{{ item.name }}({{ item.ip }})</a-select-option>

      </a-select>
      <!-- <a-input v-model:value="formState.houseOwner" placeholder="房主IP地址" disabled="true"> -->
      <a-button type="primary" @click="onFinish">进入</a-button>
      <!-- </a-input> -->
    </div>
  </div>
</template>

<script setup>
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons-vue"
import { message } from 'ant-design-vue';;
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { initSocket, socket } from '../../utils/socket';
import { storeToRefs } from 'pinia';
import { ipc } from '../../utils/ipcRenderer';
import { ipcApiRoute } from '../../api/main';
import storeIndex from "@/store/index";

const router = useRouter();
const store = storeIndex();
const unknowIp = ref(null);
const localUserName = ref(localStorage.getItem("userName"));
const localHouse = ref(localStorage.getItem("houseOwner"))
const IPOptions = ref(
  [{
    name: '本机',
    ip: '',
    avatar:''
  }
  ]
)
const { userName, login, connectUri, chatBox, userList, videoChat, back } = storeToRefs(store);
const formState = reactive({
  userName: localUserName.value,
  houseOwner: localHouse.value
})
const ws = new WebSocket("ws://localhost:11453");
const onFinish = (values) => {
  connectUri.value = formState.houseOwner
  userName.value = formState.userName
  initSocket(formState.userName)
  router.push("/hall")
};
const handleChange = (val) => {
  console.log("🚀 ~ handleChange ~ val:", val)
  formState.houseOwner = val
  localStorage.setItem("houseOwner", val)
}
const handleSearch = (val) => {
  console.log("🚀 ~ handleSearch ~ val:", val)
  if (!val) {
    unknowIp.value = null
    return;
  }
  const isInclude = IPOptions.value.some(item => item.ip.includes(val))
  // 若不存在
  if (!isInclude) {
    unknowIp.value = val
  }
  formState.houseOwner = val
  localStorage.setItem("houseOwner", val)
}

const onFinishFailed = (errorInfo) => {

};

const sendMessage = (params) => {
  ipc.invoke(ipcApiRoute.floatWindow, { name: '张三' }).then(r => {
    // r为返回的数据
    console.log(r);
  })
}
sendMessage();

const getIPV4 = (params) => {
  ipc.invoke(ipcApiRoute.getLocalIPV4).then(r => {
    IPOptions.value[0].ip = r.obj.data
    // r为返回的数据
    console.log(r);
  })
}
getIPV4();
const setUserName = (params) => {
  if (!formState.userName) {
    message.error("需要用户名")
    return;
  }
  localStorage.setItem("userName", formState.userName)
  localUserName.value = formState.userName;
  console.log(params);
}

ws.onopen = () => {
  console.log("websocket connected");
}
ws.onmessage = (e) => {
  const receive = JSON.parse(e.data)
  const isInclude = IPOptions.value.some(item => item.ip.includes(val))
  IPOptions.value.push({
    name: receive.userName,
    ip: receive.ip,
    avatar:''
  })
  console.log()
}

</script>

<style lang="less" scoped>
@media screen and (min-width: 800px) {
  .title {
    .solid-title-font {
      font-size: 70px;
    }
  }
}

@media screen and (min-width: 1920px) {
  .title {
    .solid-title-font {
      font-size: 100px;
    }
  }
}

.login-container {
  height: 100%;
  width: 100%;
  // filter: blur(4px);
  filter: grayscale(0.45);
  background: #ccc url('../../assets/background.jpg') no-repeat 0 0 fixed;
  background-size: 100% 100%;
  background-origin: padding-box;
  background-clip: border-box;
  overflow: hidden;
}

.title {
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 0;
  filter: none;
  height: 100%;
  // width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;

  .solid-title-font {

    font-weight: bolder;
    text-align: left;
    color: #fff;
  }
}

.input-container {
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
  
  &>div>* {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
