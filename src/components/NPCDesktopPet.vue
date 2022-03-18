<template>
  <div class="container" :class="{ 'is-hidden': is_hidden }">
    <div>
      <el-icon
        :size="20"
        class="size-icon"
        @click="is_hidden = !is_hidden"
        @mouseover="is_mouse_on_close = true"
        @mouseleave="is_mouse_on_close = false"
      >
        <BottomRight v-show="!is_hidden" />
        <TopLeft v-show="is_hidden" />
      </el-icon>
      <img :src="image_src" v-show="!is_hidden" @click="click" />
      <div class="speech" v-show="!is_hidden">
        <div class="pixelart-to-css"></div>
        <div class="content">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, computed } from "vue";
  import { useStore } from "vuex";
  import { sample } from "lodash";
  import { BottomRight, TopLeft } from "@element-plus/icons";
  const store = useStore();
  const is_hidden = ref(false);

  const emotion = ref("happy");
  const is_mouse_on_close = ref(false);
  const image_src = computed(() => {
    if (is_mouse_on_close.value || click_count.value > 30) {
      return "/image/npc/system/sticker/angry.png";
    } else if (click_count.value > 15) {
      return "/image/npc/system/sticker/bothered.png";
    }
    return `/image/npc/system/sticker/${emotion.value}.png`;
  });

  const click_count = ref(0);
  setInterval(() => {
    click_count.value = Math.max(click_count.value - 10, 0);
  }, 10000);

  const selected_message = ref("");
  const message = computed(() => {
    if (is_mouse_on_close.value) {
      return "我這麼可愛，你竟然要關掉？";
    } else if (click_count.value > 15) {
      return "你也點得太頻繁了……";
    }
    return selected_message.value || `${store.state.chara.chara_name}，歡迎回來`;
  });

  const click = () => {
    click_count.value += 1;
    selected_message.value = sample(messages);
  };

  var messages = [
    "喵",
    "喵",
    "在魔王城，每次被摩擦都會增加1的戰數",
    "凡是每天掛機的玩家，電腦有高機率在10年內死去",
    "每戰鬥十次，總戰數就會增加10場",
    "誰能想得到，這個吸血鬼在開服時只是個菜鳥新手",
    "在第二象限地圖，當你移動時，冷卻時間就會增加一點點",
    "只要每天打三張神秘邀請函，十天後就能進10場無盡地城",
    "當你的奧石注入失敗時，你會損失2萬5的熟練度",
    "據說只要大聲喊出養窩，會降低遊戲難度",
    "無限冒險冷知識:魔王並不在魔王城喔",
    "別放棄轉職阿，你不是還有贊助點數嗎",
    "寶藏國研究報告顯示，掛得越久，總戰數越多",
    "雷國研究報告顯示，愛聊天的人都容易錯頻",
    "默認出生點為冒險者中心的沼地，歡迎感受來自GM的惡意",
  ];
</script>

