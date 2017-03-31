<template>
  <div class="application">
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Root'
}
</script>

<style lang="scss">
  @import 'app'
</style>
