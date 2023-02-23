<template>
  <ContainerScreen>
    <HeaderCustom title="Home" />
  </ContainerScreen>
</template>

<script lang="ts">

import HeaderCustom from "@/components/HeaderCustom.vue";
import ContainerScreen from "@/components/ContainerScreen.vue";
export default {
  name: "LoginScreen",
  components: {

    ContainerScreen,
    HeaderCustom
  },
};
</script>
