import { Todos } from "./todo.interface";

const state = {
  todo: [] as Todos[],
  isLoading: false,
};

const getters = {
  getTodos: (state: any) => state.todo,
  isLoading: (state: any) => state.isLoading,
};

const actions = {
  async fetchTodos({ commit }: any) {
    try {
      state.isLoading = true;
      await fetch("http://localhost:3000/todos")
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
      await fetch("http://localhost:3000/todos", requestOptions)
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
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      }).then(() => commit("DELETE_TODO", id));
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  GET_TODOS: (state: any, data: Todos) => {
    state.todo = data;
  },

  ADD_TODO: (state: any, data: Todos) => {
    state.todo.push(data);
    console.log(data);
  },

  DELETE_TODO: (state: any, id: number) => {
    state.todo = state.todo.filter((e: Todos) => e.id !== id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
