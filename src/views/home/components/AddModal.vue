<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>{{
        isAdd == true ? "Add New Todo" : "Update Todo"
      }}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-label position="stacked">Todo title</ion-label>
      <ion-input v-model="data.title" placeholder="Your todo"></ion-input>
    </ion-item>
  </ion-content>
</template>

<script lang="ts">
import { Todos } from "@/store/modules/todoModule/todo.interface";
import { loadingController } from "@ionic/core";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  modalController,
} from "@ionic/vue";
import { defineComponent, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "AddModal",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
  },

  setup() {
    const store = useStore();
    const isAdd = computed(() => store.getters["todoModule/isAdd"]);
    const isUpdate = computed(() => store.getters["todoModule/getUpdate"]);
    const isLoading = computed(() => store.getters["todoModule/getLoadong"]);

    const data = ref<Todos>({
      id: "",
      title: "",
      isCompleted: false,
    });
    watchEffect(() => {
      data.value.id = isUpdate.value.id;
      data.value.title = isUpdate.value.title;
      data.value.isCompleted = isUpdate.value.isCompleted;
    });
    const cancel = () => {
      return modalController.dismiss(null, "cancel");
    };
    const confirm = () => {
      if (data.value.title == "") {
        alert("Title is required");
      } else {
        if (isAdd.value == true) {
          store.dispatch("todoModule/addTodo", data.value);
          store.dispatch("todoModule/isAdd", false);
          modalController.dismiss(null, "confirm");
        } else {
          console.log("Update");
          store.dispatch("todoModule/updateTodo", data.value);
          modalController.dismiss(null, "confirm");
          store.dispatch("todoModule/fetchTodos");
        }
      }
    };

    return {
      cancel,
      confirm,
      data,
      isAdd,
    };
  },
});
</script>
