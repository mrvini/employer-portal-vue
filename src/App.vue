<template>
  <div id="app">
      <div class="page-container">
        <md-app md-waterfall md-mode="overlap">
          <md-app-toolbar class="md-primary md-large">
            <div class="md-toolbar-row">
              <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                <md-icon>menu</md-icon>
              </md-button>

              <span class="md-title">XYZ Employer Portal</span>
            </div>
          </md-app-toolbar>

          <md-app-drawer :md-active.sync="menuVisible">
            <md-toolbar class="md-transparent" md-elevation="0">
              Navigation
            </md-toolbar>

            <md-list>
              <md-list-item class='navigationLinks' :to="{ path: '/dashboard' }">
                <md-icon>people</md-icon>
                <span class="md-list-item-text"  >Dashboard</span>
              </md-list-item>
              <md-list-item class='navigationLinks' :to="{ path: '/employees' }">
                <md-icon>people</md-icon>
                <span class="md-list-item-text">Empoyee Management</span>
              </md-list-item>
            </md-list>
          </md-app-drawer>

          <md-app-content>

              <router-view/>
          </md-app-content>
        </md-app>
      </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    menuVisible: false
  })
}
</script>

<style >
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.md-app {
  border: 1px solid rgba(#000, .12);
}

 // Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.md-app-content {
  min-height:calc(100vh - 20vh);
}
.navigationLinks {
    cursor: pointer;
}
</style>
