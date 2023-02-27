<template>
  <ion-page>
    <HeaderCustom title="Home" :right-icon="search" />
    <ion-content>
      <TodoCard
        v-for="todo in todos"
        :key="todo.id"
        :card-title="todo.title"
        :is-checked="todo.isCompleted"
        @onDelete="handleDeleteTodo(todo.id)"
      />
      <PlusButton @onAdd="onAdd" />
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import {
  IonPage,
  IonContent,
  modalController,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { search } from "ionicons/icons";
import { HeaderCustom } from "@/components";
import { PlusButton, TodoCard, AddModal } from "@/views/home/components";

export default {
  components: {
    IonPage,
    IonContent,
    HeaderCustom,
    TodoCard,
    PlusButton,
    // IonRefresher,
    // IonRefresherContent,
  },
  data() {
    return {
      search,
    };
  },

  setup() {
    const store = useStore();
    onMounted(() => store.dispatch("todoModule/fetchTodos"));
    const todos = computed(() => store.getters["todoModule/getTodos"]);
    const isLoading = computed(() => store.getters["todoModule/isLoading"]);

    const onAdd = async () => {
      const modal = await modalController.create({
        component: AddModal,
      });
      modal.present();
    };

    const onRefresh = () => {
      store.dispatch("todoModule/fetchTodos");
    };

    const handleDeleteTodo = (id: number) => {
      store.dispatch("todoModule/deleteTodo", id);
    };

    return {
      store,
      todos,
      onAdd,
      onRefresh,
      isLoading,
      handleDeleteTodo,
    };
  },
};
</script>
