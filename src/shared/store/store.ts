import { createStore } from "vuex";
import authModules from "./modules/auth/authModules";
import todoModule from "./modules/todoModule/todoModule";
import userModual from "./modules/auth/userModual";

const store = createStore({
  modules: {
    authModules,
    todoModule,
    userModual,
  },
});

export default store;
