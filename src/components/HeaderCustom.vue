<template>
  <IonHeader>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button
          v-if="defaultBack"
          :defaultHref="defaultBack"
        ></ion-back-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons v-if="rightIcon" slot="end">
        <ion-icon :icon="rightIcon" size="large" />
      </ion-buttons>
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
  IonIcon,
} from "@ionic/vue";
export default {
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonIcon,
  },

  props: {
    title: String,
    defaultBack: String,
    rightIcon: String,
    iconSize: String,
  },
};
</script>
