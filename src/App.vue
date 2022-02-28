<template>
  <v-app id="app">
    <template>
      <!--	todo: 문제가 있을까?	-->

      <header-app></header-app>
      <lnb-app class="defaultboxShadow"></lnb-app>
      <v-main
        id="mainBox"
        style="background-color: #f5f5f5; overflow: scroll"
        class="drawerOn"
        :class="{ drawerOff: drawerToggle }"
      >
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
      <footer-app></footer-app>
      <progress-loading-bar :loading="loadingStatus"></progress-loading-bar>
    </template>
    <!-- <template>
      <router-view></router-view>
    </template> -->
    <!-- <WebSocket></WebSocket> -->
  </v-app>
</template>

<script>
import HeaderApp from "./components/HeaderApp.vue";
import LnbApp from "./components/LnbApp.vue";
import FooterApp from "./components/FooterApp.vue";
import bus from "./common/bus.js";
import ProgressLoadingBar from "./components/progressLoadingBar.vue";
import WebSocket from "./components/webSocket/WebSocket.vue";

export default {
  components: {
    HeaderApp,
    LnbApp,
    FooterApp,
    ProgressLoadingBar,
    WebSocket,
  },
  data() {
    return {
      loadingStatus: false,
    };
  },
  computed: {
    pu() {
      return this.$store.state.pu;
    },
    drawerToggle() {
      return this.$store.state.drawer;
    },
    loginToken() {
      let result;
      if (this.$store.state.name) {
        result = true;
      } else {
        result = false;
      }
      return result;
    },
    applId() {
      return this.$store.state.ApplicationFormCreationModule.AppFormCreFlag;
    },
  },
  methods: {
    startSpinner() {
      this.loadingStatus = true;
    },
    endSpinner() {
      this.loadingStatus = false;
    },
  },
  created() {
    bus.$on("start:spinner", this.startSpinner);
    bus.$on("end:spinner", this.endSpinner);
  },
  beforeDestroy() {
    bus.$off("start:spinner", this.startSpinner);
    bus.$off("end:spinner", this.endSpinner);
  },
  watch: {
    $route(to, from) {
      console.log(from.path);
      console.log(to.path);
      console.log(this.applId);
    },
  },
};
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/style.css";
@import "./assets/css/common.css";
@import "./assets/css/newCommon.css";
@import "./assets/css/newStyle.css";
@media only screen and (max-width: 800px) {
  #app {
    min-width: 0px;
  }
}
</style>
