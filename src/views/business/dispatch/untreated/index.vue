<template>
  <div class="panel">
    <filterUnreated @on-change="doFilter"></filterUnreated>
    <p style="text-align:center;padding: 20px 0;" v-show="list.length<=0">暂无数据</p>
    <div class="data-list">
      <div class="list-card" v-for="(item,i) in list" :key="i">
        <div class="card-head">
          <span>商户名称：{{item.companyName}}</span>
          <div class="action"><a @click="detailAction(item)">查看报价</a></div>
        </div>
        <div class="card-body clearfix">
          <div class="item">货源地：{{item.locationName}}</div>
          <div class="item">品类：{{item.ironType}}</div>
          <div class="item">材质：{{item.material}}</div>
          <div class="item">规格：{{item.specification != '' ? item.specification : `${item.height}*${item.width}*${item.length}`}}</div>
          <div class="item">公差：{{item.tolerance}}</div>
          <div class="item">计量：{{item.proPlace}}</div>
          <div class="item">是否有报价人：</div>
          <div class="item">货源地：{{item.locationName}}</div>
          <div class="item">更新时间：{{item.createTime | dateformat}}</div>
        </div>
      </div>
    </div>
    <Page class="page-count" size="small" :total="totalCount" show-total :current="apiData.currentPage" :page-size="apiData.pageSize" @on-change="changePage"></Page>
    <Modal v-model="detailShow" width="1100" title="报价详情">
      <div class="detail" v-if="detailData.ironBuy">
        <div>求购内容：{{detailData.ironBuy.ironTypeName}}/{{detailData.ironBuy.materialName}}/{{detailData.ironBuy.proPlacesName}}/{{detailData.ironBuy.surfaceName}}(收货城市：{{detailData.ironBuy.locationName}})</div>
        <div>规格：{{detailData.ironBuy.specifications != '' ? detailData.ironBuy.specifications : `${detailData.ironBuy.height}*${detailData.ironBuy.width}*${detailData.ironBuy.length}`}}</div>
        <div>公差：{{detailData.ironBuy.tolerance}}</div>
        <div>计量：{{detailData.ironBuy.numbers}}{{detailData.ironBuy.numberUnit}}/{{detailData.ironBuy.weights}}{{detailData.ironBuy.weightUnit}}</div>
        <div>备注：{{detailData.ironBuy.remark !='' ? detailData.ironBuy.remark: '暂无'}}</div>
        <div>买家公司：{{detailData.buser.companyName}}</div>
        <div>联系人：{{detailData.buser.contactName}}  联系方式：{{detailData.buser.contactNum}}</div>
        <div>状态：{{detailData.ironBuy.createUser}}</div>
        <div>剩余可报价商家数：{{detailData.remainBuserNum}}</div>
        <div class="ironVal" style="padding:15px 0;">
          <p>有效报价：{{detailData.validSell.length}}</p>
          <div class="validSell table-contnet">
            <Row class-name="head">
              <Col class-name="col" span="1">&nbsp;</Col>
              <Col class-name="col" span="5">公司名称</Col>
              <Col class-name="col" span="2">报价人</Col>
              <Col class-name="col" span="3">联系方式</Col>
              <Col class-name="col" span="2">单价</Col>
              <Col class-name="col" span="3">公差</Col>
              <Col class-name="col" span="2">产地</Col>
              <Col class-name="col" span="3">交货时间</Col>
              <Col class-name="col" span="3">备注</Col>
            </Row>
            <Row v-for="(item,i) in detailData.validSell" :key="i">
              <Col class-name="col" span="1">&nbsp;</Col>
              <Col class-name="col" span="5">{{item.companyName}}</Col>
              <Col class-name="col" span="2">{{item.contactName}}</Col>
              <Col class-name="col" span="3">{{item.contactNum}}</Col>
              <Col class-name="col" span="2">{{item.sellIng.offerPerPrice}}元/{{item.sellIng.baseUnit}}</Col>
              <Col class-name="col" span="3">{{item.sellIng.tolerance}}</Col>
              <Col class-name="col" span="2">{{item.sellIng.offerPlaces}}</Col>
              <Col class-name="col" span="3">{{item.sellIng.deliveryTime}}</Col>
              <Col class-name="col" span="3">{{item.sellIng.offerRemark !='' ? item.sellIng.offerRemark: '暂无'}}</Col>
            </Row>
          </div>
        </div>
        <div class="ironMiss">
          <p>错过报价：{{detailData.missSell.length}}</p>
          <p v-for="item in detailData.missSell" :key="item.id">
              {{ item.companyName }} — 联系人：{{item.contactName}} — 联系电话：{{item.contactNum}}
          </p>
        </div>
      </div>

      <div slot="footer">

      </div>
    </Modal>
  </div>
</template>

