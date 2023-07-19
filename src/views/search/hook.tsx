import type { FormInstance, FormRules } from "element-plus";
import { reactive, ref, onMounted} from "vue";
import { emitter } from "@/utils/mitt";
import {
  getsearchlike,
  getsearchtree,
  getsearchlikenumb
} from "@/api/search";

export function useSearch() {
  const form = reactive({
    username: "",
    mobile: "",
    status: ""
  });
  interface ListItem {
    value: string
    label: string
  }

  interface Tradata {
    gene: any;
    type: string;
    start: number;
    end: number;
    fcstart: number;
    fcend: number;
  }

  const list = ref<ListItem[]>([])
  const options = ref<ListItem[]>([])
  const placeholder = ref('ACTG1');
  const tradata = ref<Tradata[]>([])
  
  const tabPosition = ref("celltype");
  const loading = ref<boolean>(true);
  const tableload = ref(false);
  const tabselect = ref('celltype');
  const geneFormRef = ref<FormInstance>();
  const geneForm = reactive({
    name: [],
    numstart: null,
    numend: null,
    fcstart: null,
    fcend: null,
    type: ['Single-cell','Bulk','Other coronaviruses'],
  });

  const rangevar = reactive({
    min: null,
    max: null,
    fcmin: null,
    fcmax: null,
    trtype:[]
  });

  const geneValidator = (name, value, callback) => {
    if (value.length != 0) {
      if (value[value.length - 1].length > 50) {
        callback(new Error("input str length should be 1 to 50"));
      } else {
        callback();
      }
    } else {
      callback(new Error("please input gene"));
    }
  };

  const rangeValidator = (name, value, callback) => {
    rangevar.min = null;
    rangevar.min = value;
    rangevar.max = 1
    if (value == null) {
      callback(new Error("please input minPvalue"));
    } else if (value > rangevar.max) {
      // console.log('min:',value,'max:',rangevar.max);
      callback(new Error("min cannot be greater than max"));
    } else {
      callback();
    }
  };

  const rangeValidator1 = (name, value, callback) => {
    rangevar.max = 1;
    rangevar.max = value;
    if (value == null) {
      callback(new Error("please input maxPvalue"));
    } else if (value < rangevar.min) {
      // console.log('min:',rangevar.min,'max:',value);
      callback(new Error("max cannot be less than min"));
    } else {
      callback();
    }
  };

  const rangeValidator2 = (name, value, callback) => {
    // rangevar.fcmin = null;
    // rangevar.fcmin = value;
    // rangevar.fcmax = 1
    if (value == null) {
      callback(new Error("please input Fc"));
    }
    // else if (value > rangevar.fcmax) {
    //   // console.log('min:',value,'max:',rangevar.fcmax);
    //   callback(new Error("min cannot be greater than max"));
    // } 
    else {
      callback();
    }
  };

  const rangeValidator3 = (name, value, callback) => {
    
    rangevar.fcmax = 1;
    rangevar.fcmax = value;
    if (value == null) {
      callback(new Error("please input maxFc"));
    } else if (value < rangevar.fcmin) {
      // console.log('min:',rangevar.min,'max:',value);
      callback(new Error("max cannot be less than min"));
    } else {
      callback();
    }
  };

  let generules = reactive<FormRules>({
    name: [
      {
        validator: geneValidator,
        trigger: "blur",
        required: true
      }
    ],
    numstart: [
      {
        required: true,
        validator: rangeValidator,
        trigger: "change"
      }
    ],
    numend: [
      {
        required: true,
        validator: rangeValidator1,
        trigger: "change"
      }
    ],
    fcstart: [
      {
        required: true,
        validator: rangeValidator2,
        trigger: "change"
      }
    ],
    fcend: [
      {
        required: true,
        validator: rangeValidator3,
        trigger: "change"
      }
    ],
    type: [
      {
        type: 'array',
        required: true,
        message: 'Please select at least one type',
        trigger: 'change',
      },
    ],
  });

  const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        tableload.value = false;
        loading.value = false;
        rangevar.trtype = geneForm.type
        const gene = [];
        const type = "celltype";
        const start = geneForm.numstart;
        const end = geneForm.numend;
        const fcstart = geneForm.fcstart;
        const fcend = geneForm.fcend;
        Object.keys(geneForm.name).filter(item => {
          gene.push(geneForm.name[item]);
        });
        const params: object = {
          genelist: [],
          pvaluestart:start,
          pvalueend: end,
          fcstart:fcstart,
          fcend: fcend,
        };
        params['genelist'] = gene
        if (isTypeSelected('Single-cell')) {
          tabPosition.value = "celltype";
        } else if (isTypeSelected('Bulk')) {
          tabPosition.value = "bulk";
        } else {
          tabPosition.value = "vir";
        }
        tabselect.value = tabPosition.value
        setTimeout(() => {
          tableload.value = true;
          tradata.value = [{ 'gene': gene, 'type': tabPosition.value, 'start': start, 'end': end, 'fcstart': fcstart, fcend: fcend }]
        },50)
        loading.value = false;
        //判断返回的结果不为空
        // getsearchlikenumb(params).then(res => {
        //   var a = res.resultSet
        //   if (a[0] != 0) {
        //     tabPosition.value = "celltype";
        //   } else if (a[1] != 0 ) {
        //     tabPosition.value = "subtype";
        //   }else if (a[2] != 0 ){
        //     tabPosition.value = "bulk";
        //   } else {
        //     tabPosition.value = "vir";
        //   }
        //   tableload.value = true;
        //   tabselect.value = tabPosition.value
        //   tradata.value = [{ 'gene': gene, 'type': tabPosition.value, 'start': start, 'end':end , 'fcstart':fcstart ,fcend: fcend}]
        //   loading.value = false;
        // })
      } else {
        console.log("error submit!", fields);
      }
    });
  };

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
  };

  onMounted(() => {});

  const generesetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
    tableload.value = false;
  };

  //分开tag
  async function aa(val, formEl: FormInstance) {
    // console.log(val);
    // AN , SSE,,
    //对输入字符进行标准化去除非逗号以及逗号前后为空的数值
    if (val.length != 0) {
      if (val[val.length - 1].length < 50) {
        if (val[val.length - 1].indexOf(",") != -1) {
          let inputgenelist = val[val.length - 1].split(",");
          let genelist = [];
          if (inputgenelist.length > 1) {
            for (var j = 0; j < val.length - 1; j++) {
              genelist.push(val[j].replace(" ",""));
            }
            for (var i = 0; i < inputgenelist.length; i++) {
              if (inputgenelist[i] != "" && inputgenelist[i].indexOf(" ") != -1 ) {
                genelist.push(inputgenelist[i].replace(" ",""));
              } else {
                genelist.push(inputgenelist[i]);
              }
            }
          }
          const resultlist = Array.from(new Set(genelist))
          // console.log(resultlist);
          geneForm.name = resultlist;
        } else {
          geneForm.name = val;
        }
      }
      // else {
      //   await formEl.validateField("name", valid => {
      //     console.log("submit!", valid);
      //   });
      // }
    }
  }

  // async function searchExample() {
  //   tableload.value = true;
  //   loading.value = false;
  //   const gene = ['ADAM28', 'AKAP13', 'ENSG00000185885'];
  //   inputgene.value = gene
  //   const type = 'celltype';
  //   setTimeout(() => {
  //     // emitter.emit("searchgenetable", {gene,type});
  //     loading.value = false;
  //   }, 50);
  // }

  async function pan(targetName) {
    tableload.value = false;
    tableload.value = true;
    loading.value = true;
    let gene = [];
    Object.keys(geneForm.name).filter((item) => {
      gene.push(geneForm.name[item])
    })
    const start = geneForm.numstart;
    const end = geneForm.numend;
    const fcstart = geneForm.fcstart;
    const fcend = geneForm.fcend;
    let type = '';
    switch (targetName.props.name) {
      case "celltype":
        tabselect.value = "celltype";
        type = 'celltype';
        tradata.value = [{ 'gene': gene, 'type': tabselect.value, 'start': start, 'end':end , 'fcstart':fcstart ,fcend: fcend}]
        break;
      case "subtype":
        tabselect.value = "subtype";
        type = 'subtype';
        tradata.value = [{ 'gene': gene, 'type': tabselect.value, 'start': start, 'end':end , 'fcstart':fcstart ,fcend: fcend}]
        break;
      case "bulk":
        tabselect.value = "bulk";
        type = 'bulk';
        tradata.value = [{ 'gene': gene, 'type': tabselect.value, 'start': start, 'end':end , 'fcstart':fcstart ,fcend: fcend}]
        break;
      case "vir":
        tabselect.value = "vir";
        type = 'vir';
        tradata.value = [{ 'gene': gene, 'type': tabselect.value, 'start': start, 'end':end , 'fcstart':fcstart ,fcend: fcend}]
        break;
      default:
        break;
    }
    loading.value = false;
  }

  function isTypeSelected(type) {
    return rangevar.trtype.includes(type);
  }
  
  const remoteMethod = (query: string) => {
    if (query) {
      let inputgenelist = query.split(',')
      let genelist = []
      if (inputgenelist.length > 1) {
        for (var i = 0; i < inputgenelist.length; i++){
          if (inputgenelist[i] != '') {
            genelist.push(inputgenelist[i])
          }
        }
      }

      const optioninput = Array.from(genelist).map((_, idx) => ({
        value: `${_.toLowerCase()}`,
        label: `${_}`,
      }))

      loading.value = true
      const params: object = {
        gene: query,
      };
      getsearchlike(params).then((res) => {
        list.value = res.resultSet.map((item) => {
          return { value: `${item}`, label: `${item}` }
        })
        options.value = list.value
        loading.value = false
      })
    } else {
      options.value = []
    }
  }

  return {
    tradata,
    tabselect,
    options,
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
    // searchExample,
    remoteMethod,
    pan,
    isTypeSelected
  };
}

