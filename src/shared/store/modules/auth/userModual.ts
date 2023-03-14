import type { USERS } from "./user.interface";
import { auth } from "@/utils/firebase";
import { updateProfile } from "firebase/auth";

const state = {
  user: {} as USERS,
};

const getters = {
  getUser(state: any) {
    state.user;
  },
};

const actions = {
  async updateProfile(context: any, user: USERS) {
    // const data = updateProfile(auth.currentUser, {displayName: user.dispalyName})
  },
};

const mutatation = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutatation,
};
