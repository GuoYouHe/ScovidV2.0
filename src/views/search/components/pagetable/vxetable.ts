import { reactive, ref, defineComponent, nextTick, onMounted } from 'vue'
import { VXETable, VxeGridProps, VxeGridInstance, VxeGridPropTypes } from 'vxe-table'
import { useboxechart } from "./boxechart";
import { emitter } from "@/utils/mitt";

import axios from "axios";
import {
  getsearchvolcanotablesearch
} from "@/api/search";
import XEUtils from 'xe-utils'
import { log } from 'console';
const {
  // boxechartref
  echart
} = useboxechart();



export function useColumns() {
  const xGrid = ref<VxeGridInstance>()
  const params: object = {
    genelist: [],
    type: "",
    sortvalue: "dataset",
    sortorder: "asc",
    pvaluestart: "",
    pvalueend: "",
    fcstart: "",
    fcend: ""
  };

  const addressClickEvent = (row: any) => {
    VXETable.modal.alert(`address点击事件：${row.address}`)
  }
  const placeholdername = ref('')
  onMounted(() => {
    gridOptions.columns = celltypecolumn as VxeGridPropTypes.Columns;

  });



  const formData = reactive({
    searchname: ''
  })
  const tissueList = ref([]);



  const vir_list = ['All', 'HCoV-229E', 'MERS-Cov', 'HCoV-OC43']
  const tis_list = ['All', 'Airway', 'Blood', 'Brain', 'Eye', 'Heart', 'Intestine', 'Liver', 'Lung', 'Nose', 'Pancreas', 'Placenta', 'Stomach']
  const tis2_list = ['All', 'Adipose', 'Airway', 'Blood', 'Brain', 'Heart', 'Intestine', 'Kidney', 'Liver', 'Lung', 'Lymph node', 'Nose', 'Pancreas', 'Placenta', 'Spleen', 'Urine']



  const tabledataresult = ref<any>([]);

  const gridOptions = reactive<VxeGridProps>({
    border: true,
    showOverflow: true,
    // height: 400,
    loading: true,
    rowConfig: { height: 50 },
    columnConfig: {
      resizable: true
    },
    sortConfig: {
      trigger: 'cell',
      remote: true,
    },
    pagerConfig: {
      pageSize: 10,
      pageSizes: [5, 10, 15, 20, 50]
    },
    formConfig: {
      items: [
        { field: 'tissue', title: '', itemRender: {}, slots: { default: 'toolbar_tools' } }
      ]
    },
    toolbarConfig: {
      export: true,
      //custom: true,
      // slots: {
      //   buttons: 'toolbar_buttons'
      // }
    },
    proxyConfig: {
      props: {
        result: 'result',
        total: 'page.total'
      },
      form: true,
      sort: true,
      ajax: {
        query: async ({ page, sorts, form }) => {
          const firstSort = 'desc';
          const firstFilter = form['tissue'];
          const hasDataList = form['tissue'] !== null;
          if (hasDataList && firstFilter != 'All') {
            let filteredList = tabledataresult.value.filter(v => { return v.tissue === firstFilter });

            const startIndex = (page.currentPage - 1) * page.pageSize;
            const endIndex = page.currentPage * page.pageSize;

            return {
              page: {
                total: filteredList.length
              },
              result: filteredList.slice(startIndex, endIndex)
            };
          } else {
            if (params['genelist'].length !== 0) {
              const firstSort = sorts[0];
              if (firstSort) {
                params['sortvalue'] = firstSort.field;
                params['sortorder'] = firstSort.order;
              }

              const res = await getsearchvolcanotablesearch(params);
              let tableData = [];
              switch (params['type']) {
                case 'celltype':
                  tableData = res.resultSet.detailresultbygenecelltype || [];
                  tissueList.value = Array.from(tis2_list).map((v, idx) => ({
                    value: `${v}`,
                    label: `${v}`,
                  }))
                  break;
                case 'subtype':
                  tableData = res.resultSet.detailresultbygenesubtype || [];
                  tissueList.value = Array.from(tis2_list).map((v, idx) => ({
                    value: `${v}`,
                    label: `${v}`,
                  }))
                  break;
                case 'bulk':
                  tableData = res.resultSet.detailresultbygenebulk || [];
                  tissueList.value = Array.from(tis_list).map((v, idx) => ({
                    value: `${v}`,
                    label: `${v}`,
                  }))
                  break;
                case 'vir':
                  tableData = res.resultSet.detailresultbygenevir || [];
                  tissueList.value = Array.from(vir_list).map((v, idx) => ({
                    value: `${v}`,
                    label: `${v}`,
                  }))
                  break;
                default:
                  break;
              }

              tabledataresult.value = tableData;
              const startIndex = (page.currentPage - 1) * page.pageSize;
              const endIndex = page.currentPage * page.pageSize;

              return {
                page: {
                  total: tableData.length
                },
                result: tableData.slice(startIndex, endIndex),
              };
            } else {
              return {
                page: {
                  total: 0
                },
                result: [],
              };
            }
          }
        },
        queryAll: () => getsearchvolcanotablesearch(params).then(res => {
          const tabledataresult = ref<any>([]);
          switch (params['type']) {
            case 'celltype':
              tabledataresult.value = res.resultSet.detailresultbygenecelltype
              break;
            case 'subtype':
              tabledataresult.value = res.resultSet.detailresultbygenesubtype
              break;
            case 'bulk':
              tabledataresult.value = res.resultSet.detailresultbygenebulk
              break;
            default:
              break;
          }
          return tabledataresult.value
        })
      }
    },
    exportConfig: {
      // 默认选中类型
      type: 'csv',
      // 局部自定义类型
      types: ['csv', 'xml', 'txt'],
      // 自定义数据量列表
      modes: ['current', 'all']
    },

    columns: []
  })

  const celltypecolumn = [
    {
      field: 'gene', title: 'Gene Symbol', sortable: true, type: 'html',
      formatter({ cellValue }) {
        return '<a style=\"color: #45a5f9\" target=\"_blank\" href=\"https://www.ncbi.nlm.nih.gov/gene/?term=' + cellValue + '\">' + cellValue + '</a>'
      }
    },
    { field: 'pvalue', title: 'Pvalue', sortable: true },
    { field: 'logfc', title: 'LogFC', showOverflow: true, sortable: true },
    { field: 'celltype', title: 'Celltype', sortable: true },
    // { field: 'status', title: 'Status' },
    { field: 'tissue', title: 'Tissue' },
    {
      field: 'dataset', title: 'Accession', type: 'html',
      formatter({ cellValue }) {
        return '<a style=\"color: #45a5f9\" target=\"_blank\" href=\"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=' + cellValue + '\">' + cellValue + '</a>'
      }
    },
    { field: 'datasetname', title: 'Dataset' },
    // {
    //   type: "expand",
    //   width: "140px",
    //   title: "View",
    //   slots: {content: "content" },
    //   titlePrefix: { message: 'Click ">" button to view details.' }
    // },
  ]

  const subtypecolumn = [
    {
      field: 'gene', title: 'Gene Symbol', sortable: true, type: 'html',
      formatter({ cellValue }) {
        return '<a style=\"color: #45a5f9\" target=\"_blank\" href=\"https://www.ncbi.nlm.nih.gov/gene/?term=' + cellValue + '\">' + cellValue + '</a>'
      }
    },
    { field: 'pvalue', title: 'Pvalue', sortable: true },
    { field: 'logfc', title: 'LogFC', showOverflow: true, sortable: true },
    { field: 'celltype', title: 'Subtype', sortable: true },
    // { field: 'status', title: 'Status' },
    { field: 'tissue', title: 'Tissue' },
    {
      field: 'dataset', title: 'Accession', type: 'html',
      formatter({ cellValue }) {
        return '<a style=\"color: #45a5f9\" target=\"_blank\" href=\"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=' + cellValue + '\">' + cellValue + '</a>'
      }
    },
    { field: 'datasetname', title: 'Dataset' },
  ]

  const bulkcolumn = [
    {
      field: 'gene', title: 'Gene Symbol', sortable: true, type: 'html',
      formatter({ cellValue }) {
        return '<a style=\"color: #45a5f9\" target=\"_blank\" href=\"https://www.ncbi.nlm.nih.gov/gene/?term=' + cellValue + '\">' + cellValue + '</a>'
      }
    },
    { field: 'pvalue', title: 'Pvalue', sortable: true },
    { field: 'logfc', title: 'LogFC', showOverflow: true, sortable: true },
    // { field: 'status', title: 'Status' },
    { field: 'tissue', title: 'Virus' },
    {
      field: 'dataset', title: 'Accession', type: 'html',
      formatter({ cellValue }) {
        return '<a style=\"color: #45a5f9\" target=\"_blank\" href=\"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=' + cellValue + '\">' + cellValue + '</a>'
      }
    },
    { field: 'datasetname', title: 'Dataset' },
  ]

  function tableExpandchange({ row }) {
    // console.log(row );
  }


  const umapbase64 = ref();



  async function selectchange(val) {
    const $grid = xGrid.value;
    $grid.commitProxy("query");
    gridOptions.loading = false;
  }

  return {
    xGrid,
    gridOptions,
    umapbase64,
    params,
    formData,
    tableExpandchange,
    onMounted,
    celltypecolumn,
    subtypecolumn,
    bulkcolumn,
    tissueList,
    selectchange,
    placeholdername
  }
}