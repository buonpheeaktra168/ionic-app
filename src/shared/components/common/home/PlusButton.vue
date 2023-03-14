<template>
  <ion-fab slot="fixed">
    <ion-fab-button size="small">
      <ion-button @click="$emit('onClick')">
        <ion-icon :icon="icon"></ion-icon>
      </ion-button>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
import { IonFab, IonFabButton, IonIcon, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { IonFab, IonFabButton, IonIcon, IonButton },
  props: {
    icon: String,
  },
});
</script>
