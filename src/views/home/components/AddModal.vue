<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Add New Todo</ion-title>
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
import { defineComponent, ref } from "vue";
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

    const data = ref({
      title: "",
      isCompleted: false,
    });
    const cancel = () => {
      return modalController.dismiss(null, "cancel");
    };
    const confirm = () => {
      if (data.value.title == "") {
        alert("Title is required");
      } else {
        store.dispatch("todoModule/addTodo", data.value);
        modalController.dismiss(null, "confirm");
      }
    };

    return {
      cancel,
      confirm,
      data,
    };
  },
});
</script>
