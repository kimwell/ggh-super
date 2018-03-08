<template>
  <div class="panel">
    <filterUnreated @on-change="doFilter"></filterUnreated>
    <p style="text-align:center;padding: 20px 0;" v-show="list.length<=0">暂无数据</p>
    <div class="data-list">
      <div class="list-card" v-for="(item,i) in list" :key="i">
        <div class="card-head"><span>商户名称：{{item.companyName}}</span></div>
        <div class="card-body clearfix">
          <div class="item">操作人：{{item.createUser}}</div>
          <div class="item">联系人：{{item.contactName}}</div>
          <div class="item">联系电话：{{item.contactNum}}</div>
          <div class="item">规格：{{item.specification != '' ? item.specification : `${item.height}*${item.width}*${item.length}`}}</div>
          <div class="item">品类：{{item.ironType}}</div>
          <div class="item">公差：{{item.tolerance}}</div>
          <div class="item">材质：{{item.material}}</div>
          <div class="item">产地：{{item.proPlace}}</div>
          <div class="item">表面：{{item.surface}}</div>
          <div class="item">是否有报价人：</div>
          <div class="item">货源地：{{item.locationName}}</div>
          <div class="item">更新时间：{{item.createTime | dateformat}}</div>
        </div>
      </div>
    </div>
    <Page class="page-count" size="small" :total="totalCount" show-total :current="apiData.currentPage" :page-size="apiData.pageSize" @on-change="changePage"></Page>
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
        placeHolder: '请选择'
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
      doFilter(data) {
        console.log(data)
      },
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
            console.log(res)
            this.list = res.data.list;
            this.totalCount = res.data.totalCount;
          }
        })
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
</style>