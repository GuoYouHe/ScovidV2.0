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

type Resultsearch = {
  status?: {
    code?: number,
    desc: boolean
  },
  resultSet?: {
    detailresultbygenecelltype?: Array<any>;
    detailresultbygenesubtype?: Array<any>;
    detailresultbygenebulk?: Array<any>;
    detailresultbygenevir?: Array<any>;
  };
};

type ResultLike = {
  status?: {
    code?: number,
    desc: boolean
  },
  resultSet?:Array<any>;
};

type Resultsearchvolcano = {
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

type ResultsearchImg = {
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

type Resultsearchdetailtable = {
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


/** 获取差异基因 */
export const getsearchvolcanotable = (data?: object) => {
  return http.request<Resultsearchvolcano>("post", "/bro/volcanopageTablesearch",{"data": { data }})
}

/** 获取差异基因箱图和umap*/
// export const getsearchvolcanotableImg = (data?: object) => {
//   return http.request<Resultsearchvolcano>("post", "/bro/volcanopageTablesearch",{"data": { data }})
// }

/** 获取差异基因下载 */
export const getsearchvolcanotableall = (data?: object) => {
  return http.request<Resultsearchvolcano>("post", "/bro/volcanotableall",{"data": { data }})
}

/** 获取差异基因排序 */
export const getsearchvolcanotablesearch = (data?: object) => {
  return http.request<Resultsearch>("post", "/deg/search",{"data": { data }})
}

/** 获取基因模糊匹配*/
export const getsearchlike = (data?: object) => {
  return http.request<ResultLike>("post", "/deg/searchlike",{"data": { data }})
}

/** 查询是否有值*/
export const getsearchlikenumb = (data?: object) => {
  return http.request<ResultLike>("post", "/deg/searchlikenumb",{"data": { data }})
}

/** 获取datasettree*/
export const getsearchtree = (data?: object) => {
  return http.request<ResultLike>("post", "/des/searchtree",{"data": { data }})
}

/** 获取Go */
export const getsearchgo = (data?: object) => {
  return http.request<Resultsearchvolcano>("post", "/bro/go",{"data": { data }})
}

/** 获取Kegg */
export const getsearchkegg = (data?: object) => {
  return http.request<Resultsearchvolcano>("post", "/bro/kegg",{"data": { data }})
}


/** 下载图片 */
export const downloadpdfimg = (data?: object) => {
  return http.request<ResultsearchImg>("post", "/des/scdetailimg", { "data": { data } })
}
