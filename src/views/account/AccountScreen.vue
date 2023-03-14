<template>
  <container-screen>
    <header-custom
      v-if="disabled == true"
      title="My Account"
      :right-icon="createOutline"
      :onclick="onEditUser"
    />
    <header-custom
      v-else
      title="My Account"
      :right-icon="checkmarkOutline"
      :onclick="onUpdate"
    />

    <ion-content :scroll-events="false">
      <ion-list class="content" v-if="isAuth">
        <ion-avatar class="profile">
          <img :src="users.photoURL ? users.photoURL : profile" />
        </ion-avatar>
        <ion-buttons slot="end">
          <IonButton @click="presentActionSheet">
            <ion-icon :icon="cameraOutline" size="medium" />
          </IonButton>
        </ion-buttons>
        <ion-item>
          <ion-input
            placeholder="Name"
            :disabled="disabled"
            v-model="userInfo.displayName"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            placeholder="Email"
            :disabled="disabled"
            v-model="users.email"
          ></ion-input>
        </ion-item>
      </ion-list>
    </ion-content>
    <!-- <ion-button> Change Password</ion-button> -->
    <ion-button @click="onSiginOut">Sign Out</ion-button>
  </container-screen>
</template>

<script lang="ts">
import { createOutline, checkmarkOutline, cameraOutline } from "ionicons/icons";
import {
  IonContent,
  IonIcon,
  IonList,
  IonItem,
  IonInput,
  useIonRouter,
  IonButton,
  IonAvatar,
  IonButtons,
  IonTitle,
  actionSheetController,
  //
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from "@ionic/vue";
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  HeaderCustom,
  ContainerScreen,
  LoadingSpinner,
} from "@/shared/components/base/app-components";
import { updateProfile, User } from "@firebase/auth";
import { auth } from "@/utils/firebase";

// Capacitor Open Camera
import { usePhotoGallery } from "@/shared/components/common/account/usePhotoGallery";
import { profile } from "@/shared/components/base/icons/Icons";

export default {
  components: {
    ContainerScreen,
    HeaderCustom,
    IonContent,
    IonButton,
    IonList,
    IonItem,
    IonInput,
    IonAvatar,
    // IonTitle
    IonButtons,
    IonIcon,
    //
    // IonGrid,
    // IonRow,
    // IonCol,
    // IonImg,
  },
  data() {
    return {
      createOutline,
      checkmarkOutline,
      cameraOutline,
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const disabled = ref(true);
    const users = computed(function () {
      return store.state.authModules.user;
    });
    const userInfo = ref({
      displayName: "",
      photoURL: "https://images.app.goo.gl/n4te2vmu7jMQw7pHA",
    });
    const result = ref("");
    const { takePhoto, photos } = usePhotoGallery();

    watchEffect(() => {
      userInfo.value.displayName = users.value.displayName;
      userInfo.value.photoURL = users.value.photoURL;
    });

    const onSiginOut = async () => {
      try {
        await store.dispatch("authModules/signOutUser");
        router.replace("/");
      } catch (error: any) {
        console.log(error.message);
      }
    };

    const onEditUser = () => {
      disabled.value = false;
      console.log("Edit");
    };

    const onUpdate = async () => {
      await LoadingSpinner.present();
      disabled.value = true;
      updateProfile(auth.currentUser as User, {
        displayName: userInfo.value.displayName,
        photoURL: userInfo.value.photoURL,
      });
      await LoadingSpinner.dismiss();
    };

    const presentActionSheet = async () => {
      const actionSheet = await actionSheetController.create({
        buttons: [
          {
            text: "Take Photo",
            handler: takePhoto,
          },
          {
            text: "Upload Photo",
          },
        ],
      });

      await actionSheet.present();

      const res = await actionSheet.onDidDismiss();
      result.value = JSON.stringify(res, null, 2);
    };

    return {
      onSiginOut,
      onEditUser,
      onUpdate,
      presentActionSheet,
      result,
      userInfo,
      disabled,
      users,
      takePhoto,
      photos,
      profile,
      isAuth: computed(() => store.state.authModules.isAuth),
      // user: computed(() => store.state.authModules.user),
    };
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  width: 120px;
  height: 120px;
  border-radius: 200px;
  overflow: hidden;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
