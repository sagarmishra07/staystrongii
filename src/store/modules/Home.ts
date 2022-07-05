import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { StateInterface } from '..';
import {
  firebaseGet,
  firebasePush,
  firebaseUpdate,
  firebaseUploadImages,
  firebaseRemove,
  firebaseGetDataByQuery,
  firebaseStore,
  firebaseGetOne,
} from '../../api/firebase';
import { errorNotify, successNotify } from 'src/utils/notify';

//urlInfo

export interface ICommonState {
  example: any;
}

const state: ICommonState = {
  example: {},
};
const getters: GetterTree<any, any> = {};

const mutations: MutationTree<ICommonState> = {};

const actions: ActionTree<ICommonState, StateInterface> = {
  async getData({ dispatch, commit }: any, data: any) {
    try {
      const res = await firebaseGet(data.url);
      // successNotify(`${data?.url} Fetched`);
      // commit(`set${data.url}`, res);
    } catch (error: any) {
      errorNotify(`Failed to fetch ${data.url}`);
      dispatch('getData', data);
    }
  },

  async getOneData({ commit }: any, data: any) {
    try {
      const res = await firebaseGetOne(data.url, data.id);
      // successNotify(`${data?.url} Fetched`);
      // commit('setDetails', res);
    } catch (error: any) {
      errorNotify('Error in Details Fetched');
    }
  },

  async addData({ dispatch }: any, data: any) {
    try {
      await firebaseStore(data?.url, data?.data);
      successNotify(`${data?.url} Added`);
      // dispatch('getData', data);
    } catch (error: any) {
      errorNotify(`Failed to fetch ${data?.url}`);
    }
  },

  async pushData({ dispatch }: any, data: any) {
    try {
      const key = await firebasePush(data?.url, data?.data);
      successNotify(`${data?.url} Added`);
      dispatch('getData', data);
      return key;
    } catch (error: any) {
      errorNotify(`Failed to fetch ${data?.url}`);
    }
  },

  async getDataByQuery({ commit }: any, data: any) {
    try {
      const res = await firebaseGetDataByQuery(data.url);

      // successNotify(`${data?.url} fetched`);
      // commit(`set${data.url}`, res ? res : []);
    } catch (error: any) {
      errorNotify(`Failed to fetch ${data.url}`);
    }
  },

  async updateData({ dispatch }: any, data: any) {
    try {
      await firebaseUpdate(data?.url, data?.id, data?.data);
      dispatch('getData', data);
      successNotify(`${data?.url} Updated`);
    } catch (error: any) {
      errorNotify(`Failed to Update ${data.url}`);
    }
  },
  async deleteData({ dispatch }: any, data: any) {
    try {
      await firebaseRemove(data.url, data.id);
      dispatch('getData', data);
      successNotify(`${data.url} Deleted`);
    } catch (error: any) {
      errorNotify(`Failed to Delete ${data.url}`);
    }
  },
  async uploadImage({ dispatch }: any, data: any) {
    try {
      await firebaseUploadImages(data.url, data.id, data.images);
      dispatch('getData', data);
      successNotify('Image Uploaded');
    } catch (error: any) {
      errorNotify('Upload Failed');
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
