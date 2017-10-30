
import Vue from 'vue'
import * as TYPE from '../types'

import environmentUrl from '../../mixins/environmentUrl';

const state = {
  isFetching: false,
  challenges: {},
  exercises: {},
};

const mutations = {
  [TYPE.MASTER_FETCHING](state, payload) {
    state.isFetching = !!payload;
  },
  [TYPE.MASTER_UPDATE](state, payload) {
    if(payload.challenges) {
      state.challenges = payload.challenges;
    }
    if(payload.exercises) {
      state.exercises = payload.exercises;
    }
  },
};

const actions = {
  [TYPE.MASTER_UPDATE]({dispatch, commit, state}) {
    commit(TYPE.MASTER_FETCHING, true);
    return new Promise((resolve, reject) => {
      Vue.http.get(environmentUrl.methods.$apiUrl('/master')).then(
        r => {
          if(r.body.status === 'OK') {
            commit(TYPE.MASTER_UPDATE, r.body.response);
            resolve();
            commit(TYPE.MASTER_FETCHING, false);
          }
          else {
            reject(r.body.error);
            commit(TYPE.MASTER_FETCHING, false);
          }
        },
        e => {
          reject(arguments);
          commit(TYPE.MASTER_FETCHING, false);
        },
      );
    });
  }
};

export default {
  state,
  mutations,
  actions
}
