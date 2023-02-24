<template>
  <container-screen>
    <header-custom title="Login" />
    <ion-content class="content">
      <ion-list>
        <ion-item>
          <ion-input placeholder="username" v-model="form.username"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            placeholder="password"
            type="password"
            v-model="form.password"
          ></ion-input>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-button @click="onLogin" style="width: 100vw; height: 40px"
      >Login</ion-button
    >
  </container-screen>
</template>

<script lang="ts">
// import { useRouter } from "vue-router";
import HeaderCustom from "@/components/HeaderCustom.vue";
import ContainerScreen from "@/components/ContainerScreen.vue";
import { useStore } from "vuex";
import {
  IonList,
  IonInput,
  IonContent,
  IonItem,
  IonButton,
  useIonRouter,
} from "@ionic/vue";
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
    const store = useStore();

    const form = {
      username: "",
      password: "",
    };

    const onLogin = () => {
      if (form.username == "admin" && form.password == "password") {
        ionRouter.replace({ path: "/home" });
        store.dispatch("authModules/login", true);
      } else {
        alert("incorrect username or password!");
      }
    };
    return {
      form,
      onLogin,
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
