<template>
  <ion-fab slot="fixed" horizontal="end" vertical="bottom">
    <ion-fab-button size="small">
      <ion-button @click="$emit('onAdd')">
        <ion-icon :icon="add"></ion-icon>
      </ion-button>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
import { IonFab, IonFabButton, IonIcon, IonButton } from "@ionic/vue";
import { add } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  components: { IonFab, IonFabButton, IonIcon, IonButton },
  setup() {
    return { add };
  },
});
</script>
