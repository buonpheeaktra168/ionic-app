<template>
  <container-screen>
    <header-custom title="Login" />
    <ion-content class="content">
      <ion-list>
        <ion-item>
          <ion-input placeholder="Email" v-model="user.email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            placeholder="password"
            type="password"
            v-model="user.password"
          ></ion-input>
        </ion-item>
      </ion-list>
      <p v-if="errMsg">{{ errMsg }}</p>
    </ion-content>
    <ion-button @click="onLogin" style="width: 100vw; height: 40px"
      >SignIn</ion-button
    >
    <ion-button @click="signUpWithEmail" style="width: 100vw; height: 40px"
      >SigUp with email</ion-button
    >
  </container-screen>
</template>

<script lang="ts">
// import { useRouter } from "vue-router";
import HeaderCustom from "@/components/HeaderCustom.vue";
import ContainerScreen from "@/components/ContainerScreen.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  IonList,
  IonInput,
  IonContent,
  IonItem,
  IonButton,
  useIonRouter,
} from "@ionic/vue";
import { Toast } from "@capacitor/toast";
import { USERS } from "./auth.interface";
import { ref } from "vue";
export default {
  components: {
    IonList,
    IonInput,
    IonContent,
    IonItem,
    IonButton,
    HeaderCustom,
    ContainerScreen,
  },
  setup() {
    const ionRouter = useIonRouter();
    const router = useRouter();
    const store = useStore();

    const user = ref<USERS>({
      email: "",
      password: "",
    });
    const errMsg = ref("");

    const onLogin = async () => {
      try {
        await store.dispatch("authModules/signIn", user.value);
        router.replace("/home");
      } catch (error: any) {
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Invalid email";
            break;
          case "auth/user-not-found":
            errMsg.value = "No account with that email was found";
            break;
          case "auth/wrong-password":
            errMsg.value = "Incorrect password";
            break;
          default:
            errMsg.value = "Email or password was incorrect";
            break;
        }
      }
    };

    const signUpWithEmail = () => {
      ionRouter.navigate("/register");
    };
    return {
      user,
      errMsg,
      onLogin,
      signUpWithEmail,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-behavior: none;
}
</style>
