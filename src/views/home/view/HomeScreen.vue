<template>
  <ion-page>
    <HeaderCustom title="Home" :right-icon="search" />
    <ion-content color="medium" :force-overscroll="true">
      <TodoCard
        v-for="(todo, index) in todos"
        :key="index"
        :id="todo.id"
        :card-title="todo.title"
        :value="todo.isCompleted"
        @onDelete="presentActionSheet(todo.id)"
        @onEdit="handleEdit(todo)"
        @onChange="handleTick(todo)"
      />
      <PlusButton @onAdd="onAdd" />
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import {
  IonPage,
  IonContent,
  modalController,
  actionSheetController,
  loadingController,
} from "@ionic/vue";
import { search } from "ionicons/icons";
import { HeaderCustom } from "@/components";
import { PlusButton, TodoCard, AddModal } from "@/views/home/components";
import type { Todos } from "@/store/modules/todoModule/todo.interface";

export default {
  components: {
    IonPage,
    IonContent,
    HeaderCustom,
    TodoCard,
    PlusButton,
  },
  data() {
    return {
      search,
    };
  },

  setup() {
    const store = useStore();
    const isChange = ref(false);
    onMounted(() => store.dispatch("todoModule/fetchTodos"));
    const todos = computed(() => store.getters["todoModule/getTodos"]);
    const isLoading = computed(() => store.getters["todoModule/isLoading"]);

    const onAdd = async () => {
      store.dispatch("todoModule/isAdd", true);
      const modal = await modalController.create({
        component: AddModal,
      });
      modal.present();
      
    };

    const onRefresh = () => {
      store.dispatch("todoModule/fetchTodos");
    };

    const presentActionSheet = async (id: number) => {
      const actionSheet = await actionSheetController.create({
        subHeader: "",
        buttons: [
          {
            text: "Delete",
            role: "destructive",
            handler: () => {
              store.dispatch("todoModule/deleteTodo", id);
            },
          },
          {
            text: "Cancel",
            role: "cancel",
          },
        ],
      });

      await actionSheet.present();
    };

    const handleEdit = async (data: Todos) => {
      store.dispatch("todoModule/isUpdate", data);
      const modal = await modalController.create({
        component: AddModal,
      });
      modal.present();
    };

    const handleTick = (todo: Todos) => {
      todo.isCompleted = !todo.isCompleted;
      store.dispatch("todoModule/updateTodo", todo);
    };

    return {
      store,
      todos,
      onAdd,
      onRefresh,
      isLoading,
      presentActionSheet,
      handleEdit,
      isChange,
      handleTick,
    };
  },
};
</script>
