<template>
  <ion-page>
    <HeaderCustom title="Home" :right-icon="search" />
    <ion-content>
      <TodoCard
        v-for="todo in todos"
        :key="todo.id"
        :card-title="todo.title"
        :is-checked="todo.isCompleted"
        @onDelete="presentActionSheet(todo.id)"
      />
      <PlusButton @onAdd="onAdd" />
    </ion-content>
    <!-- <ActionSheet @onClick="presentActionSheet" /> -->
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
  IonButton,
actionSheetController,
} from "@ionic/vue";
import { search } from "ionicons/icons";
import { HeaderCustom } from "@/components";
import {
  PlusButton,
  TodoCard,
  AddModal,
  ActionSheet,
} from "@/views/home/components";

export default {
  components: {
    IonPage,
    IonContent,
    HeaderCustom,
    TodoCard,
    PlusButton,
    // ActionSheet,
    // IonButton,
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

    const presentActionSheet = async (id: number) => {

        const actionSheet = await actionSheetController.create({
          subHeader: '',
          buttons: [
            {
              text: 'Delete',
              role: 'destructive',
              data: {
                action: 'delete',
              },
            },
            {
              text: 'Cancel',
              role: 'cancel',
              data: {
                action: 'cancel',
              },
            },
          ],
        });
        actionSheet.buttons.map((e:any) => {
          if(e.data.action ==='delete') {
            handleDeleteTodo(id);
          } 
        })
        await actionSheet.present();

        const res = await actionSheet.onDidDismiss();
        
      };

    return {
      store,
      todos,
      onAdd,
      onRefresh,
      isLoading,
      handleDeleteTodo,
      presentActionSheet
    };
  },
};
</script>
