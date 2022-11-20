<template>
  <div class="xtx-city">
    <div class="select" @click="isShow = !isShow">
      <span class="value" v-if="modelValue">{{ modelValue }}</span>
      <span class="placeholder" v-else>请选择配送地址</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="isShow">
      <b class="back" v-if="level !== -1" @click="handleBack">&lt;</b>
      <span class="ellipsis" v-for="item in dataList" :key="item.code" @click="handleSelect(item)">{{ item.name
      }}</span>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { ref, reactive } from 'vue'
export default {
  name: 'XtxCity',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 省市区的列表
    const dataList = ref([])
    // 控制省市区的盒子显示和隐藏
    const isShow = ref(false)
    // 备份省市区的列表、为了关闭做数据重置
    const cacheData = ref(null)
    // 收集用户选择的省市区
    const selectResult = reactive({
      // 省编码
      proviceCode: '',
      // 省名字
      proviceName: '',
      // 市编码
      cityCode: '',
      // 市名字
      cityName: '',
      // 区编码
      countyCode: '',
      // 区名字
      countyName: '',
      // 完整地址
      address: ''
    })
    getAreaList()
    const timeline = []
    async function getAreaList () {
      // 1. 获取省级行政区划
      const resp = await axios({
        method: 'get',
        url: 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      })
      // 2. 赋值
      // 一份赋值给ref对象 -> 给模板用
      dataList.value = resp.data
      // 另一份赋值给 cacheData、为了关闭做数据重置
      // cacheData不受影响
      // !!!如果另一外对象受影响了，需要借助拷贝
      cacheData.value = resp.data
      timeline.push(resp.data)
    }
    const level = ref(0)
    // 点击切换
    function handleSelect (item) {
      // 拿到item的areaList数组，赋值给dataList
      dataList.value = item.areaList
      // item的level
      // 0： 省/ 1： 市/ 2： 区
      if (item.level === 0) { // 省
        selectResult.proviceCode = item.code
        selectResult.proviceName = item.name
        timeline[1] = item.areaList
      } else if (item.level === 1) { // 市
        selectResult.cityCode = item.code
        selectResult.cityName = item.name
        timeline[2] = item.areaList
      } else { // 区
        // 隐藏盒子
        isShow.value = false
        // 把备份的数据赋值给dataList
        dataList.value = cacheData.value
        selectResult.countyCode = item.code
        selectResult.countyName = item.name
        // 在选择了区之后、生成完整地址
        selectResult.address = `${selectResult.proviceName}-${selectResult.cityName}-${selectResult.countyName}`
        emit('update:modelValue', selectResult.address)
        level.value = 0
      }
      level.value = item.level
    }

    const handleBack = () => {
      dataList.value = timeline[level.value--]
    }

    // 返回数据
    return {
      dataList,
      handleSelect,
      isShow,
      selectResult,
      level,
      handleBack
    }
  }
}

// const obj1 = { name: 'zs' }
// const obj2 = obj1
// const obj3 = obj1
// obj2.name = 'ls'
// console.log(obj3)// ls

</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  margin-left: 10px;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    .back {
      position: absolute;
      top: 13px;
      left: 13px;
      width: 21px;
      height: 21px;
      line-height: 21px;
      text-align: center;
      background: yellowgreen;
    }

    >span:not(first-child) {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
