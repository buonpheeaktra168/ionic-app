<template>
  <ion-card>
    <ion-card-header>
      <ion-item>
        <ion-checkbox
          slot="start"
          :id="id"
          :checked="value"
          @ion-change="$emit('onChange')"
        ></ion-checkbox>
        <ion-label :class="value ? 'hr-lines' : null">{{
          cardTitle
        }}</ion-label>
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
    value: Boolean,
    id: Number,
  },
  data() {
    return {
      trashBinOutline,
      pencilOutline,
    };
  },
};
</script>

<style scoped>
.hr-lines {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
