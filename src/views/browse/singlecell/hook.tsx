import dayjs from "dayjs";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, toRefs, ref, computed, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";


export function useUser() {
  const form = reactive({
    username: "",
    mobile: "",
    status: ""
  });
  const dataList = ref([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      type: "selection",
      width: 55,
      align: "left",
      hide: ({ checkList }) => !checkList.includes("勾选列")
    },
    {
      label: "序号",
      type: "index",
      width: 70,
      hide: ({ checkList }) => !checkList.includes("序号列")
    },
    {
      label: "用户编号",
      prop: "id",
      minWidth: 130
    },
    {
      label: "用户名称",
      prop: "username",
      minWidth: 130
    },
    {
      label: "用户昵称",
      prop: "nickname",
      minWidth: 130
    },
    {
      label: "性别",
      prop: "sex",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.sex === 1 ? "danger" : ""}
          effect="plain"
        >
          {row.sex === 1 ? "女" : "男"}
        </el-tag>
      )
    },
    {
      label: "部门",
      prop: "dept",
      minWidth: 90,
      formatter: ({ dept }) => dept.name
    },
    {
      label: "手机号码",
      prop: "mobile",
      minWidth: 90
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 90,
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.index]?.loading}
          v-model={scope.row.status}
          active-value={1}
          inactive-value={0}
          active-text="已开启"
          inactive-text="已关闭"
          inline-prompt
          onChange={() => onChange(scope as any)}
        />
      )
    },
    {
      label: "创建时间",
      minWidth: 90,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });

  function onChange({ row, index }) {
    ElMessageBox.confirm(
      `确认要<strong>${
        row.status === 0 ? "停用" : "启用"
      }</strong><strong style='color:var(--el-color-primary)'>${
        row.username
      }</strong>用户吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(() => {
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: true
          }
        );
        setTimeout(() => {
          switchLoadMap.value[index] = Object.assign(
            {},
            switchLoadMap.value[index],
            {
              loading: false
            }
          );
          message("已成功修改用户状态", {
            type: "success"
          });
        }, 300);
      })
      .catch(() => {
        row.status === 0 ? (row.status = 1) : (row.status = 0);
      });
  }

  function handleUpdate(row) {
    console.log(row);
  }

  function handleDelete(row) {
    console.log(row);
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    // const { data } = await getUserList();
    // dataList.value = data.list;
    // pagination.total = data.total;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  onMounted(() => {
    // onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    buttonClass,
    onSearch,
    resetForm,
    handleUpdate,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
export function homoTissue() {
  const router = useRouter();
  
    const data = reactive({
      species: "Homo sapiens",
      loading: true,
      tissueList: [
        {
          id: 1,
          title: "headneck",
          show: false,
          style: {
            top: 0,
            left: 62,
            top2: "top:-90px;",
            left2: "left:12%;",
            border: "borderLeft",
            border2: " arrowLeft clickTextRight",
          },
          src: "src/assets/img/index/icon/esophagus.png",
          tabletext: [
            {
              title: "head and neck squamous cell carcinoma",
              path: "",
              projectNum: 2,
            },
            {
              title: "esophageal basaloid squamous cell carcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "gastroesophageal reflux disease",
              path: "",
              projectNum: 1,
            },
            {
              title: "others",
              path: "",
              projectNum: 2,
            },
          ],
          alltabletext: [
            {
              title: "head and neck squamous cell carcinoma",
              path: "",
              projectNum: 2,
            },
            {
              title: "esophageal basaloid squamous cell carcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "gastroesophageal reflux disease",
              path: "",
              projectNum: 1,
            },
            {
              title: "gastroesophageal junction adenocarcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "eosinophilic esophagitis",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 2,
          title: "thyroid",
          show: false,
          style: {
            top: 14,
            left: 67,
            top2: "top:-70px;",
            left2: "left:15%;",
            border: "borderLeft",
            border2: " arrowLeft clickTextRight",
          },
          src: "src/assets/img/index/icon/thyroid.png",
          tabletext: [
            {
              title: "thyroid gland papillary carcinoma",
              path: "",
              projectNum: 5,
            },
            {
              title: "thyroid gland anaplastic carcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "thyroid gland carcinoma",
              path: "",
              projectNum: 1,
            },
          ],
          alltabletext: [
            {
              title: "thyroid gland papillary carcinoma",
              path: "",
              projectNum: 5,
            },
            {
              title: "thyroid gland anaplastic carcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "thyroid gland carcinoma",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 3,
          title: "lung",
          show: false,
          style: {
            top: 28,
            left: 70,
            top2: "top:-80px;",
            left2: "left:17%;",
            border: "borderLeft",
            border2: " arrowLeft clickTextRight",
          },
          src: "src/assets/img/index/icon/lung.png",
          tabletext: [
            {
              title: "lung non-small cell carcinoma",
              path: "",
              projectNum: 11,
            },
            {
              title: "lung cancer",
              path: "",
              projectNum: 4,
            },
            {
              title: "lung sarcomatoid carcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "lung adenocarcinoma",
              path: "",
              projectNum: 1,
            },
          ],
          alltabletext: [
            {
              title: "lung non-small cell carcinoma",
              path: "",
              projectNum: 11,
            },
            {
              title: "lung cancer",
              path: "",
              projectNum: 4,
            },
            {
              title: "lung sarcomatoid carcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "lung adenocarcinoma",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 4,
          title: "stomach",
          show: false,
          style: {
            top: 42,
            left: 72,
            top2: "top:-80px;",
            left2: "left:19%;",
            border: "borderLeft",
            border2: " arrowLeft clickTextRight",
          },
          src: "src/assets/img/index/icon/stomach.png",
          tabletext: [
            {
              title: "stomach cancer",
              path: "",
              projectNum: 20,
            },
            {
              title: "diffuse gastric cancer",
              path: "",
              projectNum: 1,
            },
            {
              title: "gastrointestinal carcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "gastric adenocarcinoma",
              path: "",
              projectNum: 1,
            },
          ],
          alltabletext: [
            {
              title: "stomach cancer",
              path: "",
              projectNum: 20,
            },
            {
              title: "diffuse gastric cancer",
              path: "",
              projectNum: 1,
            },
            {
              title: "gastrointestinal carcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "gastric adenocarcinoma",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 5,
          title: "pancreas",
          show: false,
          style: {
            top: 56,
            left: 72,
            top2: "top:-72px;",
            left2: "left:17%;",
            border: "borderLeft",
            border2: " arrowLeft clickTextRight",
          },
          src: "src/assets/img/index/icon/pancreas.png",
          tabletext: [
            {
              title: "pancreatic ductal adenocarcinoma",
              path: "",
              projectNum: 6,
            },
            {
              title: "pancreatic cancer",
              path: "",
              projectNum: 4,
            },
            {
              title: "pancreatic adenocarcinoma",
              path: "",
              projectNum: 2,
            },
          ],
          alltabletext: [
            {
              title: "pancreatic ductal adenocarcinoma",
              path: "",
              projectNum: 6,
            },
            {
              title: "pancreatic cancer",
              path: "",
              projectNum: 4,
            },
            {
              title: "pancreatic adenocarcinoma",
              path: "",
              projectNum: 2,
            },
          ],
        },
        {
          id: 6,
          title: "kidney",
          show: false,
          style: {
            top: 70,
            left: 70,
            top2: "top:-70px;",
            left2: "left:16%;",
            border: "borderLeft",
            border2: " arrowLeft clickTextRight",
          },
          src: "src/assets/img/index/icon/kidney.png",
          tabletext: [
            {
              title: "clear cell renal cell carcinoma",
              path: "",
              projectNum: 8,
            },
            {
              title: "renal cell carcinoma",
              path: "",
              projectNum: 2,
            },
            {
              title: "collecting duct carcinoma",
              path: "",
              projectNum: 1,
            },
          ],
          alltabletext: [
            {
              title: "clear cell renal cell carcinoma",
              path: "",
              projectNum: 8,
            },
            {
              title: "renal cell carcinoma",
              path: "",
              projectNum: 2,
            },
            {
              title: "collecting duct carcinoma",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 7,
          title: "Femalereproductivesystem",
          show: false,
          style: {
            top: 84,
            left: 67,
            top2: "top:-110px;",
            left2: "left:16%;",
            border: "borderLeft",
            border2: " arrowLeft clickTextRight",
          },
          src: "src/assets/img/index/icon/Femalereproductivesystem.png",
          tabletext: [
            {
              title: "ovarian serous carcinoma",
              path: "",
              projectNum: 10,
            },
            {
              title: "ovarian cancer",
              path: "",
              projectNum: 6,
            },
            {
              title: "polycystic ovary syndrome",
              path: "",
              projectNum: 4,
            },
            {
              title: "others",
              path: "",
              projectNum: 5,
            },
          ],
          alltabletext: [
            {
              title: "ovarian serous carcinoma",
              path: "",
              projectNum: 10,
            },
            {
              title: "ovarian cancer",
              path: "",
              projectNum: 6,
            },
            {
              title: "polycystic ovary syndrome",
              path: "",
              projectNum: 4,
            },
            {
              title: "ovarian endometrioid cystadenoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "endometrial cancer",
              path: "",
              projectNum: 1,
            },
            {
              title: "ovarian clear cell carcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "cervical adenocarcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "uterine fibroid",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 8,
          title: "brain",
          show: false,
          style: {
            top: 0,
            left: 34,
            top2: "top:-80px;",
            left2: "right:105%;",
            border: "borderRight",
            border2: "clickTextLeft",
          },
          src: "src/assets/img/index/icon/brain.png",
          tabletext: [
            {
              title: "glioblastoma",
              path: "",
              projectNum: 5,
            },
            {
              title: "brain glioma",
              path: "",
              projectNum: 4,
            },
            {
              title: "brain glioblastoma multiforme",
              path: "",
              projectNum: 1,
            },
            {
              title: "pituitary adenoma",
              path: "",
              projectNum: 1,
            },
          ],
          alltabletext: [
            {
              title: "glioblastoma",
              path: "",
              projectNum: 5,
            },
            {
              title: "brain glioma",
              path: "",
              projectNum: 4,
            },
            {
              title: "brain glioblastoma multiforme",
              path: "",
              projectNum: 1,
            },
            {
              title: "pituitary adenoma",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 9,
          title: "breast",
          show: false,
          style: {
            top: 14,
            left: 29,
            top2: "top:-90px;",
            left2: "right:100%;",
            border: "borderRight",
            border2: "clickTextLeft",
          },
          src: "src/assets/img/index/icon/breast.png",
          tabletext: [
            {
              title: "breast cancer",
              path: "",
              projectNum: 23,
            },
            {
              title: "triple-receptor negative breast cancer",
              path: "",
              projectNum: 8,
            },
            {
              title: "invasive ductal carcinoma",
              path: "",
              projectNum: 2,
            },
            {
              title: "others",
              path: "",
              projectNum: 2,
            },
          ],
          alltabletext: [
            {
              title: "breast cancer",
              path: "",
              projectNum: 23,
            },
            {
              title: "triple-receptor negative breast cancer",
              path: "",
              projectNum: 8,
            },
            {
              title: "invasive ductal carcinoma",
              path: "",
              projectNum: 2,
            },
            {
              title: "male breast cancer",
              path: "",
              projectNum: 1,
            },
            {
              title: "breast ductal carcinoma",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 10,
          title: "blood",
          show: false,
          style: {
            top: 28,
            left: 26,
            top2: "top:-105px;",
            left2: "right:100%;",
            border: "borderRight",
            border2: "clickTextLeft",
          },
          src: "src/assets/img/index/icon/blood.png",
          tabletext: [
            {
              title: "colorectal carcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "pancreatic carcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "prostate cancer",
              path: "",
              projectNum: 1,
            },
            {
              title: "others",
              path: "",
              projectNum: 4,
            },
          ],
          alltabletext: [
            {
              title: "colorectal carcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "pancreatic carcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "prostate cancer",
              path: "",
              projectNum: 1,
            },
            {
              title: "pancreatic ductal adenocarcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "liver cancer",
              path: "",
              projectNum: 1,
            },
            {
              title: "melanoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "hepatocellular carcinoma",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 11,
          title: "liver",
          show: false,
          style: {
            top: 42,
            left: 24,
            top2: "top:-60px;",
            left2: "right:105%;",
            border: "borderRight",
            border2: "clickTextLeft",
          },
          src: "src/assets/img/index/icon/liver.png",
          tabletext: [
            {
              title: "hepatocellular carcinoma",
              path: "",
              projectNum: 33,
            },
            {
              title: "liver cancer",
              path: "",
              projectNum: 3,
            },
          ],
          alltabletext: [
            {
              title: "hepatocellular carcinoma",
              path: "",
              projectNum: 33,
            },
            {
              title: "liver cancer",
              path: "",
              projectNum: 3,
            },
          ],
        },
        {
          id: 12,
          title: "largeintestine",
          show: false,
          style: {
            top: 56,
            left: 24,
            top2: "top:-80px;",
            left2: "right:105%;",
            border: "borderRight",
            border2: "clickTextLeft",
          },
          src: "src/assets/img/index/icon/largeintestine.png",
          tabletext: [
            {
              title: "colorectal cancer",
              path: "",
              projectNum: 21,
            },
            {
              title: "colon cancer",
              path: "",
              projectNum: 9,
            },
            {
              title: "familial adenomatous polyposis",
              path: "",
              projectNum: 3,
            },
            {
              title: "colon adenoma",
              path: "",
              projectNum: 1,
            },
          ],
          alltabletext: [
            {
              title: "colorectal cancer",
              path: "",
              projectNum: 21,
            },
            {
              title: "colon cancer",
              path: "",
              projectNum: 9,
            },
            {
              title: "familial adenomatous polyposis",
              path: "",
              projectNum: 3,
            },
            {
              title: "colon adenoma",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 13,
          title: "bladder",
          show: false,
          style: {
            top: 70,
            left: 26,
            top2: "top:-60px;",
            left2: "right:105%;",
            border: "borderRight",
            border2: "clickTextLeft",
          },
          src: "src/assets/img/index/icon/bladder.png",
          tabletext: [
            {
              title: "bladder carcinoma",
              path: "",
              projectNum: 6,
            },
            {
              title: "bladder urothelial carcinoma",
              path: "",
              projectNum: 1,
            },
          ],
          alltabletext: [
            {
              title: "bladder carcinoma",
              path: "",
              projectNum: 6,
            },
            {
              title: "bladder urothelial carcinoma",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 14,
          title: "Malereproductivesystem",
          show: false,
          style: {
            top: 84,
            left: 29,
            top2: "top:-70px;",
            left2: "right:105%;",
            border: "borderRight",
            border2: "clickTextLeft",
          },
          src: "src/assets/img/index/icon/Malereproductivesystem.png",
          tabletext: [
            {
              title: "prostate cancer",
              path: "",
              projectNum: 12,
            },
            {
              title: "cervical cancer",
              path: "",
              projectNum: 2,
            },
            {
              title: "testicular germ cell cancer",
              path: "",
              projectNum: 2,
            },
          ],
          alltabletext: [
            {
              title: "prostate cancer",
              path: "",
              projectNum: 12,
            },
            {
              title: "cervical cancer",
              path: "",
              projectNum: 2,
            },
            {
              title: "testicular germ cell cancer",
              path: "",
              projectNum: 2,
            },
          ],
        },
      ],
      tissueList2: [
        {
          id: 1,
          title: "lung",
          show: false,
          style: {
            top: 10,
            left: 67,
            top2: "top:-95px;",
            left2: "left:18%;",
            border: "borderLeft",
            border2: " arrowLeft clickTextRight",
          },
          src: "src/assets/img/index/icon/lung.png",
          tabletext: [
            {
              title: "lung cancer",
              path: "",
              projectNum: 9,
            },
            {
              title: "lung small cell carcinoma",
              path: "",
              projectNum: 2,
            },
            {
              title: "lung adenocarcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "others",
              path: "",
              projectNum: 3,
            },
          ],
          alltabletext: [
            {
              title: "lung cancer",
              path: "",
              projectNum: 9,
            },
            {
              title: "lung small cell carcinoma",
              path: "",
              projectNum: 2,
            },
            {
              title: "lung adenocarcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "lung squamous cell carcinoma",
              path: "",
              projectNum: 1,
            },
            {
              title: "pulmonary fibrosis",
              path: "",
              projectNum: 1,
            },
            {
              title: "lung non-small cell carcinoma",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 2,
          title: "liver",
          show: false,
          style: {
            top: 26,
            left: 71,
            top2: "top:-85px;",
            left2: "left:20%;",
            border: "borderLeft",
            border2: " arrowLeft clickTextRight",
          },
          src: "src/assets/img/index/icon/liver.png",
          tabletext: [
            {
              title: "liver cancer",
              path: "",
              projectNum: 9,
            },
            {
              title: "hepatoblastoma",
              path: "",
              projectNum: 2,
            },
            {
              title: "hepatocellular carcinoma",
              path: "",
              projectNum: 2,
            },
          ],
          alltabletext: [
            {
              title: "liver cancer",
              path: "",
              projectNum: 9,
            },
            {
              title: "hepatoblastoma",
              path: "",
              projectNum: 2,
            },
            {
              title: "hepatocellular carcinoma",
              path: "",
              projectNum: 2,
            },
          ],
        },
        {
          id: 3,
          title: "pancreas",
          show: false,
          style: {
            top: 45,
            left: 73,
            top2: "top:-80px;",
            left2: "left:20%;",
            border: "borderLeft",
            border2: " arrowLeft clickTextRight",
          },
          src: "src/assets/img/index/icon/pancreas.png",
          tabletext: [
            {
              title: "pancreatic cancer",
              path: "",
              projectNum: 2,
            },
            {
              title: "pancreatic endocrine carcinoma",
              path: "",
              projectNum: 2,
            },
          ],
          alltabletext: [
            {
              title: "pancreatic cancer",
              path: "",
              projectNum: 2,
            },
            {
              title: "pancreatic endocrine carcinoma",
              path: "",
              projectNum: 2,
            },
          ],
        },
        {
          id: 5,
          title: "stomach",
          show: false,
          style: {
            top: 65,
            left: 71,
            top2: "top:-60px;",
            left2: "left:20%;",
            border: "borderLeft",
            border2: " arrowLeft clickTextRight",
          },
          src: "src/assets/img/index/icon/stomach.png",
          tabletext: [
            {
              title: "gastric squamous cell carcinoma",
              path: "",
              projectNum: 1,
            },
          ],
          alltabletext: [
            {
              title: "gastric squamous cell carcinoma",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 6,
          title: "bladder",
          show: false,
          style: {
            top: 83,
            left: 67,
            top2: "top:-75px;",
            left2: "left:20%;",
            border: "borderLeft",
            border2: " arrowLeft clickTextRight",
          },
          src: "src/assets/img/index/icon/bladder.png",
          tabletext: [
            {
              title: "bladder carcinoma",
              path: "",
              projectNum: 2,
            },
            {
              title: "urinary tract infection",
              path: "",
              projectNum: 2,
            },
          ],
          alltabletext: [
            {
              title: "bladder carcinoma",
              path: "",
              projectNum: 2,
            },
            {
              title: "urinary tract infection",
              path: "",
              projectNum: 2,
            },
          ],
        },
        {
          id: 9,
          title: "brain",
          show: false,
          style: {
            top: 10,
            left: 31,
            top2: "top:-90px;",
            left2: "right:100%;",
            border: "borderRight",
            border2: "clickTextLeft",
          },
          src: "src/assets/img/index/icon/brain.png",
          tabletext: [
            {
              title: "diffuse midline glioma, H3 K27M-mutant",
              path: "",
              projectNum: 3,
            },
            {
              title: "high grade glioma",
              path: "",
              projectNum: 2,
            },
            {
              title: "brain glioma",
              path: "",
              projectNum: 1,
            },
            {
              title: "others",
              path: "",
              projectNum: 2,
            },
          ],
          alltabletext: [
            {
              title: "diffuse midline glioma, H3 K27M-mutant",
              path: "",
              projectNum: 3,
            },
            {
              title: "high grade glioma",
              path: "",
              projectNum: 2,
            },
            {
              title: "brain glioma",
              path: "",
              projectNum: 1,
            },
            {
              title: "pituitary cancer",
              path: "",
              projectNum: 1,
            },
            {
              title: "tuberous sclerosis",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 10,
          title: "breast",
          show: false,
          style: {
            top: 26,
            left: 25,
            top2: "top:-80px;",
            left2: "right:105%;",
            border: "borderRight",
            border2: "clickTextLeft",
          },
          src: "src/assets/img/index/icon/breast.png",
          tabletext: [
            {
              title: "breast cancer",
              path: "",
              projectNum: 18,
            },
            {
              title: "Her2-receptor positive breast cancer",
              path: "",
              projectNum: 3,
            },
            {
              title: "triple-receptor negative breast cancer",
              path: "",
              projectNum: 2,
            },
          ],
          alltabletext: [
            {
              title: "breast cancer",
              path: "",
              projectNum: 18,
            },
            {
              title: "Her2-receptor positive breast cancer",
              path: "",
              projectNum: 3,
            },
            {
              title: "triple-receptor negative breast cancer",
              path: "",
              projectNum: 2,
            },
          ],
        },
        {
          id: 11,
          title: "largeintestine",
          show: false,
          style: {
            top: 45,
            left: 23,
            top2: "top:-70px;",
            left2: "right:105%;",
            border: "borderRight",
            border2: "clickTextLeft",
          },
          src: "src/assets/img/index/icon/largeintestine.png",
          tabletext: [
            {
              title: "colon cancer",
              path: "",
              projectNum: 11,
            },
            {
              title: "colitis",
              path: "",
              projectNum: 4,
            },
          ],
          alltabletext: [
            {
              title: "colon cancer",
              path: "",
              projectNum: 11,
            },
            {
              title: "colitis",
              path: "",
              projectNum: 4,
            },
          ],
        },
        {
          id: 13,
          title: "kidney",
          show: false,
          style: {
            top: 65,
            left: 25,
            top2: "top:-80px;",
            left2: "right:105%;",
            border: "borderRight",
            border2: "clickTextLeft",
          },
          src: "src/assets/img/index/icon/kidney.png",
          tabletext: [
            {
              title: "liver cancer",
              path: "",
              projectNum: 1,
            },
            {
              title: "kidney disease",
              path: "",
              projectNum: 1,
            },
          ],
          alltabletext: [
            {
              title: "liver cancer",
              path: "",
              projectNum: 1,
            },
            {
              title: "kidney disease",
              path: "",
              projectNum: 1,
            },
          ],
        },
        {
          id: 14,
          title: "Malereproductivesystem",
          show: false,
          style: {
            top: 83,
            left: 31,
            top2: "top:-70px;",
            left2: "right:105%;",
            border: "borderRight",
            border2: "clickTextLeft",
          },
          src: "src/assets/img/index/icon/Malereproductivesystem.png",
          tabletext: [
            {
              title: "prostate cancer",
              path: "",
              projectNum: 4,
            },
          ],
          alltabletext: [
            {
              title: "prostate cancer",
              path: "",
              projectNum: 4,
            },
          ],
        },
      ],
      imgList: [
        {
          id: 0,
          src: "src/assets/img/index/human1.png",
          isborder: true,
        },
        {
          id: 1,
          title: "mouse",
          src: "src/assets/img/index/mouse1.png",
          isborder: false,
        },
      ],
      shwoImg: [
        {
          id: 0,
          title: "human",
          src: "src/assets/img/index/human2.svg",
          isborder: true,
        },
        {
          id: 1,
          title: "mouse",
          src: "src/assets/img/index/mouse2.svg",
          isborder: false,
        },
      ],
    });

    function clickText(a) {
      data.tissueList.forEach((element) => {
        if (element.id == a) {
          element.show = !element.show;
        } else {
          element.show = false;
        }
      });
      data.tissueList2.forEach((element) => {
        if (element.id == a) {
          element.show = !element.show;
        } else {
          element.show = false;
        }
      });
    }

    function tobrowse(a, b) {
      // console.log(a)
      // if (data.species == "Homo sapiens") {
      //   router.push({
      //     path: "/browse/homo",
      //   });
      // } else {
      //   router.push({
      //     path: "/browse/mus",
      //   });
      // }
      // store.commit("BrotherTransmitAbout/changepath", {
      //   tree_expand_key: [a, b],
      // });
      // store.commit("BrotherTransmitAbout/tissuedetaile", { tissue: a });
    }

    function change_border(index) {
      if (0 == index) {
        data.species = "Homo sapiens";
      } else {
        data.species = "Mus musculus";
      }
      data.loading = true;
      setTimeout(function () {
        data.loading = false;
      }, 1000);
      data.imgList.forEach((element) => {
        element.isborder = false;
        if (element.id == index) {
          element.isborder = true;
        }
      });
      data.shwoImg.forEach((element) => {
        element.isborder = false;
        if (element.id == index) {
          element.isborder = true;
        }
      });
      data.tissueList.forEach((element) => {
        element.show = false;
      });
      data.tissueList2.forEach((element) => {
        element.show = false;
      });
      // 切换显示的图片
      // store.commit("IndexEchartsAbout/showImg", {
      //   imgPath: data.shwoImg[index].src,
      // });
    }
    onMounted(() => {
      data.loading = false;
    });
    return {
      data,
      change_border,
      clickText,
      tobrowse
    };
}
  // methods: {
  //   ...mapMutations("IndexEchartsAbout", { changeImg: "changeEcharts" }),
  // },