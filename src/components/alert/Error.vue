<template>
    <div id='alert-error' >
        <md-dialog-alert
            :md-active.sync="error.id"
            md-title="Error!"
            :md-content="error.message" />
    </div>
</template>

<script>
export default {
  name: 'ErrorAlert',
  props: {
    error: {default: {}}
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
