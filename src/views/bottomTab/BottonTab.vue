<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="book" href="/book">
          <ion-icon :icon="book" />
          <ion-label>Books</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="video" href="/video">
          <ion-icon :icon="playCircle" />
          <ion-label>Videos</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="account" href="/account">
          <ion-icon :icon="person" />
          <ion-label>Account</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/vue";

import { playCircle, search, home, person, book } from "ionicons/icons";

export default {
  components: {
    IonPage,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
  },
  data() {
    return {
      playCircle,
      search,
      home,
      person,
      book,
    };
  },
};
</script>
