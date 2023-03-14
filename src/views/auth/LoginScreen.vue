<template>
  <container-screen>
    <header-custom title="Login" />
    <ion-content class="content">
      <ion-list>
        <ion-avatar class="profile">
          <img :src="profile" />
        </ion-avatar>
        <input-text placeholder="Email" v-model:value="user.email" />
        <input-text
          placeholder="Password"
          type="password"
          v-model:value="user.password"
        />
      </ion-list>
      
    </ion-content>
    <ion-buttons slot="end">
        <IonButton @click="signUpGoogle">
          <ion-icon :icon="logoGoogle" size="medium"/>
        </IonButton>
      </ion-buttons>
    <ion-button @click="onLogin" style="width: 100vw; height: 40px"
      >SignIn</ion-button
    >
    <ion-button @click="signUpWithEmail" style="width: 100vw; height: 40px"
      >SigUp with email</ion-button
    >
    <!-- <ion-button @click="signUpGoogle" style="width: 100vw; height: 40px"
      >SiginIn Google</ion-button
    > -->
  </container-screen>
</template>

<script lang="ts">
// import { useRouter } from "vue-router";
import {
  HeaderCustom,
  ContainerScreen,
} from "@/shared/components/base/app-components";
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
  IonButtons,
  IonIcon
} from "@ionic/vue";
import type { USERS } from "@/shared/store/modules/auth/user.interface";
import { ref } from "vue";
import { profile } from "@/shared/components/base/icons/Icons";
import { InputText } from "@/shared/components/base/app-components";
import { logoGoogle } from "ionicons/icons";
export default {
  components: {
    IonList,
    IonContent,
    IonButton,
    HeaderCustom,
    ContainerScreen,
    IonAvatar,
    InputText,
    IonButtons,
    IonIcon
  },
  data() {
    return {
      logoGoogle,
    };
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
      router.replace("/home");
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
  flex-direction: column;
}
</style>
