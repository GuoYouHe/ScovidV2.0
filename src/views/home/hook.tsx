import { reactive, ref, onMounted,h } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import {
  setsubmittable
} from "@/api/download";

export function useUser() {
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    GEOaccession: '',
    tissue: '',
    sample: '',
    referencePMID: '',
    email: '',
    desc: '',
  })

  const dialogVisible = ref(false)

  const rules = reactive<FormRules>({
    GEOaccession : [
      { required: true, message: 'Please input GEO accession ', trigger: 'blur' },
    ],
    tissue: [
      { required: true, message: 'Please input Tissue', trigger: 'blur' },
    ],
    sample: [
      { required: true, message: 'Please input Sample', trigger: 'blur' },
    ],
    referencePMID: [
      { required: true, message: 'Please input Reference PMID', trigger: 'blur' },
    ],
    email: [
      { required: true, message: 'Please input you Email', trigger: 'blur' },
      { type: 'email', message: 'Please input correct email address',trigger: 'blur'},
    ],
    desc: [
      { required: true, message: 'Details (limited to 500 words)', trigger: 'blur' },
      { min: 0, max: 500, message: 'Length should be 1 to 500', trigger: 'blur' },
    ],
  })

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      
      if (valid) {
        const param: object = {
          geoAccession: ruleForm.GEOaccession,
          tissue: ruleForm.tissue,
          sample: ruleForm.sample,
          refPMID: ruleForm.referencePMID,
          email: ruleForm.email,
          detail: ruleForm.desc
        }
        const result = await setsubmittable(param);
        if (result.extInfo == 'success') {
           ElMessage({
            message: h('p', null, [
              h('span', null, 'Submit '),
              h('i', { style: 'color: #f7931e' }, 'Success'),
            ]),
          })
        }
        // console.log(fields)
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }

  const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
  }));


  onMounted(() => {
    // onSearch();
  });

  return {
    ruleFormRef,
    ruleForm,
    rules,
    submitForm,
    resetForm,
    options,
    dialogVisible
  };
}