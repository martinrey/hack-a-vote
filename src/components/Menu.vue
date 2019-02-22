<template>
  <aside class="options">
    <div class="content">
      <div class="field has-addons is-pulled-left fullMobile ">
        <div class="control">
          <input class="input" type="text" v-model="search" v-on:keyup.enter="filter" placeholder="Find a project">
        </div>
        <div class="control">
          <a class="button is-info" @click="filter">Search</a>
        </div>
      </div>
      <div class="select is-pulled-left fullMobile ">
        <select @change="category" v-model="currentCategory">
          <option value="" v-if="currentCategory === ''" disabled selected>Filter by category</option>
          <option value="" v-if="currentCategory !== ''">Reset filters</option>
          <option v-for="(category, index) in categories" :key="index" :selected="currentCategory === category">{{ category }}</option>
        </select>
      </div>
      <a href="#" class="button is outlined is-pulled-right fullMobile" @click="logout">Log out</a>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Menu',
  data () {
    return {
      search: '',
      currentCategory: ''
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('post', ['categories']),
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    },
    category () {
      this.$store.dispatch('post/filterCategory', this.currentCategory)
    },
    filter () {
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

  @media screen and (max-width: 1024px) {
    height: auto;
  }

  .content {
    display: inline-block;
    margin: 10px 0;

    @media screen and (max-width: 1024px) {
      padding: 10px 5%;
      max-width: 100%;
    }
  } 

  .select,
  .field {
    margin-right: 10px;
  }

  .fullMobile {
    @media screen and (max-width: 1024px) {
      float: left;
      margin: 0 0 10px;
      width: 100%;

      .select option {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>

