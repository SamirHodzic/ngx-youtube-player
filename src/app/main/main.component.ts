import { Component } from "@angular/core";
import { YoutubeApiService } from "../shared/services/youtube-api.service";
import { YoutubePlayerService } from "../shared/services/youtube-player.service";
import { PlaylistStoreService } from "../shared/services/playlist-store.service";
import { NotificationService } from '../shared/services/notification.service';

@Component({
	selector: 'main-list',
	templateUrl: 'main.component.html',
	styleUrls: ['main.component.css']
})

export class MainComponent {
	public videoList = [];
	public videoPlaylist = [];
	public loadingInProgress: boolean = false;
	public playlistToggle: boolean = false;
	public playlistNames: boolean = false;
	private pageLoadingFinished: boolean = false;
	public repeat: boolean = false;
	public shuffle: boolean = false;
	public link;

	constructor(
		private youtubeService: YoutubeApiService,
		private youtubePlayer: YoutubePlayerService,
		private playlistService: PlaylistStoreService,
		private notificationService: NotificationService
	) {
		this.videoPlaylist = this.playlistService.retrieveStorage().playlists;
	}

	playFirstInPlaylist(): void {
		if (this.videoPlaylist[0]) {
			let playlistEl = document.getElementById('playlist');
			playlistEl.scrollTop = 0;
			this.youtubePlayer.playVideo(this.videoPlaylist[0].id);
		}
	}

	handleSearchVideo(videos: Array<any>): void {
		this.videoList = videos;
	}

	checkAddToPlaylist(video: any): void {
		if (!this.videoPlaylist.some((e) => e.id === video.id)) {
			this.videoPlaylist.push(video);
			this.playlistService.addToPlaylist(video);

			let inPlaylist = this.videoPlaylist.length - 1;

			setTimeout(() => {
				let topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
				let playlistEl = document.getElementById('playlist');
				playlistEl.scrollTop = topPos - 100;
			});
		}
	}

	repeatActive(val: boolean): void {
		this.repeat = val;
		this.shuffle = false;
	}

	shuffleActive(val: boolean): void {
		this.shuffle = val;
		this.repeat = false;
	}

	togglePlaylist(): void {
		this.playlistToggle = !this.playlistToggle;
		setTimeout(() => {
			this.playlistNames = !this.playlistNames;
		}, 200);
	}

	searchMore(): void {
		if (this.loadingInProgress || this.pageLoadingFinished || this.videoList.length < 1) return;
		this.loadingInProgress = true;
		this.youtubeService.searchNext()
			.then(data => {
				this.loadingInProgress = false;
				if (data.length < 1 || data.status === 400) {
					setTimeout(() => {
						this.pageLoadingFinished = true;
						setTimeout(() => {
							this.pageLoadingFinished = false;
						}, 10000);
					})
					return;
				}
				data.forEach((val) => {
					this.videoList.push(val);
				});
			}).catch(error => {
				this.loadingInProgress = false;
			})
	}

	nextVideo(): void {
		let current = this.youtubePlayer.getCurrentVideo();
		let inPlaylist = undefined;
		this.videoPlaylist.forEach((video, index) => {
			if (video.id === current) {
				inPlaylist = index;
			} else {
				this.playFirstInPlaylist();
			}
		});

		if (inPlaylist !== undefined) {
			let topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
			let playlistEl = document.getElementById('playlist');
			if (this.shuffle) {
				let shuffled = this.videoPlaylist[this.getShuffled(inPlaylist)].id;
				this.youtubePlayer.playVideo(shuffled);
				playlistEl.scrollTop = document.getElementById(shuffled).offsetTop - 100;
			} else {
				if (this.videoPlaylist.length - 1 === inPlaylist) {
					this.youtubePlayer.playVideo(this.videoPlaylist[0].id);
					playlistEl.scrollTop = 0;
				} else {
					this.youtubePlayer.playVideo(this.videoPlaylist[inPlaylist + 1].id)
					playlistEl.scrollTop = topPos - 100;
				}
			}
		}
	}

	prevVideo(): void {
		let current = this.youtubePlayer.getCurrentVideo();
		let inPlaylist = undefined;
		this.videoPlaylist.forEach((video, index) => {
			if (video.id === current) {
				inPlaylist = index;
			} else {
				this.playFirstInPlaylist();
			}
		});

		if (inPlaylist !== undefined) {
			let topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
			let playlistEl = document.getElementById('playlist');
			if (this.shuffle) {
				let shuffled = this.videoPlaylist[this.getShuffled(inPlaylist)].id;
				this.youtubePlayer.playVideo(shuffled);
				playlistEl.scrollTop = document.getElementById(shuffled).offsetTop - 100;
			} else {
				if (inPlaylist === 0) {
					this.youtubePlayer.playVideo(this.videoPlaylist[this.videoPlaylist.length - 1].id);
					playlistEl.scrollTop = playlistEl.offsetHeight;
				} else {
					this.youtubePlayer.playVideo(this.videoPlaylist[inPlaylist - 1].id)
					playlistEl.scrollTop = topPos - 230;
				}
			}
		}
	}

	getShuffled(index: number): number {
		let i = Math.floor(Math.random() * this.videoPlaylist.length);
		return i !== index ? i : this.getShuffled(index);
	}

	closePlaylist(): void {
		this.playlistToggle = false;
		this.playlistNames = false;
	}

	clearPlaylist(): void {
		this.videoPlaylist = [];
		this.playlistService.clearPlaylist();
		this.notificationService.showNotification("Playlist cleared.");
	}

	exportPlaylist(): void {
		if (this.videoPlaylist.length < 1) {
			this.notificationService.showNotification("Nothing to export.");
			return;
		}
		let data = JSON.stringify(this.videoPlaylist);
		let a = document.createElement("a");
		let file = new Blob([data], { type: "text/json" });
		a.href = URL.createObjectURL(file);
		a.download = "playlist.json";
		a.click();
		this.notificationService.showNotification("Playlist exported.");
	}

	importPlaylist(playlist: any): void {
		this.videoPlaylist = playlist;
		this.playlistService.importPlaylist(this.videoPlaylist);
	}
}
