<template>
  <ion-page>
    <HeaderCustom title="Home" :right-icon="search" search-id="search-modal" />
    <ion-content color="medium" :force-overscroll="true">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
        <!-- <ion-refresher-content></ion-refresher-content> -->
      </ion-refresher>
      <!-- <div class="card">
        <CardView
          :title="counter.counterCompleted.toString()"
          subtitle="Completed"
        />
        <CardView
          :title="counter.counterIncompleted.toString()"
          subtitle="InCompleted"
        />
      </div> -->
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
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { HeaderCustom } from "@/components";
import {
  PlusButton,
  TodoCard,
  AddModal,
  SheetModal,
  CardView,
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
    // CardView,
    IonRefresher,
    // IonRefresherContent,
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
    store.dispatch("todoModule/fetchTodos").then(() => countCompleted());
    const todos = computed(() => store.getters["todoModule/getTodos"]);
    const isLoading = computed(() => store.getters["todoModule/isLoading"]);
    const user = computed(() => store.getters["authModules/user"]);
    console.log(user.value);
    // console.log(isLoading.value);

    const counter = ref({
      counterCompleted: 0,
      counterIncompleted: 0,
    });
    const countCompleted = () => {
      todos.value.forEach((element: Todos) => {
        if (element.isCompleted == true) {
          return counter.value.counterCompleted++;
        } else if (element.isCompleted == false) {
          return counter.value.counterIncompleted++;
        }
      });
    };

    const handleRefresh = () => {
      setTimeout(() => {
        store.dispatch("todoModule/fetchTodos").then(() => countCompleted());
      }, 2000);
    };

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

    const presentActionSheet = async (id: string) => {
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

    watchEffect(() => {
      if (
        todos.value.isCompleted !== todos.value.isCompleted ||
        todos.value.title !== todos.value.title
      ) {
        // computed(() => store.getters["todoModule/getTodos"]);
        store.getters["todoModule/getTodos"];
        onMounted(() => store.dispatch("todoModule/fetchTodos"));
      }
      countCompleted;
    });

    return {
      store,
      todos,
      isLoading,
      isChange,
      counter,
      countCompleted,
      onAdd,
      onRefresh,
      presentActionSheet,
      handleEdit,
      handleTick,
      handleRefresh,
    };
  },
});
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
}
</style>
