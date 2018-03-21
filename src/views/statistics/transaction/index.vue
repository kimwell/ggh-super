<template>
  <div class="data-container">
    <screenHead @date-change="filterData">平台数据分析</screenHead>
    <div class="allData clearfix">
      <div class="item">
        <p>成家率</p>
        <h3>{{ allData.getRate }}%</h3>
      </div>
      <div class="item">
        <p>订单取消量</p>
        <h3>{{ allData.cancelOrder }}</h3>
      </div>
      <div class="item">
        <p>调度完成次数</p>
        <h3>{{ allData.bgNum }}</h3>
      </div>
      <div class="item">
        <p>总求购</p>
        <h3>{{ allData.allIron }}</h3>
      </div>
      <div class="item">
        <p>求购成交量</p>
        <h3>{{ allData.getNum }}</h3>
      </div>
      <div class="item">
        <p>错过报价</p>
        <h3>{{ allData.missSell }}</h3>
      </div>
      <div class="item">
        <p>平均调度时间</p>
        <h3>{{ allData.avgBgTime | dateformatT }}</h3>
      </div>
      <div class="item">
        <p>有货调度量</p>
        <h3>{{ allData.maimaimai }}</h3>
      </div>
      <div class="item">
        <p>有效报价数</p>
        <h3>{{ allData.validSell }}</h3>
      </div>
      <div class="item">
        <p>成交订单量</p>
        <h3>{{ allData.checkOrder }}</h3>
      </div>
      <div class="item">
        <p>无货调度量</p>
        <h3>{{ allData.ptlb }}</h3>
      </div>
      <div class="item">
        <p>平均有效报价</p>
        <h3>{{ allData.avgSell }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import screenHead from '../commonTemplate/screenHead.vue'
  export default {
    components: {
      screenHead
    },
    data() {
      return {
        apiData: {
          startTime: '',
          endTime: ''
        },
        allData: {
          getRate: 0,
          cancelOrder: 0,
          bgNum: 0,
          allIron: 0,
          getNum: 0,
          missSell: 0,
          avgBgTime: 0,
          maimaimai: 0,
          validSell: 0,
          checkOrder: 0,
          ptlb: 0,
          avgSell: 0,
        }
      }
    },
    methods: {
      getData() {
        this.$http.get(this.api.jd_platFormData, {
          params:this.apiData
        }).then(res => {
          if(res.code === 1000){
            this.allData.getRate = res.data.getRate;
            this.allData.cancelOrder = res.data.cancelOrder;
            this.allData.bgNum = res.data.bgNum;
            this.allData.allIron = res.data.allIron;
            this.allData.getNum = res.data.getNum;
            this.allData.missSell = res.data.missSell;
            this.allData.avgBgTime = res.data.avgBgTime;
            this.allData.maimaimai = res.data.maimaimai;
            this.allData.validSell = res.data.validSell;
            this.allData.checkOrder = res.data.checkOrder;
            this.allData.ptlb = res.data.ptlb;
            this.allData.avgSell = res.data.avgSell;
          }
        })
      },
      filterData(data){
        this.apiData.startTime = data.startTime;
        this.apiData.endTime = data.endTime;
        this.getData();
      }
    },
    created() {
      this.getData();
    }
  }
</script>


<style lang="less" scoped>
  .data-container {
    width: 100%;
    background-color: #fff;
    .allData {
      width: 100%;
      padding: 10px 0;
      .item {
        width: calc(~"100%/12");
        height: 88px;
        float: left;
        border-right: 1px solid #ddd;
        p {
          color: #868E9A;
          margin: 10px 0;
          text-indent: 10px;
        }
        h3 {
          font-size: 24px;
          color: #535B68;
          text-indent: 15px;
        }
        &:last-child {
          border: 0;
        }
      }
    }
  }
</style>
