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

type ResultBrowse = {
  status?: {
    code?: number,
    desc: boolean
  },
  resultSet?: Array<any>;
};

type ResultBrowsevolcano = {
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

type ResultBrowseImg = {
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

type ResultBrowsedetailtable = {
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
      publication:"",
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

/** 获取用户管理列表 */
export const getUserList = (data?: object) => {
  return http.request<Result>("post", "/user", { data });
};

/** 获取角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<Result>("post", "/role", { data });
};

/** 获取部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<ResultDept>("post", "/dept", { data });
};

/** 获取首页饼图数据 */
export const getbrowsepie = (data?: object) => {
  return http.request<ResultBrowse>("post", "/bro/homedespie", { "data": { data } });
};

/** 获取组织列表树 */
export const getTreeList = (data?: object) => {
  return http.request<ResultBrowse>("post", "/des/browse", { "data": { data } });
};

/** 获取第一个table */
export const getbrowsefirsttable = (data?: object) => {
  return http.request<ResultBrowsedetailtable>("post", "/bro/browsefirsttable",{"data": { data }})
}

/** 获取第一个umap */
export const getbrowsescumap = (data?: object) => {
  return http.request<ResultBrowsedetailtable>("post", "/bro/scumap",{"data": { data }})
}

/** 获取火山图选择项 */
export const getbrowsevolcanoselect = (data?: object) => {
  return http.request<ResultBrowsedetailtable>("post", "/bro/volcanoselect",{"data": { data }})
}

/** 获取网络图 */
export const getbrowsecommunication = (data?: object) => {
  return http.request<ResultBrowse>("post", "/bro/communication",{"data": { data }})
}

/** 获取网络图 */
export const getbrowsecommunicationheatmap = (data?: object) => {
  return http.request<ResultBrowse>("post", "/bro/communicationheatmap",{"data": { data }})
}

/** 获取火山图 */
export const getbrowsevolcano = (data?: object) => {
  return http.request<ResultBrowsevolcano>("post", "/bro/volcano",{"data": { data }})
}

/** 获取差异基因 */
export const getbrowsevolcanotable = (data?: object) => {
  return http.request<ResultBrowsevolcano>("post", "/bro/volcanopageTablesearch",{"data": { data }})
}

/** 获取差异基因箱图和umap*/
// export const getbrowsevolcanotableImg = (data?: object) => {
//   return http.request<ResultBrowsevolcano>("post", "/bro/volcanopageTablesearch",{"data": { data }})
// }

/** 获取差异基因下载 */
export const getbrowsevolcanotableall = (data?: object) => {
  return http.request<ResultBrowsevolcano>("post", "/bro/volcanotableall",{"data": { data }})
}

/** 获取差异基因排序 */
export const getbrowsevolcanotablesearch = (data?: object) => {
  return http.request<ResultBrowsevolcano>("post", "/bro/volcanotablesearch",{"data": { data }})
}

export const getbrowsetablebox = (data?: object) => {
  return http.request<ResultBrowse>("post", "/bro/tablebox",{"data": { data }})
}

/** 获取Go */
export const getbrowsego = (data?: object) => {
  return http.request<ResultBrowsevolcano>("post", "/bro/go",{"data": { data }})
}

/** 获取Kegg */
export const getbrowsekegg = (data?: object) => {
  return http.request<ResultBrowsevolcano>("post", "/bro/kegg",{"data": { data }})
}

/** 获取abundance */
export const getbrowsescabundance = (data?: object) => {
  return http.request<ResultBrowsedetailtable>("post", "/des/scabundance",{"data": { data }})
}

/** 获取热图 轨迹图 通讯图 */
export const getbrowsescheatmapandtrajectory = (data?: object) => {
  return http.request<ResultBrowseImg>("post", "/des/scdetailimg",{"data": { data }})
}

/** 下载图片 */
export const downloadpdfimg = (data?: object) => {
  return http.request<ResultBrowseImg>("post", "/des/scdetailimg", { "data": { data } })
}
