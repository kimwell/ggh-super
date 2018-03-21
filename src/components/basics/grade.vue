<template>
  <span class="grade" :class="'grade'+grade">
  </span>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default:''
      }
    },
    data() {
      return {}
    },
    computed: {
      grade() {
        if (this.value != '') {
          switch (this.value) {
            case '50万':
              return 1
              break;
            case '100万':
              return 2
              break;
            case '500万':
              return 3
              break;
          }
        }
      }
    },
    methods: {}
  }
</script>

<style lang='less' scoped>
  .grade{
    display: inline-block;
    width: 45px;
    height: 16px;
    margin: 0 10px;
    vertical-align: middle;
    &.grade3{
      background: url('../../assets/imgs/grade3.png') no-repeat
    }
    &.grade2{
      background: url('../../assets/imgs/grade2.png') no-repeat
    }
    &.grade1{
      width: 38px;
      background: url('../../assets/imgs/grade1.png') no-repeat
    }
  }
</style>