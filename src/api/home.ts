import { http } from "@/utils/http";


type Result = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总数 */
    total?: number;
  };
};

type ResultDept = {
  success: boolean;
  data?: Array<any>;
};

type ResultDownload = {
  status?: {
    code?: number,
    desc: boolean
  },
  resultSet?: Array<any>;
};

type ResultDownloadvolcano = {
  status?: {
    code?: number,
    desc: boolean
  },
  paging?: {
    pageNum?: number,
    pageSize?: number,
    size?: number,
    total?: number,
    page?: number,
    pagedata?: Array<any>;
  },
  resultSet?:{
    searchList?: Array<any>;
    dataList?: Array<any>;
    upMin?: number,
    upMax?: number,
    downMin?: number,
    downMax?: number,
    upDataList?: Array<any>;
    downDataList?: Array<any>;
  };
};

type ResultDownloadImg = {
  status?: {
    code?: number,
    desc: boolean
  },
  resultSet?: {
    heatmap?: Array<any>;
    trajectory?: Array<any>;
    communication?: Array<any>;
  };
};

type ResultDownloaddetailtable = {
  status?: {
    code?: number,
    desc: boolean
  },
  resultSet?: {
    first: {
      datasetname: string;
      databaseid: string;
      accessionHtml: string;
      tissue: string;
      sample: string;
      groupdata: string;
      cellsnum: string;
      celltype: string;
      publicationHtml: string;
    },
    second?: {
      legendData?: Array<any>;
      color?: Array<any>;
      series?: Array<any>;
    },
    third?: Array<any>;
    fourth?: {
      dropList?: Array<any>;
      dataset?: string;
      tissue?: string;
    }
  };
};


/** 提交 */
export const putinfo = (data?: object) => {
  return http.request<ResultDownload>("post", "",{"data": { data }})
}

