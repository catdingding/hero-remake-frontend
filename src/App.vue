<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
  #app {
    min-height: 100vh;
  }
  table:not(.el-table__body) {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    td,
    th {
      padding: 5px;
      height: 43px;
    }
    tr:not(:last-child) {
      border-bottom: 1px solid #ccc;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: center;
    padding: 10px;
  }

  .save-panel {
    margin-top: 50px;
    text-align: center;
  }
</style>
