<template>
  <div>数据字典
    <a @click="add">添加</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageData: {
          currentPage: 1,
          pageSize: 10
        },
        list: [],
        totalCount: 0,
        apiData:{
          id: '',
          name: '数据字典',
          codes: '1002',
          vals: '内容',
          remark: '备注备注'
        }
      }
    },
    methods: {
      getList() {
        this.$http.post(this.api.findDataDictionaryPage,this.pageData).then(res => {
          if(res.code === 1000){
            console.log(res)
            this.list = res.data.list;
            this.totalCount = res.data.totalCount;
          }
        })
      },
      add() {
        this.$http.post(this.api.saveUpdateDataDictionary,this.apiData).then(res => {
          if(res.code === 1000){
            this.$Message.success('添加成功')
          }
        })
      }
    },
    created () {
      this.getList();
    }
  }
</script>

<style lang='less' scoped>
  
</style>