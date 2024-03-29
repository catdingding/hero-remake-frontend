<template>
  <div>
    <el-tabs model-value="first">
      <!-- 進行中拍賣 -->
      <el-tab-pane label="進行中拍賣" name="first">
        <PaginationItemTable :fetch-method="get_active_auctions" item-field="item">
          <template v-slot:extra-column>
            <el-table-column label="出售者" align="center">
              <template v-slot="scope">
                {{ scope.row.seller.name }}
              </template>
            </el-table-column>
            <el-table-column label="底價" prop="reserve_price" align="center">
              <template v-slot="scope">
                {{ $filters.currency(scope.row.reserve_price) }}
              </template>
            </el-table-column>
            <el-table-column label="當前出價" prop="bid_price" align="center">
              <template v-slot="scope">
                {{ $filters.currency(scope.row.bid_price) }}
              </template>
            </el-table-column>
            <el-table-column label="剩餘時間" align="center">
              <template v-slot="scope">
                <RelativeTime :time_string="scope.row.due_time" :period="1000"></RelativeTime>
              </template>
            </el-table-column>
            <el-table-column label="出價" align="center" width="200px">
              <template v-slot="scope">
                <InputNumberWithButton
                  text="出價"
                  width="160px"
                  @click="bid_auction_check({ id: scope.row.id, bid_price: $event, row: scope.row })"
                >
                </InputNumberWithButton>
              </template>
            </el-table-column>
          </template>
        </PaginationItemTable>
      </el-tab-pane>
      <!-- 拍賣物品 -->
      <el-tab-pane label="出售物品" name="second">
        <HintBlock><div>上架商品需支付底價1%的押金（至少10萬），出售成功後會退回。</div></HintBlock>
        <el-form :model="auction_form_data" label-width="120px" label-position="left">
          <el-form-item label="物品" required>
            <el-select v-model="auction_form_data.item">
              <el-option
                v-for="item in chara_bag_items"
                :key="item.id"
                :label="$filters.item_string(item)"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="數量" required>
            <el-input-number v-model="auction_form_data.number" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="底價" required>
            <InputNumber v-model="auction_form_data.reserve_price" :min="1" size="default" width="150px"></InputNumber>
          </el-form-item>
          <el-form-item label="時長（小時）" required>
            <el-input-number v-model="auction_form_data.hours" :min="1"></el-input-number>
          </el-form-item>
          <el-button type="primary" @click="create_auction(auction_form_data)">拍賣物品</el-button>
        </el-form>
      </el-tab-pane>
      <!-- 待辦拍賣 -->
      <el-tab-pane label="領取物品/金錢" name="third">
        <el-table :data="todo_auctions">
          <el-table-column label="物品名稱" align="center">
            <template v-slot="scope">
              <template v-if="!(scope.row.seller.id === chara_id && scope.row.bidder)">
                {{ scope.row.item.equipment ? scope.row.item.equipment.display_name : scope.row.item.type.name }}
              </template>
            </template>
          </el-table-column>
          <el-table-column label="數量" align="center">
            <template v-slot="scope">
              <template v-if="!(scope.row.seller.id === chara_id && scope.row.bidder)">
                {{ scope.row.item.number }}
              </template>
            </template>
          </el-table-column>
          <el-table-column label="金錢" align="center">
            <template v-slot="scope">
              <template v-if="scope.row.seller.id === chara_id && scope.row.bidder">
                {{ $filters.currency(scope.row.bid_price) }}
              </template>
            </template>
          </el-table-column>
          <el-table-column label="領取" align="center">
            <template v-slot="scope">
              <el-button
                type="primary"
                @click="receive_auction_gold(scope.row.id)"
                v-if="scope.row.seller.id === chara_id && scope.row.bidder"
              >
                領取金錢
              </el-button>
              <el-button type="primary" @click="receive_auction_item(scope.row.id)" v-else>領取物品</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import InputNumberWithButton from "@/components/InputNumberWithButton";
  import InputNumber from "@/components/InputNumber";
  import PaginationItemTable from "@/components/PaginationItemTable";

  export default {
    name: "AuctionHouse",
    data() {
      return {
        auction_form_data: {
          item: null,
          number: 1,
          reserve_price: 1,
          hours: 1,
        },
      };
    },
    computed: {
      ...mapState("trade", ["active_auctions", "todo_auctions"]),
      ...mapState("chara", ["chara_id", "chara_bag_items"]),
    },
    methods: {
      ...mapActions("trade", [
        "get_active_auctions",
        "create_auction",
        "bid_auction",
        "receive_auction_item",
        "receive_auction_gold",
      ]),
      bid_auction_check({ id, bid_price, row }) {
        if (bid_price >= row.reserve_price * 10 && (!row.bid_price || bid_price >= row.bid_price * 10)) {
          this.$confirm("你的出價>=底價/最高出價的10倍，是否確定出價？", "提醒", {
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            this.bid_auction({ id, bid_price });
          });
        } else {
          this.bid_auction({ id, bid_price });
        }
      },
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "gold,bag_items" });
      this.$store.dispatch("trade/get_todo_auctions");
    },
    components: { PaginationItemTable, InputNumberWithButton, InputNumber },
  };
</script>

<style lang="less" scoped>
  .el-tabs {
    width: 100%;
  }
</style>
