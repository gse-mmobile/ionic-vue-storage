<template>
  <ion-app>
    <ion-header>
 
        <ion-navbar>
            <ion-title>REDDIT!</ion-title>
        </ion-navbar>
 
    </ion-header>
 
    <ion-content>

      <ion-button @click="switchSubreddit('funny')">Funny</ion-button>
      <ion-button @click="switchSubreddit('gifs')">Gifs</ion-button>
      <ion-button @click="switchSubreddit('worldnews')">Worldnews</ion-button>

      <ion-list>
        <ion-item v-for="post in posts" v-bind:key="post.data.id">
          {{post.data.title}}
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-app>
</template>

<script>
import RedditService from '../services/reddit';
import Storage from '../services/storage';

const storage = new Storage();

export default {
  name: 'HelloWorld',
  data () {
    return {
      posts: []
    }
  },
  created() {

    storage.get('subreddit').then((value) => {
    
      if(value === null){
        value = 'gifs';
      }

      RedditService.getPosts(value).then(response => { 
        this.posts = response.body.data.children;
      });

    });

  },
  methods: {
    switchSubreddit(subreddit){
      
      storage.set('subreddit', subreddit);

      RedditService.getPosts(subreddit).then(response => { 
        this.posts = response.body.data.children;
      });      

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
