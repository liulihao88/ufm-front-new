define('ace/theme/tomorrow_night_bright.css', ['require', 'exports', 'module'], function (require, exports, module) {
  module.exports =
    '.ace-tomorrow-night-bright .ace_gutter {\n  background: #1a1a1a;\n  color: #DEDEDE\n}\n\n.ace-tomorrow-night-bright .ace_print-margin {\n  width: 1px;\n  background: #1a1a1a\n}\n\n.ace-tomorrow-night-bright {\n  background-color: #000000;\n  color: #DEDEDE\n}\n\n.ace-tomorrow-night-bright .ace_cursor {\n  color: #9F9F9F\n}\n\n.ace-tomorrow-night-bright .ace_marker-layer .ace_selection {\n  background: #424242\n}\n\n.ace-tomorrow-night-bright.ace_multiselect .ace_selection.ace_start {\n  box-shadow: 0 0 3px 0px #000000;\n}\n\n.ace-tomorrow-night-bright .ace_marker-layer .ace_step {\n  background: rgb(102, 82, 0)\n}\n\n.ace-tomorrow-night-bright .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid #888888\n}\n\n.ace-tomorrow-night-bright .ace_marker-layer .ace_highlight {\n  border: 1px solid rgb(110, 119, 0);\n  border-bottom: 0;\n  box-shadow: inset 0 -1px rgb(110, 119, 0);\n  margin: -1px 0 0 -1px;\n  background: rgba(255, 235, 0, 0.1)\n}\n\n.ace-tomorrow-night-bright .ace_marker-layer .ace_active-line {\n  background: #2A2A2A\n}\n\n.ace-tomorrow-night-bright .ace_gutter-active-line {\n  background-color: #2A2A2A\n}\n\n.ace-tomorrow-night-bright .ace_stack {\n  background-color: rgb(66, 90, 44)\n}\n\n.ace-tomorrow-night-bright .ace_marker-layer .ace_selected-word {\n  border: 1px solid #888888\n}\n\n.ace-tomorrow-night-bright .ace_invisible {\n  color: #343434\n}\n\n.ace-tomorrow-night-bright .ace_keyword,\n.ace-tomorrow-night-bright .ace_meta,\n.ace-tomorrow-night-bright .ace_storage,\n.ace-tomorrow-night-bright .ace_storage.ace_type,\n.ace-tomorrow-night-bright .ace_support.ace_type {\n  color: #C397D8\n}\n\n.ace-tomorrow-night-bright .ace_keyword.ace_operator {\n  color: #70C0B1\n}\n\n.ace-tomorrow-night-bright .ace_constant.ace_character,\n.ace-tomorrow-night-bright .ace_constant.ace_language,\n.ace-tomorrow-night-bright .ace_constant.ace_numeric,\n.ace-tomorrow-night-bright .ace_keyword.ace_other.ace_unit,\n.ace-tomorrow-night-bright .ace_support.ace_constant,\n.ace-tomorrow-night-bright .ace_variable.ace_parameter {\n  color: #E78C45\n}\n\n.ace-tomorrow-night-bright .ace_constant.ace_other {\n  color: #EEEEEE\n}\n\n.ace-tomorrow-night-bright .ace_invalid {\n  color: #CED2CF;\n  background-color: #DF5F5F\n}\n\n.ace-tomorrow-night-bright .ace_invalid.ace_deprecated {\n  color: #CED2CF;\n  background-color: #B798BF\n}\n\n.ace-tomorrow-night-bright .ace_fold {\n  background-color: #7AA6DA;\n  border-color: #DEDEDE\n}\n\n.ace-tomorrow-night-bright .ace_entity.ace_name.ace_function,\n.ace-tomorrow-night-bright .ace_support.ace_function,\n.ace-tomorrow-night-bright .ace_variable {\n  color: #7AA6DA\n}\n\n.ace-tomorrow-night-bright .ace_support.ace_class,\n.ace-tomorrow-night-bright .ace_support.ace_type {\n  color: #E7C547\n}\n\n.ace-tomorrow-night-bright .ace_heading,\n.ace-tomorrow-night-bright .ace_markup.ace_heading,\n.ace-tomorrow-night-bright .ace_string {\n  color: #B9CA4A\n}\n\n.ace-tomorrow-night-bright .ace_entity.ace_name.ace_tag,\n.ace-tomorrow-night-bright .ace_entity.ace_other.ace_attribute-name,\n.ace-tomorrow-night-bright .ace_meta.ace_tag,\n.ace-tomorrow-night-bright .ace_string.ace_regexp,\n.ace-tomorrow-night-bright .ace_variable {\n  color: #D54E53\n}\n\n.ace-tomorrow-night-bright .ace_comment {\n  color: #969896\n}\n\n.ace-tomorrow-night-bright .ace_c9searchresults.ace_keyword {\n  color: #C2C280\n}\n\n.ace-tomorrow-night-bright .ace_indent-guide {\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYFBXV/8PAAJoAXX4kT2EAAAAAElFTkSuQmCC) right repeat-y\n}\n\n.ace-tomorrow-night-bright .ace_indent-guide-active {\n  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAZSURBVHjaYvj///9/hivKyv8BAAAA//8DACLqBhbvk+/eAAAAAElFTkSuQmCC") right repeat-y;\n}\n'
})

define('ace/theme/tomorrow_night_bright', [
  'require',
  'exports',
  'module',
  'ace/theme/tomorrow_night_bright.css',
  'ace/lib/dom',
], function (require, exports, module) {
  exports.isDark = true
  exports.cssClass = 'ace-tomorrow-night-bright'
  exports.cssText = require('./tomorrow_night_bright.css')
  var dom = require('../lib/dom')
  dom.importCssString(exports.cssText, exports.cssClass, false)
})
;(function () {
  window.require(['ace/theme/tomorrow_night_bright'], function (m) {
    if (typeof module == 'object' && typeof exports == 'object' && module) {
      module.exports = m
    }
  })
})()
