<template>
  <div>
    <el-table :data="country_join_requests">
      <el-table-column prop="chara_name" align="center" label="角色名稱" />
      <el-table-column prop="created_at" align="center" label="申請時間" />
      <el-table-column label="批准" align="center">
        <template v-slot="scope">
          <el-button
            type="primary"
            @click="review_country_join_request({ id: scope.row.id, action: 'accept' }).then(() => refresh())"
          >
            批准
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="拒絕" align="center">
        <template v-slot="scope">
          <el-button
            type="danger"
            @click="review_country_join_request({ id: scope.row.id, action: 'reject' }).then(() => refresh())"
          >
            拒絕
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { review_country_join_request, get_country_join_requests } from "@/api/country";

  let country_join_requests = ref([]);
  async function refresh() {
    country_join_requests.value = await get_country_join_requests();
  }

  onMounted(async () => {
    refresh();
  });
</script>

<style lang="less" scoped></style>
