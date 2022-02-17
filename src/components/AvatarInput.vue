<template>
  <el-upload action="" class="avatar-uploader" :show-file-list="false" :auto-upload="false" :on-change="set_avatar">
    <img v-if="object_url" :src="object_url" class="avatar" />
    <el-icon class="avatar-uploader-icon" v-else><Plus></Plus></el-icon>
  </el-upload>
</template>

<script>
  import { Plus } from "@element-plus/icons";
  export default {
    name: "AvatarInput",
    data() {
      return {
        object_url: null,
      };
    },
    emits: ["change"],
    methods: {
      set_avatar(file, fileList) {
        const type_check = file.raw.type === "image/jpeg" || file.raw.type === "image/png";
        const size_check = file.raw.size / 1024 / 1024 < 2;

        if (!type_check) {
          this.$message.error("頭像只能使用jpg或png格式");
          return;
        }
        if (!size_check) {
          this.$message.error("圖片不能超過2MB");
          return;
        }

        this.object_url = URL.createObjectURL(file.raw);
        this.$emit("change", file.raw);
      },
    },
    components: { Plus },
  };
</script>

<style lang="less" scoped>
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 250px;
    height: 250px;
  }
  .avatar-uploader:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 250px;
    height: 250px;
    line-height: 250px;
    text-align: center;
  }
  .avatar {
    width: 250px;
    height: 250px;
    display: block;
    object-fit: cover;
  }
</style>
