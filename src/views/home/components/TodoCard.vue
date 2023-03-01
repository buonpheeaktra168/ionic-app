<template>
  <ion-card>
    <ion-card-header>
      <ion-item>
        <ion-checkbox
          v-if="id"
          slot="start"
          :id="id"
          :checked="value"
          @ion-change="$emit('onChange')"
        ></ion-checkbox>
        <ion-label :class="value ? 'hr-lines' : null">{{
          cardTitle
        }}</ion-label>
        <ion-button v-if="iconDelete" color="danger" @click="$emit('onDelete')">
          <ion-icon :icon="iconDelete"></ion-icon>
        </ion-button>
        <ion-button v-if="iconEdit" @click="$emit('onEdit')">
          <ion-icon :icon="iconEdit"></ion-icon>
        </ion-button>
        <slot />
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
    iconDelete: String,
    iconEdit: String,
  },
};
</script>

<style scoped>
.hr-lines {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
