<template>
  <ion-page>
    <HeaderCustom title="Home" :right-icon="search" search-id="search-modal" />
    <ion-content color="medium" :force-overscroll="true">
      <TodoCard
        v-for="(todo, index) in todos"
        :key="index"
        :id="todo.id"
        :card-title="todo.title"
        :value="todo.isCompleted"
        :icon-delete="trashBinOutline"
        :icon-edit="pencilOutline"
        @onDelete="presentActionSheet(todo.id)"
        @onEdit="handleEdit(todo)"
        @onChange="handleTick(todo)"
      />
      <SheetModal trigger="search-modal" />
      <PlusButton
        horizontal="end"
        vertical="bottom"
        @onClick="onAdd"
        :icon="add"
      />
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { computed, onMounted, ref, defineComponent, watchEffect } from "vue";
import { trashBinOutline, pencilOutline, search, add } from "ionicons/icons";
import {
  IonPage,
  IonContent,
  modalController,
  actionSheetController,
} from "@ionic/vue";
import { HeaderCustom } from "@/components";
import {
  PlusButton,
  TodoCard,
  AddModal,
  SheetModal,
  TickMarkButton
} from "@/views/home/components";
import type { Todos } from "@/store/modules/todoModule/todo.interface";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    HeaderCustom,
    TodoCard,
    PlusButton,
    SheetModal,
    // TickMarkButton
  },
  data() {
    return {
      search,
      trashBinOutline,
      pencilOutline,
      add,
    };
  },

  setup() {
    const store = useStore();
    const isChange = ref(false);
    onMounted(() => store.dispatch("todoModule/fetchTodos"));
    const todos = computed(() => store.getters["todoModule/getTodos"]);
    const isLoading = computed(() => store.getters["todoModule/isLoading"]);

    console.log(todos.value);

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
      // store.dispatch("todoModule/updateTodo", todo);
    };

    watchEffect(() => {
      if (
        todos.value.isCompleted !== todos.value.isCompleted ||
        todos.value.title !== todos.value.title
      ) {
        computed(() => store.getters["todoModule/getTodos"]);
        onMounted(() => store.dispatch("todoModule/fetchTodos"));
      }
    });

    return {
      store,
      todos,
      isLoading,
      isChange,
      onAdd,
      onRefresh,
      presentActionSheet,
      handleEdit,
      handleTick,
     };
  },
});
</script>
