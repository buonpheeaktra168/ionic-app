import { Todos } from "./todo.interface";

const localAPI = process.env.VUE_APP_LOCAL_API;

const state = {
  todo: [] as Todos[],
  tmpTodo: [] as Todos[],
  todoCompleted: [] as Todos[],
  isLoading: false,
  isAddTodo: false,
  isUpdateTodo: {} as Todos,
};

const getters = {
  getTodos: (state: any) => state.todo,
  getLoading: (state: any) => state.isLoading,
  isAdd: (state: any) => state.isAdd,
  getUpdate: (state: any) => state.isUpdateTodo,
  getCompleted: (state: any) => {
    state.todoCompleted, console.log(state.todoCompleted);
  },
};

const actions = {
  async fetchTodos({ commit }: any) {
    try {
      state.isLoading = true;
      await fetch(localAPI)
        .then((res) => res.json())
        .then((data: Todos[]) => {
          data.forEach((item: Todos) => state.tmpTodo.push(item));
          data.filter((e: any) => {
            if (e.isCompleted == true) {
              return state.todoCompleted.push(e.isCompleted);
            }
          });
          commit("GET_TODOS", data);
        });
      state.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  },

  async addTodo({ commit }: any, data: Todos) {
    const id = new Date().getTime().toString(36);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: data.title,
        isCompleted: false,
      }),
    };
    try {
      await fetch(localAPI, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          commit("ADD_TODO", data);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  },

  async deleteTodo({ commit }: any, id: string) {
    try {
      await fetch(`${localAPI}/${id}`, {
        method: "DELETE",
      }).then(() => commit("DELETE_TODO", id));
    } catch (error) {
      console.log(error);
    }
  },

  async updateTodo({ commit }: any, data: Todos) {
    console.log(data.id);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.id,
        title: data.title,
        isCompleted: data.isCompleted,
      }),
    };
    try {
      await fetch(`${localAPI}/${data.id}`, requestOptions)
        .then((res) => res.json())
        .then((data) => commit("UPDATE_TODO", data));
    } catch (error) {
      console.log(error);
    }
  },

  async searchTodos({ commit }: any, value: Todos) {
    await commit("SEARCH_TODO", value);
  },

  isAdd({ commit }: any, add: boolean) {
    commit("IS_ADD", add);
  },

  isUpdate({ commit }: any, data: Todos) {
    commit("IS_UPDATE", data);
  },
};

const mutations = {
  GET_TODOS: (state: any, data: Todos) => {
    state.todo = data;
  },

  ADD_TODO: (state: any, data: Todos) => {
    state.todo.push(data);
  },

  DELETE_TODO: (state: any, id: string) => {
    state.todo = state.todo.filter((e: Todos) => e.id !== id);
  },

  UPDATE_TODO: (state: any, data: Todos) => {
    state.todo = data;
  },

  SEARCH_TODO: (state: any, value: Todos) => {
    const res = state.tmpTodo.filter((item: Todos) => {
      if (value.title) {
        return item.title.toLowerCase().includes(value.title.toLowerCase());
      }
    });

    state.todo = res;
  },

  IS_ADD: (state: any, add: boolean) => {
    state.isAdd = add;
  },
  IS_UPDATE: (state: any, data: Todos) => {
    state.isUpdateTodo = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  localAPI,
};
