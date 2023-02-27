import { createStore } from "vuex";
import authModules from "./modules/auth/authModules";
import todoModule from "./modules/todoModule/todoModule";

export default createStore({
  modules: {
    authModules,
    todoModule,
  },
});
