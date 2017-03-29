import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from './notification.service';

let _window: any = window;

@Injectable()
export class YoutubePlayerService {
	public yt_player;
	private currentVideoId: string;

	@Output() videoChangeEvent: EventEmitter<any> = new EventEmitter(true);
	@Output() playPauseEvent: EventEmitter<any> = new EventEmitter(true);

	constructor(public notificationService: NotificationService) {
	}

	createPlayer(): void {
		let interval = setInterval(() => {
			if ((typeof _window.YT !== "undefined") && _window.YT && _window.YT.Player) {
				this.yt_player = new _window.YT.Player('yt-player', {
					width: '440',
					height: '250',
					playerVars: {
						iv_load_policy: '3',
						rel: '0'
					},
					events: {
						onStateChange: (ev) => {
							this.onPlayerStateChange(ev);
						}
					}
				});
				clearInterval(interval);
			}
		}, 100);
	}

	onPlayerStateChange(event: any) {
		const state = event.data;
		switch(state) {
			case 0:
				this.videoChangeEvent.emit(true);
				this.playPauseEvent.emit('pause');
				break;
			case 1:
				this.playPauseEvent.emit('play');
				break;
			case 2:
				this.playPauseEvent.emit('pause');
				break;
		}
	}

	playVideo(videoId: string): void {		
		if(!this.yt_player) {
			this.notificationService.showNotification("Player not ready.");
			return;
		}
		this.yt_player.loadVideoById(videoId);
		this.currentVideoId = videoId;
	}

	pausePlayingVideo(): void {
		this.yt_player.pauseVideo();
	}

	playPausedVideo(): void {
		this.yt_player.playVideo();
	}

	getCurrentVideo(): string {
		return this.currentVideoId;
	}

	resizePlayer(width: number, height: number) {
		this.yt_player.setSize(width, height);
	}
}