import type { Emitter } from "mitt";
import mitt from "mitt";

type Events = {
  resize: {
    detail: {
      width: number;
      height: number;
    };
  };
  openPanel: string;
  tagViewsChange: string;
  tagViewsShowModel: string;
  logoChange: boolean;
  changLayoutRoute: {
    indexPath: string;
    parentPath: string;
  };
  treescroll: {
    treeNodeName: string;
    treeNodeValue: boolean;
  };

  volcanotable: {
    dataset: string;
    type: string;
    celltype: string;
  }


  volcanotablesc: {
    dataset: string;
    type: string;
    celltype: string;
  }

  volcanotablebulk: {
    dataset: string;
    type: string;
    celltype: string;
  }

  volcanotableOther: {
    dataset: string;
    type: string;
    celltype: string;
  }




  searchgenetable: {
    gene: any;
    type: string;
    start: any;
    end: any;
  };
  bulktreeexpand: {
    expandname: string;
    expandstatus: boolean
  };
  othertreeexpand: {
    expandname: string;
    expandstatus: boolean
  };
  sctreeexpand: {
    expandname: string;
    expandstatus: boolean
  }
};

export const emitter: Emitter<Events> = mitt<Events>();
