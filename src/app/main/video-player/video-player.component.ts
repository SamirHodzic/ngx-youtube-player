import { Component, Input, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { YoutubePlayerService } from '../../shared/services/youtube-player.service';
import { NotificationService } from '../../shared/services/notification.service';
import { BrowserNotificationService } from '../../shared/services/browser-notification.service';

@Component({
  selector: 'video-player',
  templateUrl: 'video-player.component.html',
  styleUrls: ['video-player.component.css']
})

export class VideoPlayerComponent implements AfterContentInit {
  public minPlayer = true;
  public superMinPlayer = false;
  public playingEvent = 'pause';
  public shuffle = false;
  public repeat = false;
  public fullscreenActive = false;
  public currentVideoText = 'None';
  public notifications = false;

  @Output() repeatActive = new EventEmitter();
  @Output() shuffleActive = new EventEmitter();
  @Output() nextVideoEvent = new EventEmitter();
  @Output() prevVideoEvent = new EventEmitter();
  @Output() playFirstInPlaylist = new EventEmitter();
  @Output() clearPlaylist = new EventEmitter();
  @Output() exportPlaylist = new EventEmitter();
  @Output() importPlaylist = new EventEmitter();
  @Output() closePlaylist = new EventEmitter();

  constructor(
    private youtubePlayer: YoutubePlayerService,
    private notificationService: NotificationService,
    private browserNotification: BrowserNotificationService
  ) {
    this.youtubePlayer.playPauseEvent.subscribe(event => this.playingEvent = event);
    this.youtubePlayer.currentVideoText.subscribe(event => this.currentVideoText = event || 'None');
  }

  ngAfterContentInit() {
    let doc = window.document;
    let playerApi = doc.createElement('script');
    playerApi.type = 'text/javascript';
    playerApi.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApi);

    this.youtubePlayer.createPlayer();
  }

  toggleFullscreen(): void {
    this.minPlayer = false;
    this.superMinPlayer = false;
    this.fullscreenActive = !this.fullscreenActive;
    let width = this.fullscreenActive ? window.innerWidth - 70 : 440;
    let height = this.fullscreenActive ? window.innerHeight - 120 : 250;
    this.youtubePlayer.resizePlayer(width, height);
  }

  playPause(event: string): void {
    this.playingEvent = event;
    if (!this.youtubePlayer.getCurrentVideo()) {
      this.playFirstInPlaylist.emit();
      return;
    }
    event === 'pause' ? this.youtubePlayer.pausePlayingVideo() : this.youtubePlayer.playPausedVideo();
  }

  nextVideo(): void {
    this.nextVideoEvent.emit();
  }

  prevVideo(): void {
    this.prevVideoEvent.emit();
  }

  togglePlayer(): void {
    this.minPlayer = !this.minPlayer;
    this.superMinPlayer = false;
  }

  minimizePlayer(): void {
    this.superMinPlayer = !this.superMinPlayer;
  }

  toggleRepeat(): void {
    this.repeat = !this.repeat;
    this.shuffle = false;
    this.repeatActive.emit(this.repeat);
  }

  toggleShuffle(): void {
    this.shuffle = !this.shuffle;
    this.repeat = false;
    this.shuffleActive.emit(this.shuffle);
  }

  openClosedPlaylist(): void {
    this.closePlaylist.emit();
  }

  clearPlaylistAction(): void {
    this.clearPlaylist.emit();
  }

  exportPlaylistAction(): void {
    this.exportPlaylist.emit();
  }

  importPlaylistAction(): void {
    let import_button = document.getElementById('import_button');
    import_button.click();
  }

  handleInputChange(e: any): void {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    if (file.name.split('.').pop() !== 'json') {
      this.notificationService.showNotification('File not supported.');
      return;
    }

    let reader = new FileReader();
    let me = this;

    reader.readAsText(file);
    reader.onload = function (ev) {
      let list;
      try {
        list = JSON.parse(ev.target['result']);
      } catch (exc) {
        list = null;
      }
      if (!list || list.length < 1) {
        me.notificationService.showNotification('Playlist not valid.');
        return;
      }

      me.importPlaylist.emit(list);
      me.notificationService.showNotification('Playlist imported.');
      document.getElementById('import_button')['value'] = '';
    }
  }

  toggleNotifications(): void {
    this.notifications ?
      (
        this.notifications = false,
        this.browserNotification.disable()
      ) :
      this.browserNotification.checkNotification().then(async res => {
        this.notifications = res === 'granted' ? true : (
          this.notificationService.showNotification('Browser notifications blocked.'),
          false
        );
      });
  }
}
