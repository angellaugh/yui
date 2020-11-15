import storage from "@/utils/storage";

import util from "./util";
const state = {
  // formItemArray
  formList: [],
  // form配置

  formConfig: {
    test: "",
    "label-width": 100,
    size: "small",
    "label-position": "right",
    style: ""
  },
  // 当前选择对象的UUID
  curSelectItemUUID: null,
  // 标记
  skipWatchFlag: false
};

// getters
const getters = {
  curSelectItem(state) {
    if (state.curSelectItemUUID) {
      return util.getCurEditItem(state.formList, state.curSelectItemUUID);
    }
    return null;
  },
  // uuidName列表
  uuidFieldNameNameList(state) {
    return util.getUUIDList(state.formList);
  },
  // 为空的对象
  errFormListByNull(state, getters) {
    const tempErrListNull = [];
    Object.entries(getters.uuidFieldNameNameList).forEach(item => {
      if (!item[1]) {
        tempErrListNull.push(item[0]);
      }
    });
    return tempErrListNull;
  },
  // 重复的对象
  errFormListByRepeat(state, getters) {
    const tempErrListRepeat = [];
    const tempValues = Object.values(getters.uuidFieldNameNameList);
    Object.entries(getters.uuidFieldNameNameList).forEach(item => {
      if (tempValues.filter(_ => _ === item[1]).length > 1) {
        tempErrListRepeat.push(item[0]);
      }
    });
    return tempErrListRepeat;
  }
};
// actions
const actions = {
  // push新组件到List
  pushItemToList({ commit, state }, item) {
    commit("UploadFormList", [...state.formList, item]);
  },

  // 删除对象
  handleDeleteItem({ commit, state }, uuid) {
    const tempList = JSON.parse(JSON.stringify(state.formList));
    util.deleteItem(tempList, uuid);
    commit("UploadFormList", tempList);
    commit("SetCurSelectItemUUID", null);
  },

  // =====================  历史记录 start =========================
  // 清空历史记录
  clearData({ commit }) {
    const max = storage.ss.get("historyMax");
    storage.ss.remove("historyPointer");
    storage.ss.remove("historyMax");
    let len = 1;
    while (len <= max) {
      storage.ss.remove(`history_${len}`);
      len++;
    }
    commit("UploadFormList", []);
    commit("SetCurSelectItemUUID", null);
  },
  // 撤销历史
  backAction({ commit }) {
    let point = storage.ss.get("historyPointer") - 1;
    if (point > 0) {
      commit("SetSkipWatchFlag", true);
      commit("UploadFormList", storage.ss.get(`history_${point}`));
      storage.ss.set("historyPointer", point);
      commit("SetCurSelectItemUUID", null);
    } else if (Number(point) === 0) {
      commit("SetSkipWatchFlag", true);
      commit("UploadFormList", []);
      storage.ss.set("historyPointer", point);
      commit("SetCurSelectItemUUID", null);
    }
  },
  // 重做历史
  redoAction({ commit }) {
    let length = storage.ss.get("historyPointer") + 1;
    const max = storage.ss.get("historyMax");
    if (length <= max) {
      commit("SetSkipWatchFlag", true);
      commit("UploadFormList", storage.ss.get(`history_${length}`));
      storage.ss.set("historyPointer", length);
    }
  }
  // =====================  历史记录 end =========================
};

// mutations
const mutations = {
  UploadFormList(state, array) {
    // 对每次操作LIST进行记录，该操作不涉及state
    if (!state.skipWatchFlag) {
      util.uploadHistory(state.formList);
    }

    state.skipWatchFlag = false;

    state.formList = array;
  },
  UploadFormConfig(state, obj) {
    state.formConfig = obj;
  },
  ChangeFormConfigItem(state, { key, value }) {
    state.formConfig[key] = value;
  },
  SetCurSelectItemUUID(state, uuid) {
    state.curSelectItemUUID = uuid;
  },
  ChangeCurSelectItemOption(state, { key, value }) {
    const json = JSON.parse(JSON.stringify(state.formList));
    util.setCurEditItem(json, state.curSelectItemUUID, {
      key,
      value
    });
    state.formList = json;
  },
  SetSkipWatchFlag(state, bol) {
    state.skipWatchFlag = bol;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
