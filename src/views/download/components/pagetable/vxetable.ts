import { reactive, ref, onMounted } from 'vue'
import { VXETable, VxeGridProps, VxeGridInstance } from 'vxe-table'
import {
  getDownloadtable
} from "@/api/download";

export function useColumns() {
  const xGrid = ref<VxeGridInstance>();
  // "type":"bulk","searchname":"","sortvalue":"datasetname","sortorder":"asc"
  const params: object = {
    type: "singlecell",
    searchname: "",
    sortvalue: "databaseid",
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
    params['sortvalue'] = 'databaseid'
    params['sortorder'] = 'desc'
    $grid.commitProxy('query')
  }



  onMounted(() => {
  })

  const datalist = ref([])

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
    filterConfig: {
      remote: true
    },
    pagerConfig: {
      pageSize: 5,
      pageSizes: [5, 10, 15, 20, 50]
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
      // form: true,
      sort: true,
      filter: true,
      ajax: {
        query: async ({ page, sorts, filters }) => {
          const firstSort = sorts[0];
          const firstFilter = filters[0];
          const hasDataList = datalist.value.length > 0 && filters.length > 0;
          if (hasDataList) {
            const filteredList = datalist.value.filter(v => {
              return v[firstFilter.field] === firstFilter.values[0] || v[firstFilter.field] === firstFilter.values[1];
            });

            if (firstSort) {
              filteredList.sort((a, b) => {
                const sortField = firstSort.field;
                const fieldValueA = a[sortField];
                const fieldValueB = b[sortField];
                return fieldValueA.localeCompare(fieldValueB);
              });
              if (firstSort.order == 'desc') {
                filteredList.reverse()
              }
            } else {
              filteredList.sort((a, b) => {
                const sortField = 'databaseid';
                const fieldValueA = a[sortField];
                const fieldValueB = b[sortField];
                return fieldValueA.localeCompare(fieldValueB);
              });
            }

            const startIndex = (page.currentPage - 1) * page.pageSize;
            const endIndex = page.currentPage * page.pageSize;

            return {
              page: {
                total: filteredList.length
              },
              result: filteredList.slice(startIndex, endIndex)
            };
          } else {
            if (firstSort) {
              params['sortvalue'] = firstSort.field;
              params['sortorder'] = firstSort.order;
            }
            const res = await getDownloadtable(params);
            datalist.value = res.resultSet;

            const startIndex = (page.currentPage - 1) * page.pageSize;
            const endIndex = page.currentPage * page.pageSize;

            return {
              page: {
                total: datalist.value.length
              },
              result: datalist.value.slice(startIndex, endIndex)
            };
          }
        },

        queryAll: () => getDownloadtable(params).then(res => res.resultSet)
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
      { field: 'databaseid', title: 'Database ID', sortable: true, width: '100px' },
      { field: 'datasetname', title: 'Dataset name', sortable: true, width: '160px' },
      { field: 'tissue', title: 'Tissue type', sortable: true, width: '100px' },
      {
        field: 'cellsnum', title: 'No.cells', showOverflow: true, sortable: true, width: '9%', type: 'html',
        formatter({ cellValue }) {
          let acc = cellValue
          const numb = cellValue.split('.0')[0]
          if (numb != undefined) {
            acc = acc.split('.0')[0]
          }
          return acc
        }
      },
      { field: 'groupdata', title: 'Group', width: '192px' },
      { field: 'sample', title: 'Sample', sortable: true, width: '100px' },
      {
        field: 'accession', title: 'Accession', sortable: true, width: '100px', type: 'html',
        formatter({ cellValue }) {
          let acc = cellValue
          const numb = cellValue.split('_')[1]
          if (numb != undefined) {
            acc = acc.split('_')[0]
          }
          return '<a style=\"color: #45a5f9\" target=\"_blank\" href=\"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=' + acc + '\">' + acc + '</a>'
        }
      },
      {
        title: 'Gene expression profile',
        width: '200px',
        slots: { default: "operate2", header: "header" },
      },
      {
        title: 'Difference of all genes',
        width: '200px',
        slots: { default: "operate", header: "header" },
      },
      {
        title: 'Markers',
        width: '200px',
        slots: { default: "operate", header: "header" },
      }
    ]
  })

  let singlecellcolumn = [
    { field: 'databaseid', title: 'Database ID', sortable: true, width: '120px' },
    { field: 'datasetname', title: 'Dataset name', sortable: true, width: '160px' },
    { field: 'tissue', title: 'Tissue type', sortable: true, width: '120px' },
    {
      field: 'cellsnum', title: 'No.cells', showOverflow: true, sortable: true, width: '120px', type: 'html',
      formatter({ cellValue }) {
        let acc = cellValue
        const numb = cellValue.split('.0')[0]
        if (numb != undefined) {
          acc = acc.split('.0')[0]
        }
        return acc
      }
    },
    { field: 'groupdata', title: 'Group', width: '192px' },
    { field: 'sample', title: 'Sample', sortable: true, width: '120px' },
    {
      field: 'accession', title: 'Accession', sortable: true, width: '10%', type: 'html',
      formatter({ cellValue }) {
        let acc = cellValue
        const numb = cellValue.split('_')[1]
        if (numb != undefined) {
          acc = acc.split('_')[0]
        }
        return '<a style=\"color: #45a5f9\" target=\"_blank\" href=\"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=' + acc + '\">' + acc + '</a>'
      }
    },
    {
      title: 'Gene expression profile',
      width: '200px',
      slots: { default: "operate2", header: "header" },
    },
    {
      title: 'Difference of all genes',
      width: '200px',
      slots: { default: "operate", header: "header" },
    },
    {
      title: 'Markers',
      width: '200px',
      slots: { default: "operate", header: "header" },
    }
  ]

  let subtypecolumn = [
    { field: 'databaseid', title: 'Database ID', sortable: true },
    { field: 'datasetname', title: 'Dataset name', sortable: true },
    { field: 'tissue', title: 'Tissue type', sortable: true },
    {
      field: 'cellsnum', title: 'No.cells', showOverflow: true, sortable: true, width: '9%', type: 'html',
      formatter({ cellValue }) {
        let acc = cellValue
        const numb = cellValue.split('.0')[0]
        if (numb != undefined) {
          acc = acc.split('.0')[0]
        }
        return acc
      }
    },
    { field: 'groupdata', title: 'Group' },
    { field: 'sample', title: 'Sample', sortable: true },
    {
      field: 'accession', title: 'Accession', sortable: true, type: 'html',
      formatter({ cellValue }) {
        let acc = cellValue
        const numb = cellValue.split('_')[1]
        if (numb != undefined) {
          acc = acc.split('_')[0]
        }
        return '<a style=\"color: #45a5f9\" target=\"_blank\" href=\"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=' + acc + '\">' + acc + '</a>'
      }
    },
    {
      title: 'Download',
      width: 130,
      fixed: "right",
      slots: { default: "operate" },
    }
  ]

  let bulkcolumn = [
    { field: 'databaseid', title: 'Database ID', sortable: true, width: '11%' },
    { field: 'datasetname', title: 'Dataset name', sortable: true, width: '12%' },
    { field: 'tissue', title: 'Tissue type', sortable: true, width: '10%' },
    { field: 'groupdata', title: 'Group', width: '192px' },
    { field: 'sample', title: 'Sample', width: '10%' },
    {
      field: 'accession', title: 'Accession', sortable: true, width: '10%', type: 'html',
      formatter({ cellValue }) {
        let acc = cellValue
        const numb = cellValue.split('_')[1]
        if (numb != undefined) {
          acc = acc.split('_')[0]
        }
        return '<a style=\"color: #45a5f9\" target=\"_blank\" href=\"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=' + acc + '\">' + acc + '</a>'
      }
    },
    { field: 'description', title: 'Source', sortable: true, slots: { default: "contentsourse" }, width: '15%', filters: [{ label: 'COVID-19', value: 'covid-19' }, { label: 'Others coronaviruses', value: 'coronavirus' }] },
    ,
    {
      title: 'Gene expression profile',
      width: '15%',
      slots: { default: "operatebulk", header: "header" },
    },
    {
      title: 'Difference of all genes',
      width: '15%',
      slots: { default: "operatebulk", header: "header" },
    },
    {
      title: 'Difference of DEGs',
      width: '12%',
      slots: { default: "operatebulk", header: "header" },
    }
  ]


  const umapbase64 = ref();

  return {
    gridOptions,
    umapbase64,
    xGrid,
    params,
    searchEvent,
    formData,
    resetEvent,
    onMounted,
    singlecellcolumn,
    subtypecolumn,
    bulkcolumn
  }
}