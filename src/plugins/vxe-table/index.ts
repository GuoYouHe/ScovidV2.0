import { App, Component } from "vue"
import XEUtils from 'xe-utils'
import {
  // 全局对象
  VXETable,
  // 表格功能
  Filter,
  Edit,
  Menu,
  Export,
  Keyboard,
  Validator,

  // 可选组件
  Icon,
  Column,
  Colgroup,
  Grid,
  Tooltip,
  Pager,
  Form,
  FormItem,
  FormGather,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Switch,
  Input,
  Select,
  Optgroup,
  Option,
  Textarea,
  Button,
  Toolbar,
  Modal,
  List,
  Pulldown,

  // 表格
  Table
} from 'vxe-table'

const plugins =
  [Filter,
  Tooltip,
  Edit,
  Menu,
  Export,
  Keyboard,
  Validator,
  Icon,
  Column,
  Colgroup,
  Grid,
  Tooltip,
  Pager,
  Form,
  FormItem,
  FormGather,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Switch,
  Input,
  Select,
  Optgroup,
  Option,
  Textarea,
  Button,
  Toolbar,
  Modal,
  List,
  Pulldown,
  Table];

// import zhCN from 'vxe-table/es/locale/lang/zh-CN'
import enUS from 'vxe-table/lib/locale/lang/en-US'

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(enUS, key), args)
})

export function useTable(app: App) {
  // 注册组件
  // components.forEach((component: Component) => {
  //   app.component(component.name, component);
  // });
  // 注册指令
  plugins.forEach(plugin => {
    app.use(plugin);
  });
}

/**
 * @description 按需引入vxetable
 * @see {@link https://vxetable.cn/#/table/start/use}
 */

