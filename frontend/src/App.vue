<template>
  <!-- <NavBar/> -->
  <router-view/>
</template>

<script>
export default {
name: 'App',
setup() {
  document.getElementById('loadingPage').remove()
}
}
</script>
<!-- <script setup>
// import NavBar from "@/components/NavBar/index.vue"
</script> -->
<style lang="less"></style>
