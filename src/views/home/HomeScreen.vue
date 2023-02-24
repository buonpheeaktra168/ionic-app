<template>
  <ion-page>
    <HeaderCustom title="Home" :right-icon="search"  />
    <ion-content>
      <div class="example-content">Hi I am HomeScreen</div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import HeaderCustom from "@/components/HeaderCustom.vue";
import { search } from "ionicons/icons";

import {
  IonPage,
  // IonTitle,
  // IonHeader,
  // IonToolbar,
  IonContent,
} from "@ionic/vue";
export default {
  components: {
    // IonTitle,
    IonPage,
    // IonHeader,
    // IonToolbar,
    IonContent,
    HeaderCustom,
  },
  data() {
    return {
      search,
    };
  },
};
</script>
