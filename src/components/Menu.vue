<template>
    <aside class="options contents">
      <a href="#" class="button is outlined is-pulled-right" @click="logout">Log out</a>
    </aside>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Menu',
  computed: {
    ...mapState("user", ["user"]),
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style lang='scss' scoped>
.options {
  border-bottom: #F2F2F2 thin solid;
  border-top: #F2F2F2 thin solid;
  display: inline-block;
  padding: 10px 50px;
  width: 100%;
}
</style>

