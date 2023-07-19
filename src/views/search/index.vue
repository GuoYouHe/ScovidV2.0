<script setup lang="ts">
import { useSearch, useSearchByCelltype, useForm } from "./hook";
import { ref, reactive, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
import pagetable from "./components/pagetable/index.vue";
import volcano from "./components/volcanotable/detailvolcano.vue";
import volcanobulk from "./components/volcanotable/detailvolcano_bulk.vue";
import volcanoother from "./components/volcanotable/detailvolcano_other.vue";
import type { FormInstance, FormRules } from "element-plus";
import { emitter } from "@/utils/mitt";

defineOptions({
  name: "Search"
});

const {
  options,
  tradata,
  tabselect,
  placeholder,
  geneFormRef,
  geneForm,
  tableload,
  tabPosition,
  loading,
  rangevar,
  generules,
  onSubmit,
  onMounted,
  generesetForm,
  aa,
  remoteMethod,
  pan,
  isTypeSelected
} = useSearch();

const {
  submitload,
  ruleFormRef,
  ruleForm,
  rules,
  submitForm,
  resetForm,
  optionstype,
  optionstissue,
  optionsdataset,
  changetype,
  changetissue,
  changedataset,
  clicktissue,
  clickdataset,
  submitdataset
} = useSearchByCelltype();

function onexample() {
  geneForm.name = [];
  geneForm.name = ['ACTG1', 'A1CF'];
  geneForm.numstart = 0
  geneForm.numend = 0.05
  geneForm.fcstart = 2
  geneForm.type = ['Single-cell', 'Bulk', 'Other coronaviruses']
  onSubmit(proxy.$refs["geneFormRef"] as any)
}


</script>
<template>
  <div class="mySearch" ref="zsksearchref">
    <el-card shadow="never" class="min-h-[380px] mb-[28px]">
      <template #header>
        <span class="cardheardtitle">Search DEGs in all conditions</span>
      </template>
      <template #default>
        <el-row :gutter="20" style="transform: translateY(20%)">
          <!-- 左侧查询条件 -->
          <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
            <div class="demo-input-suffix">
              <el-form ref="geneFormRef" :rules="generules" :model="geneForm" label-width="120px" label-position="left">
                <el-form-item label="Type" prop="type">
                  <el-checkbox-group v-model="geneForm.type">
                    <el-checkbox label="Single-cell" name="type" />
                    <el-checkbox label="Bulk" name="type" />
                    <el-checkbox label="Other coronaviruses" />
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Input Gene" prop="name" class="inputgenecalss">
                  <el-select class="inline-input" v-model="geneForm.name" multiple filterable allow-create clearable
                    :reserve-keyword="false" remote remote-show-suffix :remote-method="remoteMethod"
                    :placeholder="placeholder" @change="aa(geneForm.name, geneFormRef)">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="Pvalue range" required>
                  <el-col :span="5" style="padding: 0px">
                    <el-form-item prop="numstart">
                      <el-input-number v-model="geneForm.numstart" controls-position="right" :step="0.01" :max="1"
                        :min="0" style="width: 100%" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="1" style="padding-top: -10px">
                    <span>-</span>
                  </el-col>
                  <el-col :span="5" style="padding: 0px">
                    <el-form-item prop="numend">
                      <el-input-number v-model="geneForm.numend" controls-position="right" :step="0.01" :max="1" :min="0"
                        style="width: 100%" />
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="|Fold Change|" required>
                  <el-form-item prop="fcstart" style="width: 21%">
                    <el-input-number v-model="geneForm.fcstart" controls-position="right" :step="0.1" :min="0" />
                  </el-form-item>
                </el-form-item>
                <el-form-item style="margin-top: 25px">
                  <el-button type="primary" @click="onSubmit(geneFormRef)">Search</el-button>
                  <el-button type="primary" @click="generesetForm(geneFormRef)">Reset</el-button>
                  <el-button type="primary" @click="onexample()">Example</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <!-- 右侧Tips -->
          <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
            <div class="right">
              <div class="titletip"><span>Search Tips:</span></div>
              <div class="titletip">
                <span>Input a gene symbol or list to query its related DEGs information across tissue and virus types in
                  single-cell and bulk data according to your threshold value.
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 查询内容 -->
        <div class="content" v-if="tableload" style="margin-top: 100px">
          <el-tabs type="border-card" v-model="tabPosition" @tab-click="pan">
            <el-tab-pane label="Single-cell | Celltype" name="celltype" v-if="isTypeSelected('Single-cell')">
              <pagetable v-if="tabselect === 'celltype'" :DataList="tradata" />
            </el-tab-pane>
            <el-tab-pane label="Single-cell | Subtype" name="subtype" v-if="isTypeSelected('Single-cell')">
              <pagetable v-if="tabselect === 'subtype'" :DataList="tradata" />
            </el-tab-pane>
            <el-tab-pane label="Bulk | COVID-19" name="bulk" v-if="isTypeSelected('Bulk')">
              <pagetable v-if="tabselect === 'bulk'" :DataList="tradata" />
            </el-tab-pane>
            <el-tab-pane label="Bulk | Other coronaviruses" name="vir" v-if="isTypeSelected('Other coronaviruses')">
              <pagetable v-if="tabselect === 'vir'" :DataList="tradata" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>
    </el-card>
    <!-- <el-card shadow="never" class="min-h-[310px]">
      <template #header>
        <span class="cardheardtitle">Search DEGs in specific conditions</span>
      </template>
      <template #default>
        <el-row :gutter="20" class="mb-[18px]" style="transform: translateY(15%)">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="14">
            <div class="demo-input-suffix">
              <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                size="default" status-icon>
                <el-form-item label="Type" prop="type">
                  <el-select-v2 v-model="ruleForm.type" placeholder="Select type" :options="optionstype"
                    @change="changetype" />
                </el-form-item>
                <el-form-item label="Tissues" prop="tissue">
                  <el-select-v2 v-model="ruleForm.tissue" placeholder="Select tissue" :options="optionstissue"
                    @change="changetissue" @click="clicktissue(ruleFormRef)" />
                </el-form-item>
                <el-form-item label="Datasets" prop="dataset">
                  <el-select-v2 v-model="ruleForm.dataset" placeholder="Select tissue" :options="optionsdataset"
                    @change="changedataset" @click="clickdataset(ruleFormRef)" />
                </el-form-item>
                <el-form-item style="margin-top: 25px">
                  <el-button type="primary" @click="submitForm(ruleFormRef)">Search</el-button>
                  <el-button type="primary" @click="resetForm(ruleFormRef)">Reset</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
            <div class="right">
              <div class="titletip"><span>Search Tips:</span></div>
              <div class="titletip">
                <span>Input a gene symbol or list to query its detailed DEGs information in specific tissue, data, and
                  virus types (up/down-regulated genes with top 5% |Log2FC| and P value &lt; 0.05 in single-cell RNA-seq;
                  |Log2FC| &gt; 2 and P value &lt; 0.05 in bulk RNA-seq). </span>
              </div>
            </div>
          </el-col>
        </el-row>
        <div style="margin-top: 50px">
          <volcano v-if="submitload == 'singlecell' ? true : false" :DataSet="submitdataset" />
          <volcanobulk v-if="submitload == 'bulk' ? true : false" :DataSet="submitdataset" />
          <volcanoother v-if="submitload == 'coronavirus' ? true : false" :DataSet="submitdataset" />
          <div v-if="submitload == '' ? true : false" />
        </div>
      </template>
    </el-card> -->
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-card__header) {
  height: 43px;
  line-height: 32px;
  padding: 5px 10px !important;
  background-color: #e0e0e0;
}

