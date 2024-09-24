<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
import dayjs from 'dayjs'
import { pick } from 'lodash-es'
const { proxy } = getCurrentInstance()
const props = defineProps({
  taskEditData: {
    type: Object,
  },
})
const form = ref({
  last4Minutes: 300,
  enableAutomaticPause: false,
})
const formRef = ref()
const weekRecodeDate = ref({
  hour: '12',
  min: '1',
  week: '',
})
const weekValue = ref([])
const valueTime = ref(dayjs('12:01:00', 'HH:mm:ss'))
const rules = {}

watch(
  () => props.taskEditData,
  (val) => {
    if (proxy.notEmpty(val.enableAutomaticPause)) {
      form.value = pick(val, ['enableAutomaticPause', 'last4Minutes', 'cronExpression'])
      if (form.value.cronExpression) {
        let arr = form.value.cronExpression.split(' ')
        console.log(`65 arr`, arr)
        weekRecodeDate.value.min = arr[1]
        weekRecodeDate.value.hour = arr[2]
        weekRecodeDate.value.week = arr[arr.length - 2]
        console.log(`62 weekRecodeDate.value.week`, weekRecodeDate.value.week)
        weekValue.value = arr[arr.length - 2].split(',')
        valueTime.value = dayjs(`${arr[2]}:${arr[1]}:00`, 'HH:mm:ss')
      }
    }
  },
  {
    immediate: true,
  },
)

const options = ref([
  {
    value: '2',
    label: '星期一',
  },
  {
    value: '3',
    label: '星期二',
  },
  {
    value: '4',
    label: '星期三',
  },
  {
    value: '5',
    label: '星期四',
  },
  {
    value: '6',
    label: '星期五',
  },
  {
    value: '7',
    label: '星期六',
  },
  {
    value: '1',
    label: '星期日',
  },
])

function handleWeekChange(value) {
  weekRecodeDate.value.week = value.join(',')
  weekCommonFn()
}
const timeChangeFn = () => {
  const _fn = (h, m) => {
    weekRecodeDate.value.hour = h
    weekRecodeDate.value.min = m
  }
  if (valueTime.value) {
    _fn(valueTime.value.$H, valueTime.value.$m)
  } else {
    _fn(0, 0)
  }
  weekCommonFn()
}

function weekCommonFn() {
  form.value.cronExpression = `0 ${weekRecodeDate.value.min} ${weekRecodeDate.value.hour} ? * ${weekRecodeDate.value.week} *`
}
async function testData() {
  proxy.log(`form.value`, form.value, '89行 src/views/task/module/workConfig.vue')
  let res = await $getData()
  proxy.log(`res`, res, '90行 src/views/task/module/workConfig.vue')
}
async function $getData() {
  console.log(`83 form.value.enableAutomaticPause`, form.value.enableAutomaticPause)
  const cloneForm = proxy.clone(form.value)
  if (cloneForm.enableAutomaticPause) {
    return new Promise((resolve, reject) => {
      if (proxy.isEmpty(weekValue.value)) {
        proxy.$toast('请选择工作配置的开始周', 'e')
        reject()
      } else if (!cloneForm.last4Minutes || Number(cloneForm.last4Minutes) < 0) {
        proxy.$toast('工作配置的持续时长必须大于等于0', 'e')
        reject()
      } else {
        resolve(cloneForm)
      }
    })
  } else {
    return Promise.resolve({
      enableAutomaticPause: cloneForm.enableAutomaticPause,
    })
  }
}

defineExpose({
  $getData,
})
</script>

<template>
  <div>
    <!-- <el-button type="primary" @click="testData" v-if="proxy.$dev">测试值</el-button> -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="开启自动暂停" prop="name">
        <el-switch v-model="form.enableAutomaticPause" />
      </el-form-item>
      <o-title title="系统运行暂停策略" b="24" />
      <el-form-item label="开始周" prop="" :required="form.enableAutomaticPause">
        <o-select
          v-model="weekValue"
          :options="options"
          multiple
          :disabled="!form.enableAutomaticPause"
          width="600"
          placeholder="请选择周配置"
          @change="handleWeekChange"
        />
      </el-form-item>
      <el-form-item label="开始时间" prop="">
        <a-time-picker
          v-model:value="valueTime"
          format="HH:mm"
          :disabled="!form.enableAutomaticPause"
          :allowClear="false"
          @change="timeChangeFn"
        />
      </el-form-item>
      <el-form-item label="持续时长" prop="">
        <o-input v-model.number="form.last4Minutes" v-number width="100" :disabled="!form.enableAutomaticPause" />
        <span class="ml">分钟</span>
      </el-form-item>
    </el-form>
  </div>
</template>
