<template>
<div class="admin">
  <h1>Unauthorized</h1>
  <p>Try opening the console and typing <span class="code">app.auth.attempt('user@lantern.com', 'password')</span></p>
  <router-link to="/admin" class="button">Admin Access</router-link>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  },
  props: {

  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .admin {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .button {
    margin-top: 10px;
    display: flex;
    font-family: 'Roboto';
    color: #d63c3c;
    outline: none;
    background-color: transparent;
    border-radius: 8px;
    border: none;
    padding: 8px 20px;
    text-transform: uppercase;
    line-height: 20px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      background-color: rgba(0,0,0,0.08);
      cursor: pointer;
    }
  }
  .code {
    font: 12px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    border-radius: 6px;
    background-color: rgba(0,0,0,0.05);
    padding: 3px 6px;
  }
</style>
