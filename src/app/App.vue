<template>
  <b-container id="um-containerp-top" fluid>
    <router-view></router-view>
   
  </b-container>
</template>

<script>

import Footer from "./shared/components/footer/Footer";

export default {
  name: "app",
  components: {  Footer }
};
</script>