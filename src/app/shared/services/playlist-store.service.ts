import { Injectable } from '@angular/core';

@Injectable()
export class PlaylistStoreService {
  private ngxYTPlayer = 'ngx_yt_player';
  private playlists_template: Object = {
    'playlists': []
  };

  constructor() { }

  private init(): void {
    localStorage.setItem(this.ngxYTPlayer, JSON.stringify(this.playlists_template));
  }

  public retrieveStorage() {
    let storedPlaylist = this.parse();
    if (!storedPlaylist) {
      this.init();
      storedPlaylist = this.parse();
    }

    return storedPlaylist;
  }

  public addToPlaylist(video: Object): void {
    let store = this.parse();
    store.playlists.push(video);
    localStorage.setItem(this.ngxYTPlayer, JSON.stringify(store));
  }

  public removeFromPlaylist(video: any): void {
    let store = this.parse();
    store.playlists = store.playlists.filter(item => item.id !== video.id);
    localStorage.setItem(this.ngxYTPlayer, JSON.stringify(store));
  }

  private parse() {
    return JSON.parse(localStorage.getItem(this.ngxYTPlayer));
  }

  public clearPlaylist() {
    this.init();
  }

  public importPlaylist(videos: any): void {
    let store = this.parse();
    store.playlists = videos;
    localStorage.setItem(this.ngxYTPlayer, JSON.stringify(store));
  }
}
