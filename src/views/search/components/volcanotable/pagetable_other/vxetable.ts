import { reactive, ref } from 'vue'
import { VXETable, VxeGridProps, VxeGridInstance, VxeTablePropTypes } from 'vxe-table'
import { useboxechart } from "./boxechart1.js";
import { emitter } from "@/utils/mitt";
import {
  getbrowsetablebox,
  getbrowsevolcanotableall,
  getbrowsevolcanotablesearch
} from "@/api/browse";
const {
  echart
} = useboxechart();

export function useColumns() {
  const xGrid = ref<VxeGridInstance>();

  const params: object = {
    dataset: '',
    type: "bulk",
    celltype: "bulk",
    pageSize: 10,
    currentPage: 1,
    searchname: "",
    sortvalue: "gene",
    sortorder: "asc"
  };

  const addressClickEvent = (row: any) => {
    VXETable.modal.alert(`address点击事件：${row.address}`)
  }

  const searchEvent = () => {
    const $grid = xGrid.value
    params['searchname'] = formData.searchname;
    $grid.commitProxy('query')
  }

  const resetEvent = () => {
    const $grid = xGrid.value
    formData.searchname = ''
    params['searchname'] = ''
    params['sortvalue'] = 'gene'
    params['sortorder'] = 'asc'
    $grid.commitProxy('query')
  }

  emitter.on("volcanotable", ({ dataset, type, celltype }) => {
    params["dataset"] = dataset;
    params["type"] = type;
    params["celltype"] = celltype;
    setTimeout(() => {
      const $grid = xGrid.value
      $grid.commitProxy('query')
      gridOptions.loading = false;
    }, 50);
  });

  const formData = reactive({
    searchname: ''
  })

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
    toolbarConfig: {
      export: true,
      //custom: true,
      slots: {
        buttons: 'toolbar_buttons'
      }
    },
    proxyConfig: {
      props: {
        result: 'result',
        total: 'page.total'
      },
      // form: true,
      sort: true,
      ajax: {
        query: ({ page, sorts }) => {
          return new Promise(resolve => {
            if (params['dataset'] != '') {
              const firstSort = sorts[0]
              if (firstSort) {
                params['sortvalue'] = firstSort.field
                params['sortorder'] = firstSort.order
              }
              getbrowsevolcanotablesearch(params)
                .then(res => {
                  resolve({
                    page: {
                      total: res.resultSet.dataList.length
                    },
                    result: res.resultSet.dataList.slice((page.currentPage - 1) * page.pageSize, page.currentPage * page.pageSize),
                  })
                })
            } else {
              resolve({
                page: {
                  total: 0
                },
                result: [],
              })
            }
          })
        },
        queryAll: () => getbrowsevolcanotableall(params).then(res => res.resultSet.dataList)
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
    columns: [
      {
        field: 'gene', title: 'Gene Symbol', sortable: true, type: 'html',
        formatter({ cellValue }) {
          return '<a style=\"color: #45a5f9\" target=\"_blank\" href=\"https://www.ncbi.nlm.nih.gov/gene/?term=' + cellValue + '\">' + cellValue + '</a>'
        }
      },
      { field: 'degid', title: 'Ensembl ID', sortable: true },
      { field: 'pvalue', title: 'Pvalue', sortable: true },
      { field: 'logfc', title: 'LogFC', showOverflow: true, sortable: true },
      { field: 'datasetname', title: 'Dataset' },
      { field: 'accession', title: 'Accession' },
      // { field: 'tissue', title: 'Tissue' },
      {
        type: "expand",
        width: "140px",
        title: "View",
        slots: { content: "content" },
        titlePrefix: { message: 'Click ">" button to view details.' }
      },
    ]
  })

  function tableExpandchange({ row }) {
    // console.log(row );
  }

  const tableExpand = ref({
    toggleMethod({ expanded, row }) {
      if (expanded) {
        row.childDataleftloading = true
        row.childDatarightloading = true
        setTimeout(async () => {
          const params: object = {
            dataset: row.dataset,
            gene: row.gene,
            type: 'othervirus'
          };
          const { resultSet } = await getbrowsetablebox(params)
          row.childDataleft = resultSet
          row.childDataleftloading = false
          echart('volcanoref' + row.id, row.childDataleft, row.gene + '-box')
        }, 500)
      }
      return true
    },
  } as VxeTablePropTypes.ExpandConfig)

  const umapbase64 = ref();

  return {
    gridOptions,
    umapbase64,
    xGrid,
    params,
    searchEvent,
    formData,
    resetEvent,
    tableExpandchange,
    tableExpand
  }
}