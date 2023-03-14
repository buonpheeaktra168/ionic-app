<template>
  <IonPage>
    <slot />
  </IonPage>
</template>

<script lang="ts">
import { IonPage } from "@ionic/vue";
export default {
  components: { IonPage },
};
</script>

<style scoped>
.app-container {
  display: flex;
  padding: 2px;
}
</style>
