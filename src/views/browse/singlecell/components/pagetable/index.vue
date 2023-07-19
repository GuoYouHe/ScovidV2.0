<script setup lang="ts">
import { useColumns } from "./vxetable";
import { ref, onMounted } from "vue";
const {
  gridOptions,
  xGrid,
  params,
  searchEvent,
  formData,
  resetEvent,
  tableExpand
} = useColumns();


const loadingbox = ref<boolean>(true);

interface PropsType {
  DataSet: string;
  Type: string;
  Celltype: string;
}
const props = withDefaults(defineProps<PropsType>(), {
  DataSet: "", // 默认值
  Type: "",
  Celltype: ""
});

const handleDownload = (imgdata, fileName) => {
  downloadBase64Image(imgdata, fileName);
};

const downloadBase64Image = (base64Data: string, fileName: string) => {
  const link = document.createElement('a');
  link.href = base64Data;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
  * desc: base64对象转blob文件对象
  * @param urlData  ：数据的base64对象
  * @param type  ：类型 png,pdf,doc,mp3等;
  * @returns {Blob}：Blob文件对象
  */
function base64ToBlob(urlData, type) {
  let arr = urlData.split(',');
  let array = arr[0].match(/:(.*?);/);
  let mime = (array && array.length > 1 ? array[1] : type) || type;
  // 去掉url的头，并转化为byte
  let bytes = window.atob(arr[1]);
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], {
    type: mime
  });
}

/**
 * desc: 下载导出文件
 * @param blob  ：返回数据的blob对象或链接
 * @param fileName  ：下载后文件名标记
 * @param fileType  ：文件类 word(docx) excel(xlsx) ppt等
 */
function downloadExportFile(blob, fileName, fileType) {
  let downloadElement = document.createElement('a');
  let href = blob;
  if (typeof blob == 'string') {
    downloadElement.target = '_blank';
  } else {
    href = window.URL.createObjectURL(blob); //创建下载的链接
  }
  downloadElement.href = href;
  downloadElement.download = fileName + '.' + fileType; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //触发点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  if (typeof blob != 'string') {
    window.URL.revokeObjectURL(href); //释放掉blob对象
  }
}

/**
 * desc: base64转文件并下载
 * @param base64 {String} : base64数据
 * @param fileType {String} : 要导出的文件类型png,pdf,doc,mp3等
 * @param fileName {String} : 文件名
 */
function downloadFile(base64, fileName, fileType) {
  let base641 = base64.split(';base64,')[1]
  let typeHeader = 'data:application/' + fileType + ';base64,' // 定义base64 头部文件类型
  let converedBase64 = typeHeader + base641;  // 拼接最终的base64
  let blob = base64ToBlob(converedBase64, fileType)  // 转成blob对象
  downloadExportFile(blob, fileName, fileType) // 下载文件
}



</script>
<template>
  <div>
    <vxe-grid ref="xGrid" v-bind="gridOptions" align="center" :expand-config="tableExpand">
      <!--将表单放在工具栏中-->
      <template #toolbar_buttons>
        <vxe-form :data="formData" @submit="searchEvent" @reset="resetEvent">
          <vxe-form-item field="name">
            <template #default>
              <vxe-input v-model="formData.searchname" type="text" placeholder="Input"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item>
            <template #default>
              <vxe-button type="submit" status="primary" content="Search"></vxe-button>
              <vxe-button type="reset" content="Reset"></vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
      <template #content="{ row }">
        <div class="expand-wrapper">
          <el-row :gutter="24" class="mb-[18px]">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-motion :initial="{
              opacity: 0,
              x: -100
            }" :enter="{
  opacity: 1,
  x: 0,
  transition: {
    // type: 'spring',
    stiffness: '50',
    delay: 200
  }
}">
              <el-card shadow="never" class="min-h-[480px]">
                <template #header>
                  <span class="cardheardtitle">Expression from each group</span>
                </template>
                <template #default>
                  <div v-loading="row.childDataleftloading" element-loading-text="Loading..." class="boxechart"
                    :id="'volcanoref' + row.id" style="width: 100%; height: 390px" />
                </template>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-motion :initial="{
              opacity: 0,
              x: 100
            }" :enter="{
  opacity: 1,
  x: 0,
  transition: {
    // type: 'spring',
    stiffness: '50',
    delay: 200
  }
}">
              <el-card shadow="never" class="min-h-[480px]">
                <template #header>
                  <span class="cardheardtitle">UMAP projection</span>
                </template>
                <template #default>
                  <div v-loading="row.childDatarightloading" element-loading-text="Loading...">
                    <div class="downLoadpng" @click="handleDownload(row.childDataRight, row.imgdataname)"
                      title="Save as pdf" style="position: absolute; right: 20%">
                      <img src="@/assets/img/browse/downloadpng.png"
                        style="width: 18px;height: 18px;position: absolute;right: 0px;" alt="png" />
                    </div>
                    <div style="width: 400px;height: 390px;margin: auto;">
                      <img v-show="!row.childDatarightloading" :src="row.childDataRight" alt="png" />
                    </div>
                  </div>
                </template>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </template>
    </vxe-grid>
  </div>
</template>
<style lang="scss" scoped>
.expand-wrapper {
  padding: 20px;
}

.downLoadpng {
  width: 100px;

  svg {
    margin: auto;
  }

  p {
    margin: 0 17%;
    color: transparent;
  }

  p:hover {
    color: aqua;
  }
}

.downLoadpng:hover {
  color: aqua;
}

img {
  width: 400px;
  height: 390px;
  margin: auto;
}
</style>
