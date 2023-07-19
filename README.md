## 用法

### 安装依赖

pnpm install

### 安装一个包

pnpm add 包名

### 卸载一个包

pnpm remove 包名

pnpm build 打包

###owl 插件使用 ###应急使用 ###修改 vue-owl-carousel/src/Carousel.vue
添加 import $ from 'jquery' ###修改 normal\_ 中的 owl.carousel/dist/owl.carousel.js
将函数中的; (function ($, window, document, undefined)改为; (function (a, window, document, undefined) ctrl + h
添加
import $ from 'jquery'
import jQuery from 'jquery'

###后期优化
#vite 配置 jquery 全局使用

###

Scovid 为前后端分离项目(Frontend-Backend Separation Project)由 Vue(v3.2.45) SpringBoot（v2.5.1）以及 MySQL（v5.7.24）构建。Vue 做为前端框架负责页面可视化以及与后端数据交互,使用 SpringBoot 负责后端部分业务逻辑以及数据处理，采用 MySQL 作为数据存储和查询接口。HTML5、CSS、Axios、jQuery、TypeScript 和 Element-Plus 用于前端页面渲染和交互操作。 Echarts 用于绘制交互式图表。 vxe-table 用于显示网站中的表格。 R 脚本用于在线生物信息学分析。 Scovid 网站无需注册即可在线访问 它在网站上提供了一个用户友好的浏览、比较、搜索和时间序列分析界面（图 1c）。

Scovid was constructed by Vue (v3.2.45), Spring Boot (v2.5.1), and MySQL (v5.7.24) for the Frontend-Backend Separation Project.As the front-end framework.Vue is responsible for page visualization and interaction with back-end data. SpringBoot is used for back-end business logic and data processing. MySQL is used as data storage and query interface. HTML5, CSS, Axios, jQuery, TypeScript and Element-Plus are used for web rendering and interaction.Echarts is used to draw interactive charts.Vxe-table is used to display tables in websites.
