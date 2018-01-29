<template>
<div id='dashboard' class="dashbaordScreen">
  <md-empty-state
    md-rounded md-icon="people"
    :md-label="action"
    :md-description="description">
    <md-button class="md-primary md-raised" :to="{ path: '/employees' }">{{action}}</md-button>
  </md-empty-state>
</div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      action: 'Manage Employees',
      description: 'Managing Employees, you\'ll be able to find, create, save and delete employee information'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dashbaordScreen {
  padding-top: 10%
}
</style>
