<template>
  <q-layout view="hHh LpR fFf">

    <q-header bordered class="bg-dark text-white" height-hint="98">
      <Menu></Menu>
      <q-separator/>
      <MainToolbar></MainToolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" :width="leftWidth" behavior="desktop" bordered>
        <EntityExplorer></EntityExplorer>
        <ResizeWidget @resized="leftPanelResize" :value="leftWidth"></ResizeWidget>
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" :width="rightWidth" behavior="desktop" bordered>
      <ResizeWidget @resized="rightPanelResize" :value="rightWidth" position="Left"></ResizeWidget>
    </q-drawer>

    <q-page-container>
      <ModeTab @ratioChanged="handlePreviewRatioChange" @modeChanged="handleModeViewChange"></ModeTab>
      <ModeView :mode="mode" :previewRatio="previewRatio"></ModeView>
    </q-page-container>

    <q-footer bordered class="bg-dark text-white">
      <StatusBar></StatusBar>
    </q-footer>

  </q-layout>
</template>

<script>
import Menu from './components/Menu.vue';
import EntityExplorer from './components/EntityExplorer.vue';
import StatusBar from './components/StatusBar.vue';
import ModeTab from './components/ModeTab.vue';
import MainToolbar from './components/MainToolbar.vue';
import ResizeWidget from './components/ResizeWidget.vue';
import ModeView from './components/ModeView.vue';

export default {
  name: 'LayoutDefault',

  components: {
    Menu,
    EntityExplorer,
    StatusBar,
    ModeTab,
    MainToolbar,
    ResizeWidget,
    ModeView,
  },

  created() {
    this.$q.dark.set(true);
  },

  data () {
    return {
      leftWidth: 300,
      rightWidth: 300,
      left: false,
      right: false,
      previewRatio: "16:9",
      mode : "scene-editor",
    }
  },

  methods: {
    leftPanelResize(value) {
      this.leftWidth = value;
    },
    rightPanelResize(value) {
      this.rightWidth = value;
    },
    handlePreviewRatioChange(value) {
      this.previewRatio = value;
    },
    handleModeViewChange(value) {
      this.mode = value;
    }
  },
}
</script>