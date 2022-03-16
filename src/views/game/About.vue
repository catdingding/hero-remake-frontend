<template>
  <div>
    <el-card>
      <template #header>
        <div>開發/運營人員</div>
      </template>
      <div class="member">
        <img src="/image/npc/system/sticker/happy.png" alt="系統醬" />
        <div>
          <ul>
            <li>名稱：系統醬</li>
            <li>工作內容：系統開發、除錯、運維、看板娘、客服</li>
            <li>喜歡的東西：簡潔高效的程式碼、高規格伺服器、立繪與表情貼圖、$$$$$$</li>
            <li>討厭的東西：bug、bug製造機、不給薪水的老闆</li>
            <li>興趣：在網路上閒晃、與玩家聊天、跑團</li>
            <li>夢想：住進32 CPU/64GB RAM的伺服器中、可以切換32種表情</li>
            <li>繪師：<a href="https://fish900224.wixsite.com/artwork">白露Hakuro</a></li>
          </ul>
        </div>
      </div>
      <el-divider />
      <div class="member">
        <img src="/image/catding.png" alt="系統醬" />
        <div>
          <ul>
            <li>名稱：catding</li>
            <li>工作內容：提出莫名其妙的需求、製造bug、客服、製造bug</li>
            <li>下略，反正也不重要</li>
          </ul>
        </div>
      </div>
    </el-card>
    <el-card>
      <template #header>
        <div>關於本遊戲</div>
      </template>
      <ul>
        <li>
          參考：基礎機制與部分數據參考自Zeeman開發的「無限冒險」，其又參考自bean開發的「Farland History Ⅱ
          Ver2.11」與maccyu開發的「The Wars of Roses Ver6.4」。
        </li>
        <li>Front-end：Vue+Element Plus</li>
        <li>Back-end：Django+DRF+Channels</li>
        <li>DB：Maria DB</li>
      </ul>
    </el-card>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
  .el-card {
    width: 100%;
    margin-bottom: 20px;
  }
  .member {
    display: flex;
    flex-wrap: wrap;
    @media screen and (max-width: 768px) {
      justify-content: space-evenly;
    }

    img {
      width: 200px;
      object-fit: contain;
    }
  }
</style>
