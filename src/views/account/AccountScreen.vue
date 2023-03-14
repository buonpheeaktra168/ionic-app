<template>
  <container-screen>
    <header-custom
      class="header-screen"
      v-if="disabled == true"
      title="Account"
      :right-icon="createOutline"
      :onclick="onEditUser"
    />
    <header-custom
      class="header-screen"
      v-else
      title="Account"
      :right-icon="checkmarkOutline"
      :onclick="onUpdate"
    />

    <ion-content :scroll-events="false">
      <ion-list class="content" v-if="isAuth">
        <div class="profile-container">
          <div>
          <ion-avatar class="profile">
            <img :src="users.photoURL ? users.photoURL : profile" />
          </ion-avatar>
          <ion-buttons slot="end" v-if="disabled == false">
            <IonButton class="camera-icon" @click="presentActionSheet">
              <ion-icon :icon="cameraOutline" size="medium" />
            </IonButton>
          </ion-buttons>
        </div>
        <div>
          <p>Email: {{ users.email }}</p>
        </div>
        </div>
        <InputText
          placeholder="Name"
          v-model:value="userInfo.displayName"
          :disabled="disabled"
        />
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
  InputText,
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
    // IonItem,
    // IonInput,
    IonAvatar,
    // IonTitle
    IonButtons,
    IonIcon,
    //
    // IonGrid,
    // IonRow,
    // IonCol,
    // IonImg,
    InputText,
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
      photoURL: "",
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
.header-screen {
  display: flex;
  background-color: rgb(43, 142, 255);
  color: blueviolet;
  overflow: hidden;
}
.profile {
  display: flex;
  width: 60px;
  height: 60px;
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.profile-container {
  display: flex;
  width: 95%;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  margin-top: 12px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.camera-icon {
  position: absolute;
  margin-left: 20px;
  margin-bottom: 8px;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
