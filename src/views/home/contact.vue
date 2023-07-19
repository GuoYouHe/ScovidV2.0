<script setup lang="ts">
import { onMounted } from "vue";


import "./assets/css/templatemo-digimedia-v2.css";
defineOptions({
  name: "contact"
});

import { useUser } from "./hook";
const { ruleFormRef, ruleForm, rules, submitForm, resetForm, dialogVisible } = useUser();

onMounted(() => { });
</script>

<template>
  <div class="contentheight">
    <div id="contact" class="contact-us section">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 offset-lg-3">
            <div class="section-heading">
              <!-- <h6>Contact Us</h6> -->
              <h4>Submit New <em>Entries</em></h4>
              <div class="line-dec"></div>
            </div>
          </div>
          <div class="col-lg-12">
            <el-form id="contact" ref="ruleFormRef" :model="ruleForm" :rules="rules">
              <div class="row contact_form" style="position: relative">
                <div class="col-lg-12">
                  <div class="contact-dec"></div>
                </div>
                <div class="col-lg-12">
                  <div class="blog-post-text">
                    <h5>
                      Welcome to submit novel single-cell or bulk data about
                      COVID-19 (or other coronaviruses) in Humans across
                      tissues to the SCovid database.
                    </h5>
                    <h5>
                      For easy identification, please enter GEO accession from
                      the NCBI GEO database.
                    </h5>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="fill-form">
                    <div class="row" style="padding-top: 2%">
                      <div class="col-lg-6">
                        <el-form-item prop="GEOaccession">
                          <el-input v-model="ruleForm.GEOaccession" placeholder="GEO accession" />
                        </el-form-item>
                        <el-form-item prop="tissue">
                          <el-input v-model="ruleForm.tissue" placeholder="Tissue" />
                        </el-form-item>
                        <el-form-item prop="sample">
                          <el-input v-model="ruleForm.sample" placeholder="Sample" />
                        </el-form-item>
                        <el-form-item prop="referencePMID">
                          <el-input v-model="ruleForm.referencePMID" placeholder="Reference PMID" />
                        </el-form-item>
                      </div>
                      <div class="col-lg-6">
                        <el-form-item prop="desc">
                          <el-input v-model="ruleForm.desc" type="textarea"
                            placeholder="Details (limited to 500 words)" />
                        </el-form-item>
                      </div>
                      <div class="col-lg-6">
                        <el-form-item prop="email">
                          <el-input v-model="ruleForm.email" placeholder="Email" />
                        </el-form-item>
                      </div>
                      <div class="col-lg-3">
                        <el-button @click="submitForm(ruleFormRef)">Submit</el-button>
                      </div>
                      <div class="col-lg-3">
                        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped src="./assets/css/bootstrap.min.css"></style>

<style lang="scss" scoped>
.contentheight {
  min-height: 76vh !important;
  margin-top: 10px !important;
}

.blog-post-text {
  margin-top: 20px;

  h5 {
    line-height: 25px;
    font-size: 19px;
    text-align: justify;
    // text-justify: inter-ideograph;
  }
}

.contact_form {
  width: 95%;
  margin: auto;
}

form {
  z-index: 5;
}

:deep(.el-input__inner::placeholder) {
  font-family: "Times New Roman", Times, serif;
}

:deep(.el-textarea__inner::placeholder) {
  font-family: "Times New Roman", Times, serif;
}

:deep(.el-textarea__inner) {
  margin-top: 0px;
}

:deep(.el-input__wrapper) {
  padding: 0px 0px !important;
  box-shadow: 0 0 0 0 !important;
}

// :deep(.el-form-item) {
//   margin-bottom: 0px;
// }

:deep(.el-form-item__error) {
  z-index: 20;
}
</style>
