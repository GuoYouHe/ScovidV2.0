<template>
  <div class="bodyimg" v-loading="loading" element-loading-text="Loading...">
    <el-row class="imgaeWord imagecontent" :gutter="0">
      <el-col :span="24" class="title_left">
        <div v-for="(item, i) in data.shwoImg" :key="i">
          <img
            class="img-item-null"
            v-if="item.isborder"
            :src="item.src"
            alt=""
          />
        </div>
        <!-- //人体组织 -->
        <div
          :style="
            data.shwoImg[0].isborder ? 'display:block;' : 'display: none;'
          "
        >
          <div
            v-for="tissue in data.tissueList"
            :key="tissue.id"
            style="position: absolute"
            :style="
              'top:' + tissue.style.top + '%;left:' + tissue.style.left + '%'
            "
          >
            <el-tooltip
              :content="tissue.title"
              :placement="
                tissue.style.border == 'borderLeft' ? 'left' : 'right'
              "
              effect="light"
            >
              <img
                class="tissueImages"
                :src="tissue.src"
                @click="clickText(tissue.id)"
              />
            </el-tooltip>
            <div
              class="clickText"
              :class="tissue.style.border2 + ' textOpacity'"
              :style="tissue.show ? 'display: none;' : 'display:block;'"
            >
              <table
                style="position: absolute; top: -50px"
                :style="
                  tissue.style.border == 'borderLeft'
                    ? 'left: 120%;'
                    : 'right: 120%;'
                "
              >
                <tr>
                  <td style="vertical-align: middle">
                    <div style="width: 0px">
                      <div class="backgroundLine"></div>
                    </div>
                  </td>
                  <td>
                    <div
                      :class="tissue.style.border"
                      v-for="(tabletext, i) in tissue.tabletext"
                      :key="i"
                    >
                      <div
                        v-if="tabletext.title != 'others'"
                        @click="tobrowse(tissue.title, tabletext.title)"
                      >
                        {{ tabletext.title }}&nbsp;&nbsp;&nbsp;({{
                          tabletext.projectNum
                        }})
                      </div>
                      <div
                        v-if="tabletext.title == 'others'"
                        @click="clickText(tissue.id)"
                      >
                        {{ tabletext.title }}&nbsp;&nbsp;&nbsp;({{
                          tabletext.projectNum
                        }})
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div
              class="clickText"
              :class="
                tissue.show
                  ? 'divTipAddArrow ' + tissue.style.border2
                  : tissue.style.border2
              "
              :style="
                tissue.show
                  ? 'display:block;' + tissue.style.top2 + tissue.style.left2
                  : 'display: none;'
              "
            >
              <table>
                <tr>
                  <td style="vertical-align: middle">
                    <div style="width: 0px">
                      <div class="backgroundLine" style=""></div>
                    </div>
                  </td>
                  <td>
                    <div
                      :class="
                        tissue.style.border == 'borderRight'
                          ? 'borderRight borderRight1 allTextStyle'
                          : 'borderLeft allTextStyle'
                      "
                    >
                      <div
                        v-for="(alltabletext, j) in tissue.alltabletext"
                        :key="j"
                        @click="tobrowse(tissue.title, alltabletext.title)"
                      >
                        {{ alltabletext.title }}&nbsp;&nbsp;&nbsp;({{
                          alltabletext.projectNum
                        }})
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 引入图片的css
import "@/style/homeimage.css";
import { ref } from "vue";
import { homoTissue } from "../hook";
const { data, clickText, tobrowse } = homoTissue();
const loading = ref(true);
setTimeout(() => {
  loading.value = !loading.value;
}, 800);
</script>

<style scoped>
.tissueImages {
  opacity: 0.6;
  width: 45px;
  height: 45px;
}
.content1 {
  margin-bottom: 40px;
}
.tissueImages:hover {
  opacity: 90;
  transform: scale(1.2);
  z-index: 1050;
}
.title_right_top img {
  width: 40px;
  height: 40px;
  margin: 0 0 0 0;
  opacity: 0.6;
}
.title_right_top_color td {
  opacity: 0.6;
}
.img-item-null {
  margin: 2px 0;
  width: 100%;
  height: 650px;
  position: relative;
}
.imgaeWord .clickTextLeft {
  cursor: pointer;
}
.homeImageChangeControl:hover {
  opacity: 90;
  transform: scale(1.2);
  z-index: 1050;
}
.title_right_top td {
  vertical-align: bottom;
  text-align: center;
  padding: 0;
}
.title_right_top table {
  margin: 0 0 0 85%;
  width: 15%;
}
.homeImageChangeControl.itemactive {
  opacity: 90;
}
.bodyimg {
  height: 95%;
  width: 95%;
  /* margin-left: 13%; */
}
.imagecontent {
  margin-top: 40px;
}
</style>
