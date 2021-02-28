import { createStore } from "vuex";
import util from "@/util";
import {
  LOAD_PAGE,
  SET_EPILOGUE_PAGE,
  SET_PAGE_LOADING_PENDING
} from "@/store/types";

const state = {
  epilogue: {
    pages: 2,
    page: 1,
    pageLoadingPending: false
  }
};

const mutations = {
  [SET_EPILOGUE_PAGE](state, page) {
    state.epilogue.page = page;
  },
  [SET_PAGE_LOADING_PENDING](state, flag) {
    state.epilogue.pageLoadingPending = flag;
  }
};

const actions = {
  [LOAD_PAGE]({ commit, state }, page) {
    if (state.epilogue.pageLoadingPending) {
      return;
    }
    commit(SET_PAGE_LOADING_PENDING, true);

    const src = require("../assets/img/page-" + page + ".jpg");
    util
      .loadImage(src)
      .then(() => {
        commit(SET_PAGE_LOADING_PENDING, false);
        commit(SET_EPILOGUE_PAGE, page);
      })
      .catch(e => {
        commit(SET_PAGE_LOADING_PENDING, false);
        console.error(e.message);
      });
  }
};

export default createStore({
  state,
  mutations,
  actions
});
