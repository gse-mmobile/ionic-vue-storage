import Vue from 'vue';

export default {

	getPosts(subreddit){
		return Vue.http.get('https://www.reddit.com/r/' + subreddit + '/top/.json?limit=20&sort=hot');
	}

}