<script>
  import City from '@/components/basics/adress/citySelect.vue'
  import filterUnreated from '../parts/filterUntreated.vue'
  export default {
    components: {
      City,
      filterUnreated
    },
    data() {
      return {
        detailShow: false,
        apiData: {
          curentPage: 1,
          pageSize: 10,
          startTime: '',
          endTime: '',
          heightMin: '',
          heightMax: '',
          widthMin: '',
          widthMax: '',
          lengthMin: '',
          lengthMax: '',
          specificaton: '',
          createUser: '',
          ironTypeId: '',
          tolerance: '',
          buserHave: '',
          materialId: '',
          proPlaceId: '',
          surfaceId: '',
          locationId: ''
        },
        totalCount: 0,
        list: [],
        dateValue: ['', ''],
        filterData: [{
            title: '品类',
            key: 'ironTypeId',
            list: [],
          },
          {
            title: '表面',
            key: 'surfaceId',
            list: [],
          },
          {
            title: '材质',
            key: 'materialId',
            list: [],
          },
          {
            title: '产地',
            key: 'proPlaceId',
            list: [],
          }
        ],
        dateOption: {
          shortcuts: [{
              text: '最近一周',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '最近一个月',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
            {
              text: '最近三个月',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              }
            }
          ]
        },
        buserHaveData: [{
            name: '是',
            value: 'true'
          },
          {
            name: '否',
            value: 'false'
          }
        ],
        placeHolder: '请选择',
        detailData: {}
      }
    },
    computed: {
      handleData() {
        return {
          curentPage: this.apiData.curentPage,
          pageSize: this.apiData.pageSize,
          startTime: this.dateValue[0] != '' ? new Date(this.dateValue[0]).getTime() : '',
          endTime: this.dateValue[1] != '' ? new Date(this.dateValue[1]).getTime() : '',
          heightMin: this.apiData.heightMin,
          heightMax: this.apiData.heightMax,
          widthMin: this.apiData.widthMin,
          widthMax: this.apiData.widthMax,
          lengthMin: this.apiData.lengthMin,
          lengthMax: this.apiData.lengthMax,
          specificaton: this.apiData.specificaton,
          createUser: this.apiData.createUser,
          ironTypeId: this.apiData.ironTypeId,
          tolerance: this.apiData.tolerance,
          buserHave: this.apiData.buserHave,
          materialId: this.apiData.materialId,
          proPlaceId: this.apiData.proPlaceId,
          surfaceId: this.apiData.surfaceId,
          locationId: this.apiData.locationId
        }
      }
    },
    watch: {
      'handleData': {
        handler: _.debounce(function(val, oldVal) {
          // 是否是翻页操作
          if (val.currentPage == oldVal.currentPage)
            this.apiData.currentPage = 1;
          this.getList(this.handleData);
        }, 200),
        deep: true
      }
    },
    methods: {
      doFilter(data) {},
      changePage(page) {
        this.apiData.curentPage = page;
        this.getList();
      },
      // 获取品类
      getIronTypes() {
        return this.$http.get(this.api.queryIronTypes)
      },
      // 获取材质
      getMaterials() {
        return this.$http.get(this.api.queryMaterials)
      },
      // 获取表面
      getSurFaces() {
        return this.$http.get(this.api.querySurFaces)
      },
      // 获取产地
      getPlaces() {
        return this.$http.get(this.api.queryPlaces)
      },
      getList() {
        this.$http.post(this.api.findDealIronBuy, this.apiData).then(res => {
          if (res.code === 1000) {
            this.list = res.data.list;
            this.totalCount = res.data.totalCount;
          }
        })
      },
      //  查看报价
      detailAction(data) {
        let params = {
          ironBuyId: data.ironBuyId
        }
        this.$http.post(this.api.findDealSell, params).then(res => {
          if (res.code === 1000) {
            this.detailData = res.data;
          }
        })
        this.detailShow = true
      },
      resetFilter() {
        this.apiData = {
          curentPage: 1,
          pageSize: 10,
          startTime: '',
          endTime: '',
          heightMin: '',
          heightMax: '',
          widthMin: '',
          widthMax: '',
          lengthMin: '',
          lengthMax: '',
          specificaton: '',
          createUser: '',
          ironTypeId: '',
          tolerance: '',
          buserHave: '',
          materialId: '',
          proPlaceId: '',
          surfaceId: '',
          locationId: ''
        }
      },
      selectCity(data) {
        this.apiData.locationId = data.cityId;
      }
    },
    created() {
      this.$http.all([
        this.getIronTypes(),
        this.getSurFaces(),
        this.getMaterials(),
        this.getPlaces()
      ]).then(res => {
        res.forEach((el, index) => {
          if (el.code === 1000) {
            this.filterData[index].list.push(...el.data)
          }
        })
      })
      this.getList();
    }
  }
</script>

<style lang='less' scoped>
  .panel {
    padding-bottom: 40px;
    position: relative;
    .page-count {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
  
  .list-card {
    background: #fff;
    border: 1px solid #e6e6e6;
    margin-top: 15px;
    font-size: 14px;
    color: #333;
    .card-head {
      position: relative;
      border-bottom: 1px solid #e6e6e6;
      height: 46px;
      line-height: 46px;
      padding: 0 20px;
      .action {
        position: absolute;
        right: 20px;
        top: 0;
      }
    }
    .card-body {
      position: relative;
      padding: 20px;
      padding-bottom: 10px;
      .item {
        width: 20%;
        float: left;
        margin-bottom: 10px;
      }
    }
  }
      .table-contnet {
      line-height: 40px;
      text-align: center;
      border-top: 1px solid #d0d0d0;
      border-left: 1px solid #d0d0d0;
      .head {
        background-color: #ddd;
      }
      .col {
        height: 40px;
        padding: 0 5px;
        border-right: 1px solid #d0d0d0;
        border-bottom: 1px solid #d0d0d0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
</style>