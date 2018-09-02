
<template>
  <div>
    <h1 v-if="title">{{ title }}</h1>

    <SongCollectionList :items="albums" showCount countLabel="album" v-if="albums" />
    <Loading message="Loading..." v-if="loading" />
  </div>
</template>

<script>
import {library} from '../library';

import SongCollectionList from '../components/SongCollectionList.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'MyAlbums',
  components: {
    SongCollectionList,
    Loading
  },
  props: {
    title: String
  },
  data: function () {
    return {
      albums: library.albums
    };
  },
  computed: {
    loading: function () {
      return library.albumsFetcher.fetching;
    }
  },
  created: function () {
    library.loadAlbums();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a:hover {
  text-decoration: none;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.grid .item {
  width: 200px;
  margin: 5px;
  font-size: 0.9em;
}

.item img {
  width: 200px;
  height: 200px;
  border-radius: 4px;
  margin-bottom: 4px;
  box-shadow: 0 0 1px rgba(0, 0, 0, .4);
}

.item span {
  display: block;
  padding: 1px 6px;
  color: black;
}
</style>

<style>
.song-cell {
  vertical-align: middle !important;
  cursor: pointer;
}
</style>
