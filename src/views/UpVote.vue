<template>
  <div class="content">
    <h4 v-if="listProjects === {}">Aguarde un momento mientras traemos los proyectos.</h4>
    <section class="list">
      <Post v-for="post of listHotPosts" :post="post" :isHot="true" :key="post.id"/>
      <Post v-for="post of listProjects" :post="post" :key="post.id"/>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import Masonry from 'masonry-layout';
import Post from "@/components/Post";

export default {
  name: "UpVote",
  computed: {
    ...mapGetters('post', ['listProjects', 'listHotPosts']),
  },
  methods: {
    applyMassonry () {
      let msnry = new Masonry('.list', {
        itemSelector: '.post',
        columnWidth: '.post',
        percentPosition: true,
        gutter: 10
      })
    }
  },
  beforeCreate() {
    this.$store.dispatch("post/getList");
    this.$store.dispatch("post/getVotes");
  },
  updated () {
    this.$store.dispatch("user/getCurrentVote");
    },
  watch: {
    listProjects (oldList, newList) {
       this.applyMassonry();
    }
  },
  components: {
    Post
  }
};
</script>

<style scoped>
.list {
  box-sizing: border-box;
  max-width: 100vw;
  overflow: hidden;
  padding: 25px;
  text-align: center;
}
</style>
