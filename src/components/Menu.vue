<template>
  <aside class="options">
    <div class="content">
      <div class="field has-addons is-pulled-left">
        <div class="control">
          <input class="input" type="text" v-model="search" v-on:keyup.enter="filter" placeholder="Find a project">
        </div>
        <div class="control">
          <a class="button is-info" @click="filter">Search</a>
        </div>
      </div>
      <a href="#" class="button is outlined is-pulled-right" @click="logout">Log out</a>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Menu',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    },
    filter() {
      this.$store.dispatch('post/filter', this.search)
    }
  }
}
</script>

<style lang='scss' scoped>
.options {
  border-bottom: #F2F2F2 thin solid;
  border-top: #F2F2F2 thin solid;
  display: inline-block;
  height: 56px;
  width: 100%;

  .content {
    display: inline-block;
    margin: 10px 0;
  } 

  .field {
    margin-right: 10px;
  }
}
</style>

