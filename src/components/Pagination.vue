<template>
  <div>
    <slot name="conditions" v-bind:conditions="conditions"></slot>
    <slot name="main" v-bind:records="records"></slot>
    <el-pagination
      class="pagination"
      layout="prev,pager,next,jumper"
      :page-size="pageSize"
      v-model:current-page="current_page"
      :total="total"
      @current-change="fetch"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    data() {
      return {
        records: [],
        total: 1,
        current_page: 1,
        conditions: {},
      };
    },
    methods: {
      async fetch() {
        var data = await this.fetchMethod({
          conditions: {
            ...this.fixed_conditions,
            ...this.conditions,
            page: this.current_page,
            page_size: this.pageSize,
          },
        });
        this.records = data.results;
        this.total = data.count;
        this.$emit("change");
      },
    },
    watch: {
      conditions: {
        deep: true,
        handler() {
          this.fetch();
        },
      },
      fixed_conditions: {
        deep: true,
        handler() {
          this.fetch();
        },
      },
    },
    props: {
      pageSize: { type: Number, default: 50 },
      fetchMethod: { type: Function },
      fixed_conditions: { type: Object, default: () => ({}) },
    },
    async mounted() {
      this.fetch();
    },
  };
</script>

<style lang="less" scoped>
  .pagination {
    display: flex;
    justify-content: center;
  }
</style>
