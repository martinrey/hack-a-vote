/* eslint-disable */
import { FBFirestore } from '@/helpers/firebaseConfig'

export default {
  namespaced: true,
  state: {
    list: {},
    hotPosts: []
  },
  mutations: {
    SET_LIST(state, list) {
      state.list = list;
    },
    SET_HOT_POSTS(state, hotPosts) {
      state.hotPosts = hotPosts;
    }
  },
  getters: {
    listProjects: state => state.list,
    listHotPosts: state => state.hotPosts
  },
  actions: {
    getList(context) {
      return FBFirestore.collection('projects')
        .get()
        .then(snapshot => {
          const posts = {}
          snapshot.forEach(doc => {
            posts[doc.id] = Object.assign({}, { id: doc.id }, doc.data())
          })
          context.commit("SET_LIST", posts);
        })
    },
    updateVotes(context, votes) {
      let { list } = context.state,
          hotPosts = [];
      let [gold, silver, bronce, ...rest] = Object.keys(votes).sort((a, b) => a[1] - b[1]);
      (gold && hotPosts.push(list[gold]) && delete list[gold]);
      (silver && hotPosts.push(list[silver]) && delete list[silver]);
      (bronce && hotPosts.push(list[bronce]) && delete list[bronce]);
      context.commit("SET_HOT_POSTS", hotPosts);
      context.commit("SET_LIST", list);
    },
    getVotes(context) {
      let votes = {}
      FBFirestore.collection('votes')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let { id } = doc.data()
            votes[id]++
            if (isNaN(votes[id])) {
              votes[id] = 1;
            }
          })
          context.dispatch("updateVotes", votes)
      })
    }
  }
};
