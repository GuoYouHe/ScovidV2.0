import { reactive, ref, defineComponent, nextTick, onMounted } from 'vue'
import { VXETable, VxeGridProps, VxeGridInstance, VxeTablePropTypes } from 'vxe-table'
import { useboxechart } from "./boxechart1.js";
import { emitter } from "@/utils/mitt";
import axios from "axios";
import {
  getbrowsefirsttable,
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
    type: "celltype",
    celltype: "",
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

  onMounted(() => {

  });


  emitter.on("volcanotablesc", ({ dataset, type, celltype }) => {
    const $grid = xGrid.value
    params["dataset"] = dataset;
    params["type"] = type;
    params["celltype"] = celltype;
    setTimeout(() => {
      $grid.commitProxy('reload')
      gridOptions.loading = false;
    }, 50)
  })



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
      { field: 'tissue', title: 'Tissue' },
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
  }

  const tableExpand = ref({
    // lazy: true,
    // loadMethod({ row }) {
    //   return new Promise(resolve => {
    //     getbrowsefirsttable({ dataset: row.dataset })
    //     .then(async res =>{
    //       row.childDataRight = await getTableImg(row.gene, res.resultSet.first['accession'])
    //       row.childDataleftloading = true
    //       resolve()
    //     })
    //   })
    // },
    toggleMethod({ expanded, row }) {
      if (expanded) {
        row.childDataleftloading = true
        row.childDatarightloading = true
        setTimeout(async () => {
          var params1 = new URLSearchParams();
          params1.append('project', row.accession)
          params1.append('taxonomy', params['type'])
          params1.append('cell_type', params['celltype'])
          params1.append('gene', row.gene)
          await axios
            .post("http://bio-annotation.cn/scovid_python/box_r_script", params1)
            .then((res) => {
              var datasource = res.data.resultset
              row.childDataleft = datasource
              row.childDataleftloading = false
              echart('volcanoref' + row.id, row.childDataleft, row.gene + '-box')
            })
          row.childDataRight = await getTableImg(row.gene, row.accession)
          row.childDatarightloading = false
          row.imgdataname = row.accession + '_' + row.gene + '.png'
        }, 500)
      }
      return true
    },
  } as VxeTablePropTypes.ExpandConfig)

  const umapbase64 = ref();

  async function getTableImg(gene: string, project: string) {
    var data = '';
    var params1 = new URLSearchParams();
    params1.append('project', project)
    params1.append('taxonomy', params['type'])
    params1.append('cell_type', params['celltype'])
    params1.append('gene', gene)

    await axios
      .post("http://bio-annotation.cn/scovid_python/umap_r_script", params1)
      .then((res) => {
        data = "data:image/png;base64," + res.data.img;
        umapbase64.value = "data:image/png;base64," + res.data.img;
      })
    return data
  }

  return {
    gridOptions,
    umapbase64,
    xGrid,
    params,
    searchEvent,
    formData,
    resetEvent,
    tableExpandchange,
    tableExpand,
    getTableImg
  }
}