export function useSearchByCelltype() {
  interface tissueItem {
    value: string
    label: string
    children: any;
  }
  interface Item {
    value: string
    label: string
  }
  const submitdataset = ref('')
  const optionsdata = ref([])
  const optionstissue = ref<tissueItem[]>([])
  const optionsdataset = ref<Item[]>([])
  const submitload = ref('')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    type: '',
    tissue: '',
    dataset: ''
  })
  const rules = reactive<FormRules>({
    type: [
      {
        required: true,
        message: 'Please select Type',
        trigger: 'change',
      },
    ],
    tissue: [
      {
        required: true,
        message: 'Please select Tissue',
        trigger: 'change',
      },
    ],
    dataset: [
      {
        required: true,
        message: 'Please select Dataset',
        trigger: 'change',
      },
    ]
  })

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
        submitdataset.value = ruleForm.dataset
        submitload.value = ruleForm.type
      } else {
        console.log('error submit!', fields)
      }
    })
    // console.log(formEl);
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()  
    submitload.value = ''
  }

  const changetype = async (formEl: FormInstance | undefined) => {
    // console.log("changetype");
    let paramdata = ''
    paramdata = String(formEl)
    if (paramdata == 'coronavirus') {
      paramdata = 'othervirus'
    }
    const params: any = {
      datasettype: paramdata
    }
    const { resultSet } = await getsearchtree(params)

    const tissueanddataset = resultSet.filter((item) => {
      return item.name.includes(paramdata)
    });

    optionsdata.value = tissueanddataset
   
    const tissue = Object.keys(tissueanddataset[0]['children']).map(v => {
      return {
        value: `${tissueanddataset[0]['children'][v].name}`,
        label: `${tissueanddataset[0]['children'][v].name}`,
        children : tissueanddataset[0]['children'][v].children
      }
    }) as tissueItem[];

    optionstissue.value = tissue

    optionsdataset.value = Object.keys(tissue[0]['children']).map(v => {
      return {
        value: `${tissue[0]['children'][v].accession}`,
        label: `${tissue[0]['children'][v].name}`,
      }
    }) as tissueItem[];

    ruleForm.tissue = tissue[0].label
    ruleForm.dataset = tissue.filter((item) => {
      return item.label.includes(tissue[0].label)
    })[0].children[0].accession;
    optionstissue.value = tissue

  }

  const changetissue = async (formEl: FormInstance | undefined) => {
    // console.log("changetissue");
    const tissue = Object.keys(optionsdata.value[0]['children']).map(v => {
      return {
        value: `${optionsdata.value[0]['children'][v].name}`,
        label: `${optionsdata.value[0]['children'][v].name}`,
        children : optionsdata.value[0]['children'][v].children
      }
    }) as tissueItem[];

    let paramdata = ''
    paramdata = String(formEl)
    if (paramdata == 'coronavirus') {
      paramdata = 'othervirus'
    }

    optionstissue.value = tissue

    // console.log("optionstissue", optionstissue.value);
    
    ruleForm.tissue = paramdata

    Object.keys(tissue).filter((item) => {
      if (tissue[item].label.includes(ruleForm.tissue)){
        let cc = Object.keys(tissue[item].children).map(v => {
          return {
            value: `${tissue[item].children[v].accession}`,
            label: `${tissue[item].children[v].name}`,
          }
        }) as tissueItem[];
        optionsdataset.value = cc
        // console.log(cc);
      }
    });

    // console.log("optionsdataset",optionsdataset.value);
    
    ruleForm.dataset = optionsdataset.value[0].value;

  }

  const changedataset = async (formEl: FormInstance | undefined) => {
    // console.log(formEl);
  }

  const clicktissue = async (formEl: FormInstance | undefined) => {
    if (!ruleForm.type) {
      console.log("clicktissue");
      optionstissue.value = []
      optionsdataset.value = []
      ruleForm.tissue = ''
      ruleForm.dataset = ''
    }
    console.log(formEl);
    
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const clickdataset = async (formEl: FormInstance | undefined) => {
    if (!ruleForm.type || !ruleForm.tissue) {
      console.log("clickdataset");
      optionstissue.value = []
      optionsdataset.value = []
      ruleForm.tissue = ''
      ruleForm.dataset = ''
    }
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const optionstype = Array.from(['Singlecell','Bulk','Coronavirus']).map((_, idx) => ({
    value: `${_.toLowerCase()}`,
    label: `${_}`,
  }))

  return {
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
  };
}

export function useForm() {
  interface ListItem {
    value: string
    label: string
  }
  const list = ref<ListItem[]>([])
  const options = ref<ListItem[]>([])
  const loading = ref<boolean>(true);
  const plotload = ref(false);
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    name: '',
    region: '',
    resource: '',
  })
  // A1CF

  const rules = reactive<FormRules>({
    name: [
      { required: true, message: 'Please input Activity gene', trigger: 'blur' },
      { min: 1, max: 45, message: 'Length should be 1 to 45', trigger: 'blur' },
    ],
    region: [
      {
        required: true,
        message: 'Please select Activity type',
        trigger: 'change',
      },
    ],
    resource: [
      {
        required: true,
        message: 'Please select activity species',
        trigger: 'change',
      },
    ],
  })

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    plotload.value=false
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
        plotload.value=true
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    plotload.value = false
    if (!formEl) return
    formEl.resetFields()
  }

  const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true
    const params: object = {
      gene: query,
      type: ruleForm.region, 
      species:ruleForm.resource,
    };
    getsearchlike(params).then((res) => {
      list.value = res.resultSet.map((item) => {
        return { value: `${item}`, label: `${item}` }
      })
      options.value = list.value
      loading.value = false
    })
    } else {
      options.value = []
    }
  }

