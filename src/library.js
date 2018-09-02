import Raven from 'raven-js';
import EventBus from './event-bus';

class Library {
  constructor () {
    this.albumsFetcher = new ResourceFetcher(
      100, offset => this.musicKit.api.library.albums(null, {offset, limit: 100}));
    this.albums = this.albumsFetcher.result;
  }

  get musicKit () {
    return window.MusicKit.getInstance();
  }

  loadAlbums () {
    if (!(this.albumsFetcher.complete || this.albumsFetcher.fetching)) {
      this.albumsFetcher.fetch();
    }
  }
}

class ResourceFetcher {
  constructor (limit, method) {
    this.limit = limit;
    this.method = method;
    this.complete = false;
    this.fetching = false;
    this.result = [];
  }

  fetch (offset = 0) {
    this.fetching = true;
    this.method(offset).then(r => {
      this.result.push(...r);

      // TODO start precaching any expiring images

      if (r.length !== 0) {
        this.fetch(offset + this.limit);
      } else {
        this.complete = true;
        this.fetching = false;
      }
    }, err => {
      Raven.captureException(err);
      console.error(err);

      EventBus.$emit('alert', {
        type: 'danger',
        message: `An unexpected error occurred.`
      });
    });
  }
}

export const library = new Library();
