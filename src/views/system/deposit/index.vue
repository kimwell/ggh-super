<template>
  <div>
    保证金
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        pageData: {
          currentPage: 1,
          pageSize: 10
        }
      }
    },
    methods: {
      getList() {
        this.$http.post(this.api.findMarginLevelPage,this.pageData).then(res => {
          if(res.code === 1000){
            this.list = res.data.list;
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