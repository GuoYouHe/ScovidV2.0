<script setup lang="ts">
import { ref } from "vue";
import detaildownload from "./components/detaildownload.vue";
defineOptions({
  name: "Download"
});

const activeNames = ref(["1"]);
const handleChange = (val: string[]) => {
  console.log(val);
};
const activeNames1 = ref(["1"]);
const handleChange1 = (val: string[]) => {
  console.log(val);
};

const activeNames2 = ref(["0"]);
const handleChange2 = (val: string[]) => {
  console.log(val);
};
const DataType = ref("bulk");
</script>

<template>
  <div class="Download">
    <div class="demo-collapse">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="Single-cell Data Downloads" name="1">
          <detaildownload DataType="singlecell" />
        </el-collapse-item>
      </el-collapse>
      <br />
      <el-collapse v-model="activeNames1" @change="handleChange1">
        <el-collapse-item title="Bulk Data Downloads" name="1">
          <detaildownload DataType="bulk" />
        </el-collapse-item>
      </el-collapse>
      <br />
      <!-- <el-collapse v-model="activeNames2" @change="handleChange2">
        <el-collapse-item title="Other Data Downloads" name="1">
          <detaildownload DataType="other" />
        </el-collapse-item>
      </el-collapse> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Download {
  min-height: 800px;
  margin-top: 50px !important;
}

:deep(.el-card) {
  margin-top: 30px;
}

:deep(.el-card__header) {
  height: 43px;
  line-height: 32px;
  padding: 5px 10px !important;
  background-color: #e0e0e0;
}

:deep(.el-collapse) {
  border: 0px solid;

  .el-collapse-item.is-active {
    .el-collapse-item__header {
      height: 43px;
      line-height: 32px;
      padding: 5px 10px !important;
      transition: 0.1s linear;
      background-color: #e0e0e0;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      border-bottom-right-radius: 0px;
      border-bottom-left-radius: 0px;
    }

    .el-collapse-item__wrap {
      border-bottom: 1px #e0e0e0 solid;
      border-left: 1px #e0e0e0 solid;
      border-right: 1px #e0e0e0 solid;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;

      .el-collapse-item__content {
        width: 95%;
        height: 95%;
        min-height: 286px;
        margin: auto;
      }
    }
  }

  .el-collapse-item__header {
    height: 43px;
    line-height: 32px;
    padding: 5px 10px !important;
    background-color: #e0e0e0;
    transition: 0.5s linear;
    border-radius: 10px;
    font-weight: 700;
    font-size: 16px;

    .el-collapse-item__arrow {
      font-weight: 300;
    }

    .el-collapse-item__arrow::before {
      content: "+";
      color: white;
      font-style: normal;
      font-weight: 700;
      font-size: 30px;
      transition: 0.2s linear;
    }
  }

  .el-collapse-item__wrap {
    border-bottom: 1px #e0e0e0 solid;
    border-left: 1px #e0e0e0 solid;
    border-right: 1px #e0e0e0 solid;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;

    .el-collapse-item__content {
      width: 95%;
      height: 95%;
      margin: auto;
    }
  }
}

.main-content {
  margin: 15px;
}

.cardheardtitle {
  font-size: 16px;
  font-weight: 700;
}</style>
