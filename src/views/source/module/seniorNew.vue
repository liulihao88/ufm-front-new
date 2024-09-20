<template>
  <S3CSModule
    v-if="setUpType_show_v == 'S3-CS' || setUpType_show_v == 'S3-OSS'"
    :formState="formState"
    @getFormState="getFormState"
  />
  <OEOS1OSModule
    v-if="setUpType_show_v == 'OEOS1OS' || setUpType_show_v == 'HCP'"
    :formState="formState"
    @getFormState="getFormState"
  />
  <AS3SModule v-if="setUpType_show_v == 'AS3S'" :formState="formState" @getFormState="getFormState" />
  <FTPModule v-if="setUpType_show_v == 'FTP'" :formState="formState" @getFormState="getFormState" />
  <SFTPModule v-if="setUpType_show_v == 'SFTP'" :formState="formState" @getFormState="getFormState" />
  <TFTPModule v-if="setUpType_show_v == 'TFTP'" :formState="formState" @getFormState="getFormState" />
  <VFSModule v-if="setUpType_show_v == 'VFS'" :formState="formState" @getFormState="getFormState" />
  <InputItem
    v-if="setUpType_show_v == 'HMS'"
    labelStr="请求方式"
    value=""
    type="radio5"
    :formState="formState"
    @getRequestFn="getRequestFn"
  />
</template>
<script lang="ts">
import { defineComponent, ref, watch, nextTick, inject } from 'vue'

import S3CSModule from './seniorComponent/S3CS.vue'
import AS3SModule from './seniorComponent/AS3S.vue'
import OEOS1OSModule from './seniorComponent/OEOS1OS.vue'
import FTPModule from './seniorComponent/FTP.vue'
import SFTPModule from './seniorComponent/SFTP.vue'
import TFTPModule from './seniorComponent/TFTP.vue'
import VFSModule from './seniorComponent/VFS.vue'

export default defineComponent({
  components: {
    S3CSModule,
    OEOS1OSModule,
    AS3SModule,
    FTPModule,
    SFTPModule,
    TFTPModule,
    VFSModule,
  },
  props: {
    setUpTypeName: {
      type: String,
      default: null,
    },
    setUpData: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const setUpType_show_v = ref<string>('')
    watch(
      () => props.setUpTypeName,
      (newVal: any) => {
        nextTick(() => {
          setUpType_show_v['value'] = newVal
        })
      },
      {
        immediate: true,
        deep: true,
      },
    )
    const formDataSenior = inject('formDataSenior') //编辑后的数据
    const getFormState = (val: any) => {
      formDataSenior['value'] = val
      emit('isTestPassFn')
      return formDataSenior['value']
    }
    const formState = ref<any>(props.setUpData)
    watch(
      () => props.setUpData,
      (newVal: any) => {
        if (newVal) {
          formState['value'] = newVal
        }
      },
      {
        immediate: true,
        deep: true,
      },
    )
    const getRequestFn = () => {}
    return {
      setUpType_show_v,
      getFormState,
      formDataSenior,
      formState,
      getRequestFn,
    }
  },
})
</script>