:deep(.el-card__body) {
  min-height: 450px;
}

:deep(.el-tabs__body) {
  min-height: 300px;
}
.content{
  min-height: 300px;
}
:deep(.vxe-table){
  min-height: 300px;
}
:deep(.el-form-item) {
  margin-bottom: 15px;

  // :deep(.el-form-item__content) {
  //   min-height: 32px;
  // }
}

:deep(.el-select-v2) {
  width: 50%;
}

:deep(.el-select) {
  width: 50%;
}

:deep(.el-select__tags) {
  max-height: 80px;
  overflow-y: auto;
  max-width: 400px;
  // right: 0.3%;
}

.selectinput {
  :deep(.el-input__wrapper) {
    // padding-right:5px ;
    width: 60% !important;
    margin: 2% 5% 1% 5%;
  }
}

.demo-input-suffix {
  margin-left: 60px;
}

.right {
  margin-right: 20px;
}

// :deep(.select-trigger) {
//   width: 300px;
// }
// :deep(.el-button) {
//   width: 90px;
// }

// :deep(.el-form-item__label) {
//   // width: 0px !important;
//   justify-content: left;
//   margin-left: 20px;
// }
// :deep(.el-form-item__error) {
//   margin-left: 13px;
// }
// .main-content {
//   margin: 15px;
// }
// .cardheardtitle {
//   font-size: 16px;
//   font-weight: 700;
// }
// .demo-input-suffix {
//   position: relative;
//   top: 50%;
//   transform: translateY(-50%);
// }
.mySearch {
  // min-height:70%;
  min-height: 73.5vh;
  margin-top: 50px !important;
}

.inputgenecalss {
  :deep(.el-form-item__label) {
    font-weight: 2px;
  }

  margin-bottom: 24px;
}

:deep(.el-input__inner) {
  font-family: "Times New Roman", Times, serif !important;
}

:deep(.el-form-item__label) {
  font-family: "Times New Roman", Times, serif !important;
  font-weight: 100;
}

.titletip {
  text-align: justify
}
</style>
