<template>
  =={{ setUpType_show_v }}??
  <LFSModule v-if="setUpType_show_v == 'LFS'" :formState="formState" @getFormState="getFormState" />

  <XFSModule v-if="setUpType_show_v == 'XFS'" :formState="formState" @getFormState="getFormState" />
  <AS3SModule v-if="setUpType_show_v == 'AS3S'" :formState="formState" @getFormState="getFormState" />
  <S3CSModule v-if="setUpType_show_v == 'S3-CS'" :formState="formState" @getFormState="getFormState" />
  <OSSModule v-if="setUpType_show_v == 'S3-OSS'" :formState="formState" @getFormState="getFormState" />
  <MABSModule v-if="setUpType_show_v == 'MADLG'" type="MADLG" :formState="formState" @getFormState="getFormState" />
  <MABSModule v-if="setUpType_show_v == 'MABS'" type="MABS" :formState="formState" @getFormState="getFormState" />
  <OEOS1OSModule
    v-if="setUpType_show_v == 'OEOS1OS'"
    type="OEOS1OS"
    :formState="formState"
    @getFormState="getFormState"
  />
  <OEOS1OSModule v-if="setUpType_show_v == 'HCP'" type="HCP" :formState="formState" @getFormState="getFormState" />
  <MQEModule v-if="setUpType_show_v == 'MQE'" :formState="formState" @getFormState="getFormState" />
  <HCPCSModule v-if="setUpType_show_v == 'HCP-CS'" :formState="formState" @getFormState="getFormState" />
  <OSModule v-if="setUpType_show_v == 'OS'" :formState="formState" @getFormState="getFormState" />
  <BBCSModule v-if="setUpType_show_v == 'BBCS'" :formState="formState" @getFormState="getFormState" />

  <FTPModule v-if="setUpType_show_v == 'FTP'" type="FTP" :formState="formState" @getFormState="getFormState" />
  <FTPModule v-if="setUpType_show_v == 'HDFS'" type="HDFS" :formState="formState" @getFormState="getFormState" />
  <FTPModule
    v-if="setUpType_show_v == 'ZOOKEEPER'"
    type="ZOOKEEPER"
    :formState="formState"
    @getFormState="getFormState"
  />

  <SFTPModule v-if="setUpType_show_v == 'SFTP'" :formState="formState" @getFormState="getFormState" />
  <TFTPModule v-if="setUpType_show_v == 'TFTP'" :formState="formState" @getFormState="getFormState" />
  <CIFSModule v-if="setUpType_show_v == 'CIFS'" :formState="formState" @getFormState="getFormState" />
  <NFSModule v-if="setUpType_show_v == 'NFS'" :formState="formState" @getFormState="getFormState" />

  <WEBDAVModule v-if="setUpType_show_v == 'WEBDAV'" :formState="formState" @getFormState="getFormState" />
  <MFSModule v-if="setUpType_show_v == 'MFS'" :formState="formState" @getFormState="getFormState" />
  <VFSModule v-if="setUpType_show_v == 'VFS'" :formState="formState" @getFormState="getFormState" />

  <HMSModule v-if="setUpType_show_v == 'HMS'" :formState="formState" @getFormState="getFormState" />

  <TIKVModule v-if="setUpType_show_v == 'TIKV'" :formState="formState" @getFormState="getFormState" />
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, watch, nextTick, inject } from 'vue'
import LFSModule from './setUpComponent/LFS.vue'
import XFSModule from './setUpComponent/XFS.vue'
import AS3SModule from './setUpComponent/AS3S.vue'
import S3CSModule from './setUpComponent/S3CS.vue'
import OSSModule from './setUpComponent/OSS.vue'
import OEOS1OSModule from './setUpComponent/OEOS1OS.vue'
import MQEModule from './setUpComponent/MQE.vue'
import HCPCSModule from './setUpComponent/HCPCS.vue'
import OSModule from './setUpComponent/OS.vue'
import BBCSModule from './setUpComponent/BBCS.vue'
import FTPModule from './setUpComponent/FTP.vue'
import SFTPModule from './setUpComponent/SFTP.vue'
import TFTPModule from './setUpComponent/TFTP.vue'
import CIFSModule from './setUpComponent/CIFS.vue'
import NFSModule from './setUpComponent/NFS.vue'
import WEBDAVModule from './setUpComponent/WEBDAV.vue'
import MABSModule from './setUpComponent/MABS.vue'
import MFSModule from './setUpComponent/MFS.vue'
import VFSModule from './setUpComponent/VFS.vue'
import HMSModule from './setUpComponent/HMS.vue'
import TIKVModule from './setUpComponent/TIKV.vue'
export default defineComponent({
  components: {
    LFSModule,
    XFSModule,
    AS3SModule,
    S3CSModule,
    OSSModule,
    OEOS1OSModule,
    MQEModule,
    HCPCSModule,
    OSModule,
    BBCSModule,
    FTPModule,
    SFTPModule,
    TFTPModule,
    NFSModule,
    WEBDAVModule,
    MABSModule,
    CIFSModule,
    MFSModule,
    VFSModule,
    HMSModule,
    TIKVModule,
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
    const state: any = ref()
    state['value'] = {
      value_TLS: [],
      ableNum: '4',
    }
    const setUpType_show_v: any = ref()
    setUpType_show_v['value'] = ''

    const formState = ref<any>({})
    formState['value'] = {
      name: '',
      host: '',
      port: '',
      catalog: '',
      testType: '',
      userName: '',
      password: '',
      remark: '',
      tableData: [],
      view: '',
      accountType: '',
      area: '',
      isOverall: false,
      isAnonymous: false,
      visitKey: '',
      passwordKey: '',
      buckect: '',
      isTLS_visit: false,
      isTLS_lost: false,
      serverOffer: '',
      serverUrl: '',
      isCustom: false,
      systemEnterType: '',
      sign: '',
      edition: '',
      domain: '',
      tenantID: '',
      spaceName: '',
      approve: '',
      base64Name: '',
      MD5: '',
      HCP_enter: '',
      queryType: '',
      queryScript: '',
      container: '',
      loginUrl: '',
      loginID: '',
      loginPassword: '',
      encryptionTransmission: '',
      shareName: '',
      GID: '',
      UID: '',
      database: '',
    }

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
    watch(
      () => props.setUpData,
      (newVal: any) => {
        if (newVal) {
          formState['value'] = newVal
        } else {
          formState['value'] = null
        }
      },
      {
        immediate: true,
        deep: true,
      },
    )

    const getParentValue = () => {
      return props.setUpTypeName
    }
    const formDataSetUp = inject('formDataSetUp') //编辑后的数据

    const getFormState = (val: any) => {
      console.log(`92 val`, val)
      formDataSetUp['value'] = val
      emit('isTestPassFn')
      return formDataSetUp['value']
    }

    return {
      formState,
      ...toRefs(state['value']),
      setUpType_show_v,
      getParentValue,
      getFormState,
      formDataSetUp,
    }
  },
})
</script>
<style scoped lang="scss">
.tips-el {
  padding-top: 8px;
  font-size: 12px;
  color: #d9d9d9;
}
</style>
