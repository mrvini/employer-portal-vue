<template>
    <div id='alert-error' >
        <md-dialog-alert
            :md-active.sync="isActive"
            md-title="Application Error!"
            :md-content="error.message" />
    </div>
</template>

<script>
export default {
  name: 'ErrorAlert',
  props: {
    error: {default: {}}
  },
  data () {
    return {
      isActive: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
