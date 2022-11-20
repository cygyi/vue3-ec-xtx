<template>
  <div class="goods-sku">
    <!-- 外循环生成行：有哪些规则；比如：颜色、尺寸等 -->
    <dl v-for="spec in goods.specs" :key="spec.name">
      <dt>{{ spec.name }}</dt>
      <dd>
        <!-- 内循环生成列：每种规格有哪些可供选择的具体项，比如：黑色、蓝色、白色等 -->
        <template v-for="btnObj in spec.values" :key="btnObj.name">
          <!-- 有图片优先显示图片 -->
          <!--
              这里的 btnObj.selected 属性是自定义的，后台给的数据是不存在这个属性的
              作用：通过这个属性值的true或false控制当前按钮是否选中
           -->
          <img v-if="btnObj.picture" :class="{ selected: btnObj.selected, disabled: btnObj.disabled }"
            :src="btnObj.picture" @click="changeSku(btnObj, spec)">
          <!-- 否则显示文字 -->
          <span v-else :class="{ selected: btnObj.selected, disabled: btnObj.disabled }"
            @click="changeSku(btnObj, spec)">{{ btnObj.name }}</span>
        </template>

      </dd>
    </dl>
  </div>
</template>
<script>
// 需求1：根据后台返回的规格列表得到一个路径字典
// 目的：不同规格按钮选择了之后，需要去路径字典中查询这个key（规格的名字）是否存在
// 如果存在，按钮不禁用，否则禁用

// 需求：如何禁用
// 1. 获取选中的值 -> 按顺序存储的数组
//    比如选中了蓝色、20、中国，得到数组['蓝色', '20', '中国']
//    比如选中了蓝色、10、没选，得到数组['蓝色', '10', undefined]
// 2. 把得到的数组过滤掉(filter)假值，筛选后的数组通过join()拼接成一个字符串，
//    作为key，去字典中查询
// 3. 如果查到了，不禁用；否则禁用，通过控制对象的 disabled 属性

import powerSet from '@/vendor/power-set'
const spliter = '⭐️'
// 定义函数：得到路径对象
const getPathMap = (skus) => {
  // 存储路径的对象
  const pathMap = {}
  skus.forEach(sku => {
    // 筛选出有效的sku，库存大于0
    if (sku.inventory > 0) {
      // 得到有效sku规则的数组
      const valueArr = sku.specs.map(item => item.valueName)
      // 得到所有可组合的sku集合
      const valueArrPowerSet = powerSet(valueArr)
      // 遍历数组
      valueArrPowerSet.forEach(arr => {
        const key = arr.join(spliter)
        if (pathMap[key]) {
          // 有这个key，就做数组的追加
          pathMap[key].push(sku.id)
        } else {
          // 没有这个key
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  // 返回对象
  return pathMap
}
// 获取选中的值
const getSelectedValues = (specs) => {
  return specs.map(item => {
    const val = item.values.find(val => val.selected)
    return val?.name
  })
}
// 更新按钮的禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((item, i) => {
    const selectedValues = getSelectedValues(specs)
    item.values.forEach(val => {
      // if (pathMap[val.name]) { // 在字典中，不需要禁用
      //   val.disabled = false
      // } else { // 需要禁用
      //   val.disabled = true
      // }
      // 等同于上方代码
      // 如果当前按钮已选中，则无需禁用
      if (val.selected) return
      // 存储新选中的规格
      selectedValues[i] = val.name
      // 根据选中的数组变成字符串的key
      const key = selectedValues.filter(v => v).join(spliter)
      if (pathMap[key]) { // 可选，无需禁用
        val.disabled = false
      } else { // 禁用
        val.disabled = true
      }
      // val.disabled = !pathMap[val.name]
    })
  })
}
// 初始化默认选中的具体规则（回显）
const initDefaultSelected = (goods, skuId) => {
  // 根据 skuId 去 goods.skus中查找sku对象
  const sku = goods.skus.find(sku => sku.id === skuId)
  if (!sku) return
  // 获取 sku.specs 中每个规格的值，去 goods.specs 中做比对。
  // 如果 sku.specs的值与goods.specs中的值全等，就让当前按钮的selected变为true
  // 遍历 goods.specs 数组
  goods.specs.forEach((item, index) => {
    // 根据 name 查找
    const btnObj = item.values.find(val => val.name === sku.specs[index].valueName)
    if (btnObj) { // 找到了，让当前按钮对象选中，selected变为true
      btnObj.selected = true
    } else { // 没找到，不选中
      btnObj.selected = false
    }
  })
}

export default {
  name: 'GoodsSku',
  props: {
    // 商品对象
    goods: {
      type: Object,
      default: () => {
        // skus： 选择到的具体的商品的规则数组
        // specs： 可供选择的规格
        return { skus: [], specs: [] }
      }
    },
    // 具体 sku的Id，表示默认选中的商品的默认规则
    skuId: {
      type: String,
      default: '1369155864430120962'
    }
  },
  setup (props, { emit }) {
    // 初始化回显选中状态
    initDefaultSelected(props.goods, props.skuId)
    // 调用函数，生成规格（组合）的路径字典（对象）
    const pathMap = getPathMap(props.goods.skus)
    // 点击了按钮之后，更新按钮的禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)
    // 切换按钮是否选中
    const changeSku = (btnObj, spec) => {
      // 如果禁用，提前结束
      if (btnObj.disabled) return
      // 让同类（平级的）统统不选中 -> 排他思想
      // eslint-disable-next-line no-return-assign
      spec.values.forEach(btnObj => btnObj.selected = false)
      // 如果这个属性是true，说明原来是选中的，点完之后变为不选中
      if (btnObj.selected) {
        // 变为false
        btnObj.selected = false
      } else { // 没有这个属性或者值为false，说明原来是未选中的，点完之后变为选中
        btnObj.selected = true
      }
      // 点击了按钮之后，更新按钮的禁用状态
      updateDisabledStatus(props.goods.specs, pathMap)

      // 判断所有的规则都选中了
      // 拿到所有选中值的数组
      const values = getSelectedValues(props.goods.specs)
      // 过滤掉undefined
      const selectedValues = values.filter(v => v)
      // 过滤了之后，数组的长度与 goods.specs 的长度做比对
      if (selectedValues.length === props.goods.specs.length) {
        // 所有的规格全选中了
        // 收集选中的数据（sku对象）
        // 根据选中值的数组，['黑色', '30', '日本]，通过join()拼接成一个字符串的key
        const key = selectedValues.join(spliter)
        // 去字典中查找skuId
        const [skuId] = pathMap[key]
        // 根据 skuId 去 goods.skus 数组中查找sku对象
        const skuObj = props.goods.skus.find(sku => sku.id === skuId)
        // 对规格数组做个格式化处理，得到字符串文本
        const str = skuObj.specs.map(item => `${item.name}:${item.valueName}`
        ).join(' ')
        // ...语法: 重要！！！
        // 作用：展开对象/数组、浅拷贝对象/数组、合并对象/数组，收集函数剩余参数
        emit('finish', {
          ...skuObj, // 展开对象所有属性
          // 新增一个规格的文本字符串
          specText: str
        })
      } else {
        // 没有全部选中
        emit('finish', null)
      }
    }

    return {
      changeSku
    }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: @xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
    background: #eee;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        border-color: #000;
        .sku-state-mixin ();
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        border-color: #000;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
