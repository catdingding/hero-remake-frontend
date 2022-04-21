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
    box-shadow: 30px 10px 0 0 #000000, 40px 10px 0 0 #000000, 50px 10px 0 0 #000000, 60px 10px 0 0 #000000,
      70px 10px 0 0 #000000, 80px 10px 0 0 #000000, 90px 10px 0 0 #000000, 100px 10px 0 0 #000000,
      110px 10px 0 0 #000000, 120px 10px 0 0 #000000, 130px 10px 0 0 #000000, 140px 10px 0 0 #000000,
      150px 10px 0 0 #000000, 160px 10px 0 0 #000000, 170px 10px 0 0 #000000, 180px 10px 0 0 #000000,
      190px 10px 0 0 #000000, 200px 10px 0 0 #000000, 20px 20px 0 0 #000000, 30px 20px 0 0 var(--color-white),
      40px 20px 0 0 var(--color-white), 50px 20px 0 0 var(--color-white), 60px 20px 0 0 var(--color-white),
      70px 20px 0 0 var(--color-white), 80px 20px 0 0 var(--color-white), 90px 20px 0 0 var(--color-white),
      100px 20px 0 0 var(--color-white), 110px 20px 0 0 var(--color-white), 120px 20px 0 0 var(--color-white),
      130px 20px 0 0 var(--color-white), 140px 20px 0 0 var(--color-white), 150px 20px 0 0 var(--color-white),
      160px 20px 0 0 var(--color-white), 170px 20px 0 0 var(--color-white), 180px 20px 0 0 var(--color-white),
      190px 20px 0 0 var(--color-white), 200px 20px 0 0 var(--color-white), 210px 20px 0 0 #000000,
      10px 30px 0 0 #000000, 20px 30px 0 0 var(--color-white), 30px 30px 0 0 var(--color-white),
      40px 30px 0 0 var(--color-white), 50px 30px 0 0 var(--color-white), 60px 30px 0 0 var(--color-white),
      70px 30px 0 0 var(--color-white), 80px 30px 0 0 var(--color-white), 90px 30px 0 0 var(--color-white),
      100px 30px 0 0 var(--color-white), 110px 30px 0 0 var(--color-white), 120px 30px 0 0 var(--color-white),
      130px 30px 0 0 var(--color-white), 140px 30px 0 0 var(--color-white), 150px 30px 0 0 var(--color-white),
      160px 30px 0 0 var(--color-white), 170px 30px 0 0 var(--color-white), 180px 30px 0 0 var(--color-white),
      190px 30px 0 0 var(--color-white), 200px 30px 0 0 var(--color-white), 210px 30px 0 0 var(--color-white),
      220px 30px 0 0 #000000, 10px 40px 0 0 #000000, 20px 40px 0 0 var(--color-white), 30px 40px 0 0 var(--color-white),
      40px 40px 0 0 var(--color-white), 50px 40px 0 0 var(--color-white), 60px 40px 0 0 var(--color-white),
      70px 40px 0 0 var(--color-white), 80px 40px 0 0 var(--color-white), 90px 40px 0 0 var(--color-white),
      100px 40px 0 0 var(--color-white), 110px 40px 0 0 var(--color-white), 120px 40px 0 0 var(--color-white),
      130px 40px 0 0 var(--color-white), 140px 40px 0 0 var(--color-white), 150px 40px 0 0 var(--color-white),
      160px 40px 0 0 var(--color-white), 170px 40px 0 0 var(--color-white), 180px 40px 0 0 var(--color-white),
      190px 40px 0 0 var(--color-white), 200px 40px 0 0 var(--color-white), 210px 40px 0 0 var(--color-white),
      220px 40px 0 0 #000000, 10px 50px 0 0 #000000, 20px 50px 0 0 var(--color-white), 30px 50px 0 0 var(--color-white),
      40px 50px 0 0 var(--color-white), 50px 50px 0 0 var(--color-white), 60px 50px 0 0 var(--color-white),
      70px 50px 0 0 var(--color-white), 80px 50px 0 0 var(--color-white), 90px 50px 0 0 var(--color-white),
      100px 50px 0 0 var(--color-white), 110px 50px 0 0 var(--color-white), 120px 50px 0 0 var(--color-white),
      130px 50px 0 0 var(--color-white), 140px 50px 0 0 var(--color-white), 150px 50px 0 0 var(--color-white),
      160px 50px 0 0 var(--color-white), 170px 50px 0 0 var(--color-white), 180px 50px 0 0 var(--color-white),
      190px 50px 0 0 var(--color-white), 200px 50px 0 0 var(--color-white), 210px 50px 0 0 var(--color-white),
      220px 50px 0 0 #000000, 10px 60px 0 0 #000000, 20px 60px 0 0 var(--color-white), 30px 60px 0 0 var(--color-white),
      40px 60px 0 0 var(--color-white), 50px 60px 0 0 var(--color-white), 60px 60px 0 0 var(--color-white),
      70px 60px 0 0 var(--color-white), 80px 60px 0 0 var(--color-white), 90px 60px 0 0 var(--color-white),
      100px 60px 0 0 var(--color-white), 110px 60px 0 0 var(--color-white), 120px 60px 0 0 var(--color-white),
      130px 60px 0 0 var(--color-white), 140px 60px 0 0 var(--color-white), 150px 60px 0 0 var(--color-white),
      160px 60px 0 0 var(--color-white), 170px 60px 0 0 var(--color-white), 180px 60px 0 0 var(--color-white),
      190px 60px 0 0 var(--color-white), 200px 60px 0 0 var(--color-white), 210px 60px 0 0 var(--color-white),
      220px 60px 0 0 #000000, 10px 70px 0 0 #000000, 20px 70px 0 0 var(--color-white), 30px 70px 0 0 var(--color-white),
      40px 70px 0 0 var(--color-white), 50px 70px 0 0 var(--color-white), 60px 70px 0 0 var(--color-white),
      70px 70px 0 0 var(--color-white), 80px 70px 0 0 var(--color-white), 90px 70px 0 0 var(--color-white),
      100px 70px 0 0 var(--color-white), 110px 70px 0 0 var(--color-white), 120px 70px 0 0 var(--color-white),
      130px 70px 0 0 var(--color-white), 140px 70px 0 0 var(--color-white), 150px 70px 0 0 var(--color-white),
      160px 70px 0 0 var(--color-white), 170px 70px 0 0 var(--color-white), 180px 70px 0 0 var(--color-white),
      190px 70px 0 0 var(--color-white), 200px 70px 0 0 var(--color-white), 210px 70px 0 0 var(--color-white),
      220px 70px 0 0 #000000, 10px 80px 0 0 #000000, 20px 80px 0 0 var(--color-white), 30px 80px 0 0 var(--color-white),
      40px 80px 0 0 var(--color-white), 50px 80px 0 0 var(--color-white), 60px 80px 0 0 var(--color-white),
      70px 80px 0 0 var(--color-white), 80px 80px 0 0 var(--color-white), 90px 80px 0 0 var(--color-white),
      100px 80px 0 0 var(--color-white), 110px 80px 0 0 var(--color-white), 120px 80px 0 0 var(--color-white),
      130px 80px 0 0 var(--color-white), 140px 80px 0 0 var(--color-white), 150px 80px 0 0 var(--color-white),
      160px 80px 0 0 var(--color-white), 170px 80px 0 0 var(--color-white), 180px 80px 0 0 var(--color-white),
      190px 80px 0 0 var(--color-white), 200px 80px 0 0 var(--color-white), 210px 80px 0 0 var(--color-white),
      220px 80px 0 0 #000000, 10px 90px 0 0 #000000, 20px 90px 0 0 var(--color-white), 30px 90px 0 0 var(--color-white),
      40px 90px 0 0 var(--color-white), 50px 90px 0 0 var(--color-white), 60px 90px 0 0 var(--color-white),
      70px 90px 0 0 var(--color-white), 80px 90px 0 0 var(--color-white), 90px 90px 0 0 var(--color-white),
      100px 90px 0 0 var(--color-white), 110px 90px 0 0 var(--color-white), 120px 90px 0 0 var(--color-white),
      130px 90px 0 0 var(--color-white), 140px 90px 0 0 var(--color-white), 150px 90px 0 0 var(--color-white),
      160px 90px 0 0 var(--color-white), 170px 90px 0 0 var(--color-white), 180px 90px 0 0 var(--color-white),
      190px 90px 0 0 var(--color-white), 200px 90px 0 0 var(--color-white), 210px 90px 0 0 var(--color-white),
      220px 90px 0 0 #000000, 10px 100px 0 0 #000000, 20px 100px 0 0 var(--color-white),
      30px 100px 0 0 var(--color-white), 40px 100px 0 0 var(--color-white), 50px 100px 0 0 var(--color-white),
      60px 100px 0 0 var(--color-white), 70px 100px 0 0 var(--color-white), 80px 100px 0 0 var(--color-white),
      90px 100px 0 0 var(--color-white), 100px 100px 0 0 var(--color-white), 110px 100px 0 0 var(--color-white),
      120px 100px 0 0 var(--color-white), 130px 100px 0 0 var(--color-white), 140px 100px 0 0 var(--color-white),
      150px 100px 0 0 var(--color-white), 160px 100px 0 0 var(--color-white), 170px 100px 0 0 var(--color-white),
      180px 100px 0 0 var(--color-white), 190px 100px 0 0 var(--color-white), 200px 100px 0 0 var(--color-white),
      210px 100px 0 0 var(--color-white), 220px 100px 0 0 #000000, 10px 110px 0 0 #000000,
      20px 110px 0 0 var(--color-white), 30px 110px 0 0 var(--color-white), 40px 110px 0 0 var(--color-white),
      50px 110px 0 0 var(--color-white), 60px 110px 0 0 var(--color-white), 70px 110px 0 0 var(--color-white),
      80px 110px 0 0 var(--color-white), 90px 110px 0 0 var(--color-white), 100px 110px 0 0 var(--color-white),
      110px 110px 0 0 var(--color-white), 120px 110px 0 0 var(--color-white), 130px 110px 0 0 var(--color-white),
      140px 110px 0 0 var(--color-white), 150px 110px 0 0 var(--color-white), 160px 110px 0 0 var(--color-white),
      170px 110px 0 0 var(--color-white), 180px 110px 0 0 var(--color-white), 190px 110px 0 0 var(--color-white),
      200px 110px 0 0 var(--color-white), 210px 110px 0 0 var(--color-white), 220px 110px 0 0 #000000,
      10px 120px 0 0 #000000, 20px 120px 0 0 var(--color-white), 30px 120px 0 0 var(--color-white),
      40px 120px 0 0 var(--color-white), 50px 120px 0 0 var(--color-white), 60px 120px 0 0 var(--color-white),
      70px 120px 0 0 var(--color-white), 80px 120px 0 0 var(--color-white), 90px 120px 0 0 var(--color-white),
      100px 120px 0 0 var(--color-white), 110px 120px 0 0 var(--color-white), 120px 120px 0 0 var(--color-white),
      130px 120px 0 0 var(--color-white), 140px 120px 0 0 var(--color-white), 150px 120px 0 0 var(--color-white),
      160px 120px 0 0 var(--color-white), 170px 120px 0 0 var(--color-white), 180px 120px 0 0 var(--color-white),
      190px 120px 0 0 var(--color-white), 200px 120px 0 0 var(--color-white), 210px 120px 0 0 var(--color-white),
      220px 120px 0 0 #000000, 10px 130px 0 0 #000000, 20px 130px 0 0 var(--color-white),
      30px 130px 0 0 var(--color-white), 40px 130px 0 0 var(--color-white), 50px 130px 0 0 var(--color-white),
      60px 130px 0 0 var(--color-white), 70px 130px 0 0 var(--color-white), 80px 130px 0 0 var(--color-white),
      90px 130px 0 0 var(--color-white), 100px 130px 0 0 var(--color-white), 110px 130px 0 0 var(--color-white),
      120px 130px 0 0 var(--color-white), 130px 130px 0 0 var(--color-white), 140px 130px 0 0 var(--color-white),
      150px 130px 0 0 var(--color-white), 160px 130px 0 0 var(--color-white), 170px 130px 0 0 var(--color-white),
      180px 130px 0 0 var(--color-white), 190px 130px 0 0 var(--color-white), 200px 130px 0 0 var(--color-white),
      210px 130px 0 0 var(--color-white), 220px 130px 0 0 #000000, 20px 140px 0 0 #000000,
      30px 140px 0 0 var(--color-white), 40px 140px 0 0 var(--color-white), 50px 140px 0 0 var(--color-white),
      60px 140px 0 0 var(--color-white), 70px 140px 0 0 var(--color-white), 80px 140px 0 0 var(--color-white),
      90px 140px 0 0 var(--color-white), 100px 140px 0 0 var(--color-white), 110px 140px 0 0 var(--color-white),
      120px 140px 0 0 var(--color-white), 130px 140px 0 0 var(--color-white), 140px 140px 0 0 var(--color-white),
      150px 140px 0 0 var(--color-white), 160px 140px 0 0 var(--color-white), 170px 140px 0 0 var(--color-white),
      180px 140px 0 0 var(--color-white), 190px 140px 0 0 var(--color-white), 200px 140px 0 0 var(--color-white),
      210px 140px 0 0 #000000, 30px 150px 0 0 #000000, 40px 150px 0 0 #000000, 50px 150px 0 0 #000000,
      60px 150px 0 0 #000000, 70px 150px 0 0 #000000, 80px 150px 0 0 #000000, 90px 150px 0 0 #000000,
      100px 150px 0 0 #000000, 110px 150px 0 0 #000000, 120px 150px 0 0 #000000, 130px 150px 0 0 #000000,
      140px 150px 0 0 #000000, 150px 150px 0 0 #000000, 160px 150px 0 0 #000000, 170px 150px 0 0 #000000,
      180px 150px 0 0 #000000, 190px 150px 0 0 #000000, 200px 150px 0 0 #000000, 160px 160px 0 0 #000000,
      170px 160px 0 0 #000000, 180px 160px 0 0 #000000, 170px 170px 0 0 #000000, 180px 170px 0 0 #000000,
      180px 180px 0 0 #000000;
    height: 10px;
    width: 10px;
    position: absolute;
  }
</style>
