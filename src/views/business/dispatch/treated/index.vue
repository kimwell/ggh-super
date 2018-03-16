<template>
  <div>
    <Card :bordered="false" class="card">
      <Row>
        <Button type="warning" size="small" @click="getList">刷新</Button> 新任务数量：{{newTaskNum}}
      </Row>
      <Row v-for="(item,i) in list" :key="i">
        <Row class="row-list-head">
          <Col class="list-head" span="3">{{item.buser.companyName}}</Col>
          <Col class="list-head" span="1">{{item.buser.contactName}}</Col>
          <Col class="list-head" span="2">{{item.buser.contactNum}}</Col>
        </Row>
        <div class="row-list-body">
          <Row class="head">
            <Col class-name="col" span="1">货源地</Col>
            <Col class-name="col" span="2">品类</Col>
            <Col class-name="col" span="1">材质</Col>
            <Col class-name="col" span="1">表面</Col>
            <Col class-name="col" span="2">规格</Col>
            <Col class-name="col" span="1">公差</Col>
            <Col class-name="col" span="2">计量</Col>
            <Col class-name="col" span="1">产地</Col>
            <Col class-name="col" span="2">备注</Col>
            <Col class-name="col" span="2">剩余时间</Col>
            <Col class-name="col" span="2">可报价总量</Col>
            <Col class-name="col" span="2">有效报价</Col>
            <Col class-name="col" span="2">剩余可报价量</Col>
            <Col class-name="col" span="3">操作</Col>
          </Row>
          <Row v-for="(iron ,j) in item.ironBuy" :key="j" class="row-body">
            <Col class-name="col" span="1">{{iron.location}}</Col>
            <Col class-name="col" span="2">{{iron.ironType}}</Col>
            <Col class-name="col" span="1">{{iron.material}}</Col>
            <Col class-name="col" span="1">{{iron.surface}}</Col>
            <Col class-name="col" span="2">{{iron.specification != '' ? iron.specification : `${iron.height}*${iron.width}*${iron.length}`}}</Col>
            <Col class-name="col" span="1">{{iron.tolerance != '' ? iron.tolerance : '空'}}</Col>
            <Col class-name="col" span="2">{{iron.weight != '' ? iron.weight : '空'}}</Col>
            <Col class-name="col" span="1">{{iron.proPlace}}</Col>
            <Col class-name="col" span="2">{{iron.remark != '' ? iron.remark : '暂无备注'}}</Col>
            <Col class-name="col" span="2">
              <countDown :normal="true" :endTime="iron.sellTime | dateformatS" :nowTime="serverTime"></countDown>
            </Col>
            <Col class-name="col" span="2">{{iron.buserNum}}</Col>
            <Col class-name="col" span="2">{{iron.validBuserNum}}</Col>
            <Col class-name="col" span="2"><Button style="color:#19be6b;" @click="dispatchHandle(true,iron)" type="text">{{iron.remainBuserNum}}</Button></Col>
            <Col class-name="col" span="3">
              <Button type="warning" size="small" @click="dispatchHandle(false,iron)">进行调度</Button>
              <Button type="warning" size="small" @click="noGoods(iron)">确认无货</Button>
            </Col>
          </Row>
        </div>
      </Row>
      <Row v-if="list.length == 0">
        <Col class-name="col" span="24" style="border:0;text-align: center;padding: 20px 0;">暂无数据</Col>
      </Row>
      <Page class="page-count" size="small" :total="totalCount" :page-size="pageData.pageSize" @on-change="changePage"></Page>
    </Card>
    <Modal v-model="show" :title="showLog ? '剩余待报价商家列表':'求购报价调度详情'" width="1100" :closable="false" :mask-closable="false">
      <div>求购内容：{{currentData.ironType}}/{{currentData.surface}}/{{currentData.material}}/{{currentData.proPlace}}(求购城市：{{currentData.location}})</div>
      <div>规格：{{currentData.specification != '' ? currentData.specification : `${currentData.height}*${currentData.width}*${currentData.length}`}}</div>
      <div>公差：{{currentData.tolerance}}</div>
      <div>计量：{{currentData.number}}</div>
      <div>备注：{{currentData.remark != '' ? currentData.remark : '暂无备注'}}</div>
      <div v-if="showLog">
        <div style="color:red;padding:15px 0;">剩余待报价商家：{{currentData.remainBuserNum}}</div>
        <Row style="text-align: center;line-height:34px;">
          <Col span="8">公司名称</Col>
          <Col span="8">联系人</Col>
          <Col span="8">联系方式</Col>
        </Row>
        <Row style="text-align: center;line-height:34px;" v-for="(item,i) in notSell" :key="i">
          <Col span="8">{{item.companyName}}</Col>
          <Col span="8">{{item.contactName}}</Col>
          <Col span="8">{{item.contactNum}}</Col>
        </Row>
      </div>
      <div v-else>
        <div  style="padding: 15px 0;">
          <span>剩余报价时间：
              <countDown v-if="sellerTime" :normal="true" :endTime="sellerTime | dateformatS" :nowTime="serverTime2"></countDown>
          </span>
          <span>剩余可报价商家数：{{currentData.remainBuserNum}}</span>
        </div>
        <div class="table-contnet">
        <Row class-name="head" >
          <Col class-name="col" span="2">可多选</Col>
          <Col class-name="col" span="5">公司名称</Col>
          <Col class-name="col" span="2">报价人</Col>
          <Col class-name="col" span="2">联系方式</Col>
          <Col class-name="col" span="2">单价</Col>
          <Col class-name="col" span="2">公差</Col>
          <Col class-name="col" span="2">产地</Col>
          <Col class-name="col" span="4">交货时间</Col>
          <Col class-name="col" span="3">备注</Col>
        </Row>
        <Row  v-for="(item,i) in sellBuser" :key="i">
          <CheckboxGroup v-model="ironSellIds" @on-change="ironSellLen">
            <Col span="2" class-name="col">
              <Checkbox :label="item.sellId">
                  <span>&nbsp;</span>
              </Checkbox>
            </Col>
            <Col span="5" class-name="col">{{item.companyName}}</Col>
            <Col span="2" class-name="col">{{item.contactName}}</Col>
            <Col span="2" class-name="col">{{item.contactNum}}</Col>
            <Col span="2" class-name="col">{{item.offerPerPrice}}元/{{item.baseUnit}}</Col>
            <Col span="2" class-name="col">{{item.tolerance}}</Col>
            <Col span="2" class-name="col">{{item.proPlace}}</Col>
            <Col span="4" class-name="col">{{item.deliveryTime | dateformat}}</Col>
            <Col span="3" class-name="col">{{item.remark != '' ? item.remark: '暂无备注'}}</Col>
          </CheckboxGroup>
        </Row>
        </div>
        <div class="ironMiss">
          <p>错过报价：{{missBuser.length}}</p>
          <p v-for="item in missBuser" :key="item.id">
              {{ item.companyName }} — 联系人：{{item.contactName}} — 联系电话：{{item.contactNum}}
          </p>
        </div>
      </div>
      <div slot="footer">
        <Button @click="show = false,ironSellIds = []">取消</Button>
        <Button type="primary" @click="handleIronSell" v-show="!showLog">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import countDown from '@/components/basics/countDown'
  export default {
    components: {
      countDown
    },
    data() {
      return {
        pageData: {
          currentPage: 1,
          pageSize: 10
        },
        list: [],
        totalCount: 0,
        newTaskNum: 0,
        serverTime: '',
        serverTime2: '',
        sellerTime: '',
        show: false,
        showLog: false,
        notSell: [],
        currentData: {},
        sellBuser: [],
        ironSellIds: [],
        missBuser: []
      }
    },
    methods: {
      changePage(page) {
        this.pageData.currentPage = page;
        this.getList();
      },
      getList() {
        this.$http.post(this.api.findUnDealIronBuy, this.pageData).then(res => {
          if (res.code === 1000) {
            this.list = res.data.list
            this.totalCount = res.data.totalCount.totalCount
            this.newTaskNum = res.data.newTaskNum
            this.serverTime = res.data.systemTime
          }
        })
      },
      //  确认无货
      noGoods(data) {
        let params = {
          ironBuyId: data.id
        }
        this.$Modal.confirm({
          title: '确认提示',
          content: '确认无货？确认后将无法撤销！',
          onOk: () => {
            this.$http.post(this.api.ironNotHave, params).then(res => {
              if (res.code === 1000) {
                this.$Message.success('确认成功');
                this.getList();
              } else {
                this.$Message.error(res.message);
              }
            })
          }
        })
      },
      //   调度、查看剩余可报价量
      dispatchHandle(showLog,data) {
        this.showLog = showLog;
        this.currentData = data;
        let params = {
          ironBuyId: data.id
        }
        if(this.showLog){
          this.$http.post(this.api.findNotSellBuser,params).then(res => {
            if(res.code === 1000){
              this.notSell = res.data
            }
          })
        }else{
          this.$http.post(this.api.findSellBuser,params).then(res => {
            if(res.code === 1000){
              this.sellBuser = res.data.validSell
              this.missBuser = res.data.missSell
              this.serverTime2 = res.data.systemTime
              this.sellerTime = res.data.sellTime
            }
          })
        }
        this.show = true;
      },
      ironSellLen() {
        if(this.ironSellIds.length > 2){
          console.log()
        }
      },
      handleIronSell() {
        if(this.ironSellIds.length != 0){
          let params = {
            ironBuyId: this.currentData.id,
            ironSellIds:  this.ironSellIds.toString()
          }
          this.$http.post(this.api.saveIronSellSelect,params).then(res => {
            if(res.code === 1000){
              this.$Message.success('操作成功');
              this.getList();
              this.show = false;
              this.ironSellIds = [];
            }else{
              this.$Message.error(res.message)
            }
          })
        }else{
          this.$Message.error('请选择报价');
        }
      }
    },
    created() {
      this.getList()
    }
  }
</script>

<style lang='less' scoped>
  .card {
      padding-bottom: 40px;
    .row-list-body {
      border-top: 1px solid #d0d0d0;
      border-left: 1px solid #d0d0d0;
    }
    .row-list-head {
      height: 40px;
      line-height: 40px;
      .list-head {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .head {
      text-align: center;
      background: #e6e6e6;
      height: 40px;
      line-height: 40px;
    }
    .row-body {
      text-align: center;
      height: 40px;
      line-height: 40px;
    }
    .col {
      padding: 0 5px;
      border-right: 1px solid #d0d0d0;
      border-bottom: 1px solid #d0d0d0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .page-count {
      position: absolute;
      right: 0;
      bottom: 10px;
    }
  }
  .ironMiss{
    margin-top: 20px;
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