import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "@/utils/firebase";
import { USERS } from "@/views/auth/auth.interface";
import store from "@/store/store";
import { LoadingSpinner } from "@/components";

const state = {
  user: null,
  isAuth: false,
};

const getters = {
  user(state: any) {
    return state.user;
  },
};

const actions = {
  async register(context: any, user: USERS) {
    await LoadingSpinner.present();
    const response = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    if (response) {
      context.commit("SET_USER", response.user);
    } else {
      throw new Error("Unable to register");
    }
    await LoadingSpinner.dismiss();
  },
  async signIn(context: any, user: USERS) {
    await LoadingSpinner.present();
    const response = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    if (response) {
      context.commit("SET_USER", response.user);
    } else {
      LoadingSpinner.dismiss();
      throw new Error("login failed");
    }
    LoadingSpinner.dismiss();
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

  async signOutUser(context: any) {
    await LoadingSpinner.present();
    try {
      await signOut(auth);
      context.commit("SET_IS_AUTH", false);
      context.commit("SET_USER", null);
    } catch (error) {
      console.log(error);
    }
    await LoadingSpinner.dismiss();
  },
};

// onAuthStateChnage
const isLogin = onAuthStateChanged(auth, (user: any) => {
  store.commit("authModules/SET_IS_AUTH", true);
  store.commit("authModules/SET_USER", user);
  isLogin();
});

const mutations = {
  SET_USER(state: any, payload: any) {
    state.user = payload;
    console.log("user mutatation", payload);
  },
  SET_IS_AUTH(state: any, payload: boolean) {
    state.isAuth = payload;
    console.log("isAuth:", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
