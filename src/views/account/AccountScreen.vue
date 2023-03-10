<template>
  <container-screen>
    <header-custom title="Profile" :right-icon="createOutline" />
    <ion-content :scroll-events="false">
      <ion-list v-if="isAuth">
        <ion-item>
          <ion-input placeholder="Email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input placeholder="password" type="password"></ion-input>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-button v-if="isAuth" @click="onSiginOut">Sign Out</ion-button>
    <ion-button v-else @click="onSignIn">Sign In</ion-button>
  </container-screen>
</template>

<script lang="ts">
import { IonButton, IonImg } from "@ionic/vue";
import { createOutline } from "ionicons/icons";
import {
  IonTitle,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonList,
  IonItem,
  IonInput,
  useIonRouter,
} from "@ionic/vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { HeaderCustom, ContainerScreen } from "@/components";

export default {
  components: {
    ContainerScreen,
    HeaderCustom,
    IonContent,
    IonButton,
    // IonImg,
    // IonIcon
    IonList,
    IonItem,
    IonInput,
  },
  data() {
    return {
      createOutline,
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const ionRouter = useIonRouter();
    // computed(() => store.dispatch("authModules/isLogin"));
    const onSiginOut = async () => {
      try {
        await store.dispatch("authModules/signOutUser");
        router.replace("/");
      } catch (error: any) {
        console.log(error.message);
      }
    };

    const onSignIn = () => {
      ionRouter.navigate("/login");
    };

    return {
      onSiginOut,
      onSignIn,
      user: computed(() => store.state.authModules.user),
      isAuth: computed(() => store.state.authModules.isAuth),
    };
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  width: 200px;
  height: 200px;
  border-radius: 200px;
  overflow: hidden;
}
</style>
