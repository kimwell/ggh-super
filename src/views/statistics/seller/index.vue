<template>
  <div class="seller">
  <commonTemplate :tableHead="columns" :tableBody="filterList" @date-pick="filterData">
    卖家数据分析
    <div class="inputs" style="position: absolute;top:0;right:310px;">
      <Input v-model="dataApi.companyName" @on-blur="getData" placeholder="请输入卖家公司名称" style="width: 200px;"></Input>
    </div>
    <a style="position: absolute;top:0;right:10px;" @click="reset">清除筛选</a>
  </commonTemplate>
  <Page style="margin-top:10px;float:right" :total="totalCount" @on-change="pageChange" show-total :current="dataApi.currentPage" :page-size="dataApi.pageSize"></Page>
  </div>
</template>

<script>
  import commonTemplate from '../commonTemplate/index.vue';
  import expandRow from './expandRow.vue';
  export default {
    components: {
      commonTemplate,
      expandRow
    },
    data() {
      return {
        list:[],
        columns: [{
            type: 'expand',
            width: 40,
            render: (h,params) =>{
              return h(expandRow,{
                props: {
                  row: params.row
                }
              })
            },
        },{
          title: '公司名称',
          key: 'companyName',
          ellipsis: true
        }, {
          title: '地区',
          key: 'address',
          ellipsis: true
        }, {
          title: '无效报价',
          key: 'missSell',
        }, {
          title: '调度选中率',
          key: 'chooseRate'
        }, {
          title: '中标次数',
          key: 'getSell'
        }, {
          title: '响应次数',
          key: 'totalNum'
        }, {
          title: '中标率',
          key: 'getRate'
        }, {
          title: '有效报价',
          key: 'validSell'
        }, {
          title: '调度选中次数',
          key: 'chooseNum'
        }, {
          title: '品类',
          key: 'ironType',
          ellipsis: true
        }, {
          title: '材质',
          key: 'material',
          ellipsis: true
        }, {
          title: '表面',
          key: 'surface',
          ellipsis: true
        }, {
          title: '产地',
          key: 'proPlace',
          ellipsis: true
        }],
        dataApi:{
          startTime: '',
          endTime:'',
          currentPage: 1,
          pageSize: 10,
          companyName: ''
        },
        totalCount: 0
      }
    },
    computed: {
      // 给TABLE组件用的data数据整形
      filterList() {
        let arr = [];
        this.list.forEach(el => {
          let item = {};
          el.chooseRate = el.chooseRate + '%';
          el.getRate = el.getRate + '%';
          this.columns.forEach(el2 => {
            if(_.isArray(el[el2.key])){
              item[el2.key] =  el[el2.key].join()
            }else{
              item[el2.key] =  el[el2.key]
            }
          });
          arr.push(item)
        });
        return arr
      }
    },
    methods: {
      getData(params = {}){
        this.$http.get(this.api.jd_sellData,{
          params:this.dataApi
        }).then(res => {
          if(res.code === 1000){
            this.list = res.data.list;
            this.totalCount = res.data.totalCount
          }
        })
      },
      filterData(data){
        this.dataApi.startTime = data.startTime;
        this.dataApi.endTime = data.endTime;
        this.getData(data);
      },
      pageChange(page){
        this.dataApi.currentPage = page;
        this.getData();
      },
      reset(){
        this.dataApi ={
          startTime: '',
          endTime:'',
          currentPage: 1,
          pageSize: 10,
          companyName: ''
        }
        this.getData();
      }
    },
    created () {
      this.getData();
    }
  }
</script>


