import { createStore } from "vuex";
import authModules from "./modules/auth/authModules";

export default createStore({
  modules: {
    authModules,
  },
});
