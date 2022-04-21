<template>
  <div class="container">
    <img class="standing" :src="content.standing.path" />
    <div class="option-block" v-if="content.options?.length > 0">
      <div v-for="(option, index) in content.options" :key="index">
        <el-button @click="clickOption(option)">
          {{ option.text }}
        </el-button>
      </div>
    </div>
    <div class="message-block">
      <div>
        <div class="name">{{ content.speaker }}</div>
        <div class="to-previous" @click="toPrevious">返回上句</div>
        <div class="message" @click="toNext">
          {{ content.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, reactive, defineProps } from "vue";
  const props = defineProps({ contents: { type: Array, default: () => [{}] }, startKey: { type: String } });
  const key = ref(props.startKey);
  const content_stack = reactive([]);

  const content = computed(() => {
    return props.contents[key.value];
  });

  const toNext = () => {
    if (content.value.next_key) {
      content_stack.push(key.value);
      key.value = content.value.next_key;
    }
  };
  const toPrevious = () => {
    if (content_stack.length > 0) {
      key.value = content_stack.pop();
    }
  };
  const clickOption = (option) => {
    content_stack.push(key.value);
    key.value = option.next_key;
  };
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 600px;
    overflow: hidden;
    background-color: #ddd;
    border-radius: 30px;
    user-select: none;
    background-image: url("@/asset/image/background/tower-nochara.jpg");
    background-size: 100%;
    background-position: center;
    @media (max-width: 1200px) {
      background-size: auto 100%;
    }

    .standing {
      height: 165%;
      position: absolute;
      top: 0px;
    }
    .message-block {
      position: absolute;
      width: 90%;
      height: 150px;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 25px;
      bottom: 4vh;
      > div {
        position: relative;
        height: 100%;
        widows: 100%;

        .name {
          position: absolute;
          width: 150px;
          height: 40px;
          top: -20px;
          left: 25px;
          line-height: 40px;
          text-align: center;
          border-radius: 10px;
          background-color: rgba(0, 0, 0, 0.8);
          color: #eee;
          font-size: 18px;
          font-weight: 700;
          @media (max-width: 768px) {
            width: 100px;
          }
        }
        .to-previous {
          position: absolute;
          width: 100px;
          height: 30px;
          top: -15px;
          right: 8%;
          line-height: 30px;
          text-align: center;
          border-radius: 5px;
          background-color: rgba(50, 50, 50, 0.8);
          color: #eee;
          font-weight: 700;
          cursor: pointer;
        }
        .message {
          padding: 35px;
          font-size: 2em;
          color: #000;
          @media (max-width: 768px) {
            font-size: 1em;
          }
        }
      }
    }
    .option-block {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      position: absolute;
      width: 200px;
      border-radius: 10px;
      row-gap: 15px;
      padding: 15px;
      background-color: rgba(20, 20, 20, 0.9);
      z-index: 2010;
      > div {
        text-align: center;
        width: 200px;
        .el-button {
          width: 150px;
          font-weight: 700;
        }
      }
    }
  }
</style>
