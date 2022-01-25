<template>
  <Pagination :fetch-method="fetchMethod" :page-size="pageSize" ref="pagination" @change="change">
    <template v-slot:conditions="slot_props">
      <el-form inline :model="slot_props.conditions">
        <el-form-item>
          <el-select clearable v-model="slot_props.conditions.ordering" placeholder="排序">
            <el-option label="名稱" value="name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="slot_props.conditions.element_type" placeholder="屬性">
            <el-option
              v-for="element_type in element_types"
              :key="element_type.id"
              :label="element_type.name"
              :value="element_type.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="slot_props.conditions.is_locked" placeholder="綁定">
            <el-option label="綁定" value="true"></el-option>
            <el-option label="非綁定" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="slot_props.conditions.category" placeholder="類型">
            <el-option
              v-for="category in item_categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="slot_props.conditions.slot_type" placeholder="部位">
            <el-option v-for="slot in slot_types" :key="slot.id" :label="slot.name" :value="slot.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input clearable v-model="slot_props.conditions.name_like" placeholder="名稱" />
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:main="slot_props">
      <ItemTable :data="slot_props.records" :item-field="itemField">
        <template v-slot:extra-column>
          <slot name="extra-column"></slot>
        </template>
      </ItemTable>
    </template>
  </Pagination>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import ItemTable from "@/components/ItemTable.vue";
  import Pagination from "@/components/Pagination";

  export default {
    name: "PaginationItemTable",
    data() {
      return { total: 0 };
    },
    computed: {
      ...mapState(["element_types", "slot_types", "item_categories"]),
    },
    methods: {
      fetch() {
        return this.$refs.pagination.fetch();
      },
      change() {
        this.total = this.$refs.pagination.total;
        this.$emit("change");
      },
    },
    props: {
      pageSize: { type: Number, default: 20 },
      itemField: { type: String, default: null },
      fetchMethod: { type: Function },
    },
    components: { ItemTable, Pagination },
  };
</script>

<style lang="less" scoped>
  .el-select {
    width: 75px;
  }
  .el-input {
    width: 120px;
  }
</style>
