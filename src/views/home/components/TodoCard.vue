<template>
  <ion-card>
    <ion-card-header>
      <ion-item>
        <ion-checkbox slot="start" :checked="isChecked"></ion-checkbox>
        <ion-label>{{ cardTitle }}</ion-label>
        <ion-button color="danger" @click="$emit('onDelete')">
          <ion-icon :icon="trashBinOutline"></ion-icon>
        </ion-button>
        <ion-button @click="$emit('onEdit')">
          <ion-icon :icon="pencilOutline"></ion-icon>
        </ion-button>
      </ion-item>
    </ion-card-header>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCheckbox,
  IonLabel,
  IonItem,
  IonIcon,
  IonButton,
} from "@ionic/vue";
import { trashBinOutline, pencilOutline } from "ionicons/icons";

export default {
  name: "TodoCard",
  components: {
    IonCard,
    IonCardHeader,
    IonCheckbox,
    IonLabel,
    IonItem,
    IonIcon,
    IonButton,
  },
  props: {
    cardTitle: String,
    cardSubtitle: String,
    isChecked: Boolean,
  },
  data() {
    return {
      trashBinOutline,
      pencilOutline,
    };
  },
};
</script>
