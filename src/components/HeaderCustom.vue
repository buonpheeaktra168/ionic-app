<template>
  <IonHeader>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button :defaultHref="defaultBack"></ion-back-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
      <slot />
    </ion-toolbar>
  </IonHeader>
</template>

<script lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/vue";
export default {
  components: { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle },

  props: {
    title: String,
    defaultBack: String,
  },
};
</script>
