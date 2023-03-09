import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, firebase, provider } from "@/utils/firebase";
import { USERS } from "@/views/auth/auth.interface";

const state = {
  user: {
    isAuth: false,
    data: null,
  },
};

const getters = {
  user(state: any) {
    return state.user;
  },
};

const actions = {
  async register(context: any, user: USERS) {
    const response = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    if (response) {
      context.commit("SET_USERS", response.user);
    } else {
      throw new Error("Unable to register");
    }
  },
  async signIn(context: any, user: USERS) {
    const response = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    if (response) {
      context.commit("SET_USER_LOGIN", response.user);
      context.commit("SET_LOGGED_IN", true);
    } else {
      throw new Error("login failed");
    }
  },

  async signInWithGoogle(context: any) {
    const res = await signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  },

  async fetchUserById(context: any, userId: String) {
    console.log("getUser");
  },
};

const mutations = {
  SET_LOGGED_IN(state: any, val: boolean) {
    state.user.isAuth = val;
    console.log(val);
  },
  SET_USER_LOGIN(state: any, data: any) {
    state.user.data = data;
  },
  SET_USER_SIGNIN(state: any, data: USERS) {
    state.user.data = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
