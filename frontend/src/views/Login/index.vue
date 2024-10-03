<template>
  <div class="login-container">
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
        <a-form-item label="房主局域网IP"
          name="houseOwner"
          :rules="[{ required: true, message: '输入房主局域网IP' }]">
          <a-input v-model:value="formState.houseOwner">
          </a-input>
        </a-form-item>
        <a-form-item >
      <a-button type="primary" html-type="submit">进入</a-button>
    </a-form-item>
      </a-form>
    </div>
    <!-- <button @click="sendMessage">向electron发送消息</button> -->
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
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  & > div {
    height: 50%;
    width: 50%;
  }
}
</style>
