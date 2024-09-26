<template>
  {{ login }}
  {{ chatBox }}
  {{ videoChat }}

  <div v-if="!login" class="loginBox">
    <input
      id="userName"
      autocomplete="false"
      class="userName"
      type="text"
      placeholder="请输入英文用户名"
      v-model="userName"
    />
    <input type="text" v-model="connectUri" placeholder="输入主机ip">
    <button id="submit" @click="submit">提交</button>
  </div>
  <div v-if="!chatBox" class="chatBox">
    <h1 id="myName" class="myName">{{ userName }}</h1>
    <ul id="userList" class="userList">
      <li v-for="(item,key) in userList" @click="videoStart(item)">{{ item }}</li>
    </ul> 
  </div>
  <div v-if="!videoChat" class="videoChat">
    <button id="back" v-if="!back">结束</button>
    <video id="myVideo" src="" class="myVideo" muted></video>
    <video id="otherVideo" src="" class="otherVideo"></video>
  </div>
</template>

<script setup>
import { checkToken } from './index.js';
import {videoStart } from "@/utils/userList"
import storeIndex from "@/store/index";
import { storeToRefs } from 'pinia';
const store = storeIndex();

const { userName, login, connectUri, chatBox, userList, videoChat, back } = storeToRefs(store);

checkToken();
function submit() {
  initSocket(userName.value); //初始化socket连接
}
</script>

<style lang="scss" scoped></style>
