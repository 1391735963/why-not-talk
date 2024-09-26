<template>
    <a-spin tip="等待其他成员加入" :spinning="spin">
    <a-list item-layout="horizontal" :data-source="userList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
          description="房间成员"
        >
          <template #title>
            <a href="https://www.antdv.com/">{{ item }}</a>
          </template>
          <template #avatar>
            <a-avatar src="https://img1.baidu.com/it/u=1264631825,3307569&fm=253&fmt=auto&app=120&f=JPEG?w=666&h=500" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
  </a-spin>
</template>

<script setup>
import storeIndex from "@/store/index";
import {computed} from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();
const store = storeIndex();
const { userName, login, connectUri, chatBox, userList, videoChat, back } = storeToRefs(store);
console.log("userList",userList)
const spin = computed(() => {
    if (userList.value) {
        return false
    }
    return true
})

</script>

<style lang="scss" scoped>

</style>