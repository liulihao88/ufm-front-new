import { defineComponent } from 'vue'
export default defineComponent({
  components: {},
  props: {
    setUpTypeName: {
      type: String,
      default: null,
    },
    formState: {
      type: Object,
      default: null,
    },
  },
  setup() {
    return {}
  },
})

// {
//     "S3SIGNER_TYPE": "S3SignerType",
//     "PROXY_HOST": "",
//     "_<_PATH_SEPARATOR_>_": "/",
//     "HOST": "10.0.11.33",
//     "PROXY_TYPE": "HTTP",
//     "_<_CONNECTION_TIMEOUT_>_": "10000",
//     "_<_CONFIG_ID_>_": "f17083",
//     "PROXY_AUTHENTICATION_REQUIRED": "false",
//     "PROXY_STATUS": "USE_GLOBAL_SETTING",
//     "_<_FILE_SYSTEM_ID_>_": "HSP90838399",
//     "_<_DEFAULT_ITEMSPACE_NAME_>_": "",
//     "USE_SSL": "false",
//     "PLUGIN_ID": "CompatibleS3Plugin",
//     "PATH_STYLE_ACCESS": "false",
//     "_<_CONFIG_CLASS_>_": "com.amituofo.xfs.plugin.fs.objectstorage.s3compatible.CompatibleS3FileSystemEntryConfig",
//     "_<_CONFIG_CLASS_NAME_>_": "com.amituofo.xfs.plugin.fs.objectstorage.s3compatible.CompatibleS3FileSystemEntryConfig",
//     "PORT": "9009",
//     "API_VERSION": "2",
//     "USER": "admin",
//     "PROXY_PORT": "8080",
//     "_<_CONFIG_NAME_>_": "10.0.11.33",
//     "_<_ROOT_PATH_>_": "/",
//     "_<_DESCRIPTION_>_": "",
//     "CHECK_BUCKET_EXISTENCE": "false",
//     "IGNORE_SSL_CERTIFICATION": "false",
//     "PASSWORD": "21CB7709CD2227EB9FA82F0B028F4233",
//     "_<_FILE_SYSTEM_TYPE_>_": "Remote",
//     "ENDPOINT": "10.0.11.33:9009"
// }