<style lang="less" scoped>
  .container {
    width: 250px;
    height: 250px;
    border: 2px solid black;
    &.is-hidden {
      width: 20px;
      height: 20px;
    }
  }
  img {
    width: 100%;
    object-fit: contain;
  }
  .size-icon {
    position: absolute;
    cursor: pointer;
  }
  .speech {
    position: absolute;
    width: 100%;
    height: 200px;
    top: -200px;
    .content {
      padding: 30px;
      position: absolute;
      color: var(--text-color-primary);
    }
  }
  .pixelart-to-css {
    box-shadow: 30px 10px 0 0 rgba(0, 0, 0, 1), 40px 10px 0 0 rgba(0, 0, 0, 1), 50px 10px 0 0 rgba(0, 0, 0, 1),
      60px 10px 0 0 rgba(0, 0, 0, 1), 70px 10px 0 0 rgba(0, 0, 0, 1), 80px 10px 0 0 rgba(0, 0, 0, 1),
      90px 10px 0 0 rgba(0, 0, 0, 1), 100px 10px 0 0 rgba(0, 0, 0, 1), 110px 10px 0 0 rgba(0, 0, 0, 1),
      120px 10px 0 0 rgba(0, 0, 0, 1), 130px 10px 0 0 rgba(0, 0, 0, 1), 140px 10px 0 0 rgba(0, 0, 0, 1),
      150px 10px 0 0 rgba(0, 0, 0, 1), 160px 10px 0 0 rgba(0, 0, 0, 1), 170px 10px 0 0 rgba(0, 0, 0, 1),
      180px 10px 0 0 rgba(0, 0, 0, 1), 190px 10px 0 0 rgba(0, 0, 0, 1), 200px 10px 0 0 rgba(0, 0, 0, 1),
      20px 20px 0 0 rgba(0, 0, 0, 1), 210px 20px 0 0 rgba(0, 0, 0, 1), 10px 30px 0 0 rgba(0, 0, 0, 1),
      220px 30px 0 0 rgba(0, 0, 0, 1), 10px 40px 0 0 rgba(0, 0, 0, 1), 220px 40px 0 0 rgba(0, 0, 0, 1),
      10px 50px 0 0 rgba(0, 0, 0, 1), 220px 50px 0 0 rgba(0, 0, 0, 1), 10px 60px 0 0 rgba(0, 0, 0, 1),
      220px 60px 0 0 rgba(0, 0, 0, 1), 10px 70px 0 0 rgba(0, 0, 0, 1), 220px 70px 0 0 rgba(0, 0, 0, 1),
      10px 80px 0 0 rgba(0, 0, 0, 1), 220px 80px 0 0 rgba(0, 0, 0, 1), 10px 90px 0 0 rgba(0, 0, 0, 1),
      220px 90px 0 0 rgba(0, 0, 0, 1), 10px 100px 0 0 rgba(0, 0, 0, 1), 220px 100px 0 0 rgba(0, 0, 0, 1),
      10px 110px 0 0 rgba(0, 0, 0, 1), 220px 110px 0 0 rgba(0, 0, 0, 1), 10px 120px 0 0 rgba(0, 0, 0, 1),
      220px 120px 0 0 rgba(0, 0, 0, 1), 10px 130px 0 0 rgba(0, 0, 0, 1), 220px 130px 0 0 rgba(0, 0, 0, 1),
      20px 140px 0 0 rgba(0, 0, 0, 1), 210px 140px 0 0 rgba(0, 0, 0, 1), 30px 150px 0 0 rgba(0, 0, 0, 1),
      40px 150px 0 0 rgba(0, 0, 0, 1), 50px 150px 0 0 rgba(0, 0, 0, 1), 60px 150px 0 0 rgba(0, 0, 0, 1),
      70px 150px 0 0 rgba(0, 0, 0, 1), 80px 150px 0 0 rgba(0, 0, 0, 1), 90px 150px 0 0 rgba(0, 0, 0, 1),
      100px 150px 0 0 rgba(0, 0, 0, 1), 110px 150px 0 0 rgba(0, 0, 0, 1), 120px 150px 0 0 rgba(0, 0, 0, 1),
      130px 150px 0 0 rgba(0, 0, 0, 1), 140px 150px 0 0 rgba(0, 0, 0, 1), 150px 150px 0 0 rgba(0, 0, 0, 1),
      160px 150px 0 0 rgba(0, 0, 0, 1), 170px 150px 0 0 rgba(0, 0, 0, 1), 180px 150px 0 0 rgba(0, 0, 0, 1),
      190px 150px 0 0 rgba(0, 0, 0, 1), 200px 150px 0 0 rgba(0, 0, 0, 1), 160px 160px 0 0 rgba(0, 0, 0, 1),
      170px 160px 0 0 rgba(0, 0, 0, 1), 180px 160px 0 0 rgba(0, 0, 0, 1), 170px 170px 0 0 rgba(0, 0, 0, 1),
      180px 170px 0 0 rgba(0, 0, 0, 1), 180px 180px 0 0 rgba(0, 0, 0, 1);
    height: 10px;
    width: 10px;
    position: absolute;
  }
</style>
