<template>
  <div class="content">
    <Menu/>
    <h4 v-if="!isLoaded" class="loader"><i class="fa fa-sync fa-spin"></i></h4>
    <section class="posts" v-if="isLoaded">
      <Post v-for="post of listHotPosts" :post="post" :isHot="true" :key="post.id"/>
      <Post v-for="post of listProjects" :post="post" :key="post.id"/>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import Masonry from "masonry-layout";
import Post from "@/components/Post";
import Menu from "@/components/Menu";

export default {
  name: "UpVote",
  data () {
    return {
      msnry: null
    }
  },
  computed: {
    ...mapGetters("post", ["listProjects", "listHotPosts", "isLoaded", "isFiltered"]),
  },
  methods: {
    setMasonry () {
      if (this.isLoaded) {
        setTimeout(() => { new Masonry('.posts', {
          itemSelector: '.post',
          columnWidth: '.post',
          percentPosition: true,
          gutter: 10
        }) }, 0)
      }
   }
  },
  beforeCreate() {
    this.$store.dispatch("post/getList");
    this.$store.dispatch("post/getVotes");
  },
  updated() {
    this.$store.dispatch("user/getCurrentVote");
  },
  watch: {
    isFiltered(o, n) {
      this.setMasonry();
      this.$store.commit("post/SET_FILTERED", false);
    },
    isLoaded(o, n) {
      this.setMasonry();
    }
  },
  components: {
    Post,
    Menu
  }
};
</script>

<style lang="scss" scoped>
.content {
  .loader {
    margin: 25px;
  }
  .posts {
    box-sizing: border-box;
    max-width: 100vw;
    overflow: hidden;
    padding: 5px 4rem;
    text-align: center;

    @media screen and (max-width: 1024px) {
      padding: 5px 1rem;
    }
  }
}
</style>
