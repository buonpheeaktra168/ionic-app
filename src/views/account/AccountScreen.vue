<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content  :scroll-events="false">
      <div class="example-content">Account Screen</div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTitle,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
} from "@ionic/vue";
export default {
  components: {
    IonTitle,
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
  },
};
</script>
