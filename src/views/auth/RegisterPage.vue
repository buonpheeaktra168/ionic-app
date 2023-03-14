<template>
  <ContainerScreen>
    <HeaderCustom default-back="/login" title="Sign Up" />
    <ion-content class="content">
      <ion-list>
        <ion-item>
          <ion-input placeholder="email" v-model="user.email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            placeholder="password"
            type="password"
            v-model="user.password"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input placeholder="name" v-model="user.displayName"></ion-input>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-button @click="signUp" style="width: 100vw; height: 40px"
      >Sign Up</ion-button
    >
    
  </ContainerScreen>
</template>

<script lang="ts">
import { ref } from "vue";
import {
  IonContent,
  IonButton,
  IonList,
  IonInput,
  IonItem,
  useIonRouter,
} from "@ionic/vue";
import type { USERS } from "@/shared/store/modules/auth/user.interface";
import { HeaderCustom, ContainerScreen } from "@/shared/components/base/app-components";
import { useStore } from "vuex";

export default {
  components: {
    ContainerScreen,
    HeaderCustom,
    IonContent,
    IonButton,
    IonList,
    IonInput,
    IonItem,
  },
  setup() {
    const store = useStore();
    const ionRouter = useIonRouter();
    const user = ref<USERS>({
      displayName: "",
      email: "",
      password: "",
    });
    const errMsg = ref();

    const signUp = async () => {
      if (user.value.email == "" && user.value.password == "") {
        return alert("Empty email or password");
      } else {
        try {
          await store.dispatch("authModules/register", user.value);
          ionRouter.replace("/");
        } catch (error: any) {
          switch (error.code) {
            case "auth/email-already-exists":
              errMsg.value = "Email is already existed";
              break;
            default:
              errMsg.value = "Email or password was incorrect";
              break;
          }
        }
      }
    };

    

    return { user, errMsg, signUp };
  },
};
</script>

<style>
.error-color {
  color: red;
}
</style>