async function geneMethod(formEl: FormInstance | undefined,speval,typeval) {
  if (speval == "" && typeval == "") {
      await formEl.validate((valid, fields) => {
      if (valid) {
        plotload.value=true
      } else {
        console.log('error submit!', fields)
      }
    })
  }
}

async function typechange(formEl: FormInstance | undefined,speval,typeval) {
  if (speval == "") {
      await formEl.validate((valid, fields) => {
      if (valid) {
        plotload.value=true
      } else {
        console.log('error submit!', fields)
      }
    })
    } else if (speval != null && typeval != null) {
      const params: object = {
        gene: "a",
        type: typeval,
        species: speval,
      };
      getsearchlike(params).then((res) => {
        list.value = res.resultSet.map((item) => {
          return { value: `${item}`, label: `${item}` }
        })
        options.value = list.value
      })
    }
}
  
async function selectinput(val) {
  if (ruleForm.region != "" && ruleForm.region != "") {
    const params: object = {
      gene: val,
      type: ruleForm.region,
      species: ruleForm.resource,
    };
    getsearchlike(params).then((res) => {
      list.value = res.resultSet.map((item) => {
        return { value: `${item}`, label: `${item}` }
      })
      options.value = list.value
    })
  }
}

  return {
    formSize,
    ruleFormRef,
    ruleForm,
    rules,
    submitForm,
    resetForm,
    plotload,
    loading,
    options,
    remoteMethod,
    typechange,
    geneMethod,
    selectinput
  }
}

