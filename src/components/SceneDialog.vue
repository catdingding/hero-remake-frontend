<template>
  <div>
    <el-dialog v-model="visible" width="80%" top="5vh" destroy-on-close>
      <Scene style="height: 90vh" :contents="contents" :start-key="startKey" />
    </el-dialog>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, computed, watch } from "vue";
  import Scene from "@/components/Scene";
  const props = defineProps({
    modelValue: Boolean,
    contents: Array,
    startKey: String,
  });
  const emit = defineEmits(["update:modelValue"]);

  const visible = computed({
    set(value) {
      emit("update:modelValue", value);
    },
    get() {
      return props.modelValue;
    },
  });
</script>

<style lang="less" scoped>
  :deep(.el-dialog) {
    border-radius: 30px;
    overflow: hidden;
  }
  :deep(.el-dialog__body) {
    padding: 0;
  }
  :deep(.el-dialog__header) {
    display: none;
  }
</style>
