<script setup lang="ts">
import Home from './components/Home.vue'

import { ref, watch, onMounted } from 'vue'
const clientHeight = ref("")
onMounted(() => {
  // 获取浏览器可视区域高度
  clientHeight.value = `${document.documentElement.clientHeight}`
  //document.body.clientWidth;
  //console.log(self.clientHeight);
  window.onresize = function temp() {
    clientHeight.value = `height: ${document.documentElement.clientHeight}px`;
  };
})

watch(clientHeight, (newHeight) => {
  changeFixed(clientHeight.value)
})

function changeFixed(clientHeigh: any) { //动态修改样式
  console.log(clientHeight.value);
  console.log();

  // console.log(this.$refs.homePage.$el.style.height);
  clientHeight.value = `height: ${clientHeigh.value - 20}px`;
}
</script>

<template>
  <div class="body">
    <el-container>

      <el-affix target=".body" :offset="10" class="head">
        <el-header style="height: 20px;">
          <h1>Oh-My-Theme</h1>
        </el-header>
      </el-affix>

      <el-main class="main">
        <Home />
      </el-main>
    </el-container>

  </div>
</template>


<style scoped>
.body {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.head {
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(43, 226, 83);
}

.main{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 80px;
  left: 0;
  background-color: aliceblue;
}
</style>
