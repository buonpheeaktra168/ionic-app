import { Todos } from "./todo.interface";

const state = {
  todo: [] as Todos[],
  isLoading: false,
  isAddTodo: false,
  isUpdateTodo: {} as Todos,
};

const getters = {
  getTodos: (state: any) => state.todo,
  getLoading: (state: any) => state.isLoading,
  isAdd: (state: any) => state.isAdd,
  getUpdate: (state: any) => state.isUpdateTodo,
};

const actions = {
  async fetchTodos({ commit }: any) {
    try {
      state.isLoading = true;
      await fetch("http://localhost:8081/todos")
        .then((res) => res.json())
        .then((data: Todos) => commit("GET_TODOS", data));
      state.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  },

  async addTodo({ commit }: any, data: Todos) {
    const id = Math.floor(Math.random() * 11);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: data.title,
        isCompleted: data.isCompleted,
      }),
    };
    try {
      await fetch("http://localhost:8081/todos", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          commit("ADD_TODO", data);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  },

  async deleteTodo({ commit }: any, id: number) {
    console.log(id);
    try {
      await fetch(`http://localhost:8081/todos/${id}`, {
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
      await fetch(`http://localhost:8081/todos/${data.id}`, requestOptions)
        .then((res) => res.json())
        .then((data) => commit("UPDATE_TODO", data));
    } catch (error) {
      console.log(error);
    }
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

  DELETE_TODO: (state: any, id: number) => {
    state.todo = state.todo.filter((e: Todos) => e.id !== id);
  },

  UPDATE_TODO: (state: any, data: Todos) => {
    state.todo = data;
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
};
