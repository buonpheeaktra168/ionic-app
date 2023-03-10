import { createStore } from "vuex";
import authModules from "./modules/auth/authModules";
import todoModule from "./modules/todoModule/todoModule";

const store = createStore({
  modules: {
    authModules,
    todoModule,
  },
});

export default store;
