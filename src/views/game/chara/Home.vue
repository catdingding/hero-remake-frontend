<template>
  <div>
    <el-scrollbar class="scrollbar">
      <div class="home">
        <div class="block" v-for="(char, index) in chars" :key="index">
          <input v-model="chars[index]" maxlength="1" />
        </div>
      </div>
    </el-scrollbar>
    <div style="width: 100%; text-align: center">
      <el-button type="success" @click="set_home({ chars })">儲存</el-button>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useStore } from "vuex";
  import { set_home } from "@/api/chara";

  const store = useStore();

  const chars = ref([]);

  onMounted(async () => {
    await store.dispatch("chara/get_chara_profile", { fields: "home" });
    chars.value = store.state.chara.chara_home.chars;
  });
</script>

<style lang="less" scoped>
  .scrollbar {
    width: 700px;
    max-width: 90vw;
    height: 700px;
  }
  .home {
    width: 680px;
    height: 680px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .block {
      width: 20px;
      height: 20px;
      position: relative;
      border: #aaa 1px solid;
      background-color: var(--color-white);
      input {
        width: 100%;
        height: 100%;
        text-align: center;
        padding: 0px;
      }
    }
  }
</style>
