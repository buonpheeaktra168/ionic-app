<template>
  <ion-card v-if="title">
    <ion-card-title>{{ title }}</ion-card-title>
    <ion-card-subtitle v-if="subtitle">{{ subtitle }}</ion-card-subtitle>
    <ion-card-content v-if="description">
      {{ description }}
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    subtitle: String,
    description: String,
  },
  components: {
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
  },
});
</script>

<style scoped>
ion-card {
  display: flex;
  width: 150px;
  height: 180px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  --background: #000;
  --color: #9efff0;
}

ion-card-title {
  --color: #52ffe4;
  font-size: 20px;
}

ion-card-subtitle {
  --color: #d1fff8;
  font-size: 12px;
}

ion-card-content {
  font-size: 12px;
}

/* iOS places the subtitle above the title */
ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}
</style>
