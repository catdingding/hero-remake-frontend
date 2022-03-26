<template>
  <div class="main">
    <div v-for="npc in npcs" :key="npc.id" class="npc-block">
      <div>
        <el-avatar v-if="npc.avatar" :src="npc.avatar.path" :size="100"></el-avatar>
        <el-avatar v-else :size="100"><Avatar></Avatar></el-avatar>
      </div>
      <div>
        <span>{{ npc.name }}</span>
      </div>
      <div>
        <el-button @click="open_profile_dialog(npc.id)" type="primary" size="small">詳細</el-button>
      </div>
    </div>
    <el-dialog title="NPC資料" v-model="profile_dialog_visible" destroy-on-close width="60%">
      <NPCProfileCard :npc-id="profile_dialog_npc_id"></NPCProfileCard>
    </el-dialog>
  </div>
</template>
<script setup>
  import { ref, onMounted } from "vue";
  import { Avatar } from "@element-plus/icons";
  import NPCProfileCard from "@/components/NPCProfileCard.vue";
  import { get_npcs } from "@/api/npc";

  const npcs = ref([]);
  const fetch = async () => {
    npcs.value = await get_npcs();
  };

  const profile_dialog_visible = ref(false);
  const profile_dialog_npc_id = ref(null);
  const open_profile_dialog = (npc_id) => {
    profile_dialog_visible.value = true;
    profile_dialog_npc_id.value = npc_id;
  };

  onMounted(async () => {
    await fetch();
  });
</script>

<style lang="less" scoped>
  .main {
    gap: 30px;
  }
  .npc-block {
    width: 200px;
    border: 1px solid #999;
    border-radius: 25px;
    text-align: center;
    padding: 20px;
  }
</style>
