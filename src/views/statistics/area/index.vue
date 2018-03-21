<template>
  <div>
    <commonTemplate :tableHead="columns" :tableBody="filterList" @date-pick="filterData">
    热门地区分析
  </commonTemplate>
  <Page style="margin-top:10px;float:right" :total="totalCount" @on-change="pageChange" show-total :current="dataApi.currentPage" :page-size="dataApi.pageSize"></Page>
  </div>
</template>

<script>
  import commonTemplate from '../commonTemplate/index.vue'
  import expandRow from './expandRow.vue';
  export default {
    components: {
      commonTemplate,
      expandRow
    },
    data() {
      return {
        list: [],
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
          title: '地区',
          key: 'locationName',
          ellipsis: true
        }, {
          title: '求购量',
          key: 'totalNum',
          className: 'red',
          sortable: true
        }, {
          title: '成交次数',
          key: 'getNum'
        }, {
          title: '成交率',
          key: 'getRate'
        }, {
          title: '有货调度次数',
          key: 'maimaimai',
          ellipsis: true
        }, {
          title: '无货调度次数',
          key: 'ptlb',
          ellipsis: true
        }, {
          title: '有货调度率',
          key: 'maiRate',
          ellipsis: true
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
          endTime: '',
          currentPage: 1,
          pageSize: 10
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
      getData(params = {}) {
        this.$http.get(this.api.jd_locationData, {
          params: this.dataApi
        }).then(res => {
          if (res.code === 1000) {
            this.list = res.data.list;
            this.totalCount = res.data.totalCount
          }
        })
      },
      filterData(data) {
        this.dataApi.startTime = data.startTime
        this.dataApi.endTime = data.endTime
        this.getData(data);
      },
      pageChange(page){
        this.dataApi.currentPage = page;
        this.getData();
      }
    },
    created() {
      this.getData();
    }
  }
</script>
