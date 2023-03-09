<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :scroll-events="false">
      <div class="profile">
        <ion-img
          src="https://ionic-docs-demo-v6.vercel.app/assets/madison.jpg"
          alt="The Wisconsin State Capitol building in Madison, WI at night"
        ></ion-img>
      </div>
      <div class="example-content">Account Screen</div>
    </ion-content>
    <ion-button>Sign Out</ion-button>
  </ion-page>
</template>

<script lang="ts">
import { IonButton, IonImg } from "@ionic/vue";
import {
  IonTitle,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
} from "@ionic/vue";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    IonTitle,
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonImg,
  },
  setup() {
    const store = useStore();

    computed(() => store.dispatch("authModules/fetchUser"));
    const userInfo = computed(() => store.getters["authModules/user"]);
    console.log(userInfo.value)
    return { userInfo };
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  width: 120px;
  height: 120px;
  border-radius: 60px;
  overflow: hidden;
}
</style>
