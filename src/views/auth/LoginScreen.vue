<template>
  <container-screen>
    <header-custom title="Login" />
    <ion-content class="content">
      <ion-avatar class="profile">
        <img :src="profile" />
      </ion-avatar>
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
      <!-- <p v-if="errMsg">{{ errMsg }}</p> -->
    </ion-content>
    <ion-button @click="onLogin" style="width: 100vw; height: 40px"
      >SignIn</ion-button
    >
    <ion-button @click="signUpWithEmail" style="width: 100vw; height: 40px"
      >SigUp with email</ion-button
    >
    <ion-button @click="signUpGoogle" style="width: 100vw; height: 40px"
      >SiginIn Google</ion-button
    >
  </container-screen>
</template>

<script lang="ts">
// import { useRouter } from "vue-router";
import { HeaderCustom,ContainerScreen } from "@/shared/components/base/app-components";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  IonList,
  IonInput,
  IonContent,
  IonItem,
  IonButton,
  useIonRouter,
  IonAvatar,
} from "@ionic/vue";
import type { USERS } from "@/shared/store/modules/auth/user.interface";
import { ref } from "vue";
import { profile } from "@/shared/components/base/icons/Icons";
export default {
  components: {
    IonList,
    IonInput,
    IonContent,
    IonItem,
    IonButton,
    HeaderCustom,
    ContainerScreen,
    IonAvatar,
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
            alert(errMsg.value);
            break;
          case "auth/user-not-found":
            errMsg.value = "No account with that email was found";
            alert(errMsg.value);
            break;
          case "auth/wrong-password":
            errMsg.value = "Incorrect password";
            alert(errMsg.value);
            break;
          default:
            errMsg.value = "Email or password was incorrect";
            alert(errMsg.value);
            break;
        }
      }
    };

    const signUpWithEmail = () => {
      ionRouter.navigate("/register");
    };
    const signUpGoogle = () => {
      store.dispatch("authModules/signInWithGoogle");
    };
    return {
      user,
      errMsg,
      profile,
      onLogin,
      signUpWithEmail,
      signUpGoogle,
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
