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
      {{ isAuth }}
      {{ user }}
    </ion-content>
    <ion-button @click="onSiginOut">Sign Out</ion-button>
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
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { useRouter } from "vue-router";

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
    const router = useRouter();
    computed(() => store.dispatch("authModules/isLogin"));
    const onSiginOut = async () => {
      try {
        await store.dispatch("authModules/signOutUser");
        router.replace("/");
      } catch (error: any) {
        console.log(error.message);
      }
    };
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     const users = user;
    //     console.log(users);
    //     store.commit("authModules/SET_USER", user);
    //   } else {
    //     // User is signed out
    //     // ...
    //   }
    // });

    return {
      onSiginOut,
      user: computed(() => store.state.authModules.user),
      isAuth: computed(() => store.state.authModules.isAuth),
    };
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
