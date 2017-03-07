webpackJsonp([0,4],{

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaylistStoreService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PlaylistStoreService = (function () {
    function PlaylistStoreService() {
        this.ngxYTPlayer = 'ngx_yt_player';
        this.playlists_template = {
            "playlists": []
        };
    }
    PlaylistStoreService.prototype.init = function () {
        localStorage.setItem(this.ngxYTPlayer, JSON.stringify(this.playlists_template));
    };
    PlaylistStoreService.prototype.retrieveStorage = function () {
        var storedPlaylist = this.parse();
        if (!storedPlaylist) {
            this.init();
            storedPlaylist = this.parse();
        }
        return storedPlaylist;
    };
    PlaylistStoreService.prototype.addToPlaylist = function (video) {
        var store = this.parse();
        store.playlists.push(video);
        localStorage.setItem(this.ngxYTPlayer, JSON.stringify(store));
    };
    PlaylistStoreService.prototype.removeFromPlaylist = function (video) {
        var store = this.parse();
        store.playlists = store.playlists.filter(function (item) { return item.id !== video.id; });
        localStorage.setItem(this.ngxYTPlayer, JSON.stringify(store));
    };
    PlaylistStoreService.prototype.parse = function () {
        return JSON.parse(localStorage.getItem(this.ngxYTPlayer));
    };
    PlaylistStoreService.prototype.clearPlaylist = function () {
        this.init();
    };
    PlaylistStoreService.prototype.importPlaylist = function (videos) {
        var store = this.parse();
        store.playlists = videos;
        localStorage.setItem(this.ngxYTPlayer, JSON.stringify(store));
    };
    return PlaylistStoreService;
}());
PlaylistStoreService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], PlaylistStoreService);

//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/playlist-store.service.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notification_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants__ = __webpack_require__(467);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubeApiService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var YoutubeApiService = (function () {
    function YoutubeApiService(http, notificationService) {
        this.http = http;
        this.notificationService = notificationService;
        this.base_url = 'https://www.googleapis.com/youtube/v3/';
        this.max_results = 50;
    }
    YoutubeApiService.prototype.searchVideos = function (query) {
        var _this = this;
        return this.http.get(this.base_url + 'search?q=' + query + '&maxResults=' + this.max_results + '&type=video&part=snippet,id&key=' + __WEBPACK_IMPORTED_MODULE_5__constants__["a" /* YOUTUBE_API_KEY */] + '&videoEmbeddable=true')
            .map(function (response) {
            var jsonRes = response.json();
            var res = jsonRes['items'];
            _this.lastQuery = query;
            _this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;
            var ids = [];
            res.forEach(function (item) {
                ids.push(item.id.videoId);
            });
            return _this.getVideos(ids);
        })
            .toPromise()
            .catch(this.handleError);
    };
    YoutubeApiService.prototype.searchNext = function () {
        var _this = this;
        return this.http.get(this.base_url + 'search?q=' + this.lastQuery + '&pageToken=' + this.nextToken + '&maxResults=' + this.max_results + '&type=video&part=snippet,id&key=' + __WEBPACK_IMPORTED_MODULE_5__constants__["a" /* YOUTUBE_API_KEY */] + '&videoEmbeddable=true')
            .map(function (response) {
            var jsonRes = response.json();
            var res = jsonRes['items'];
            _this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;
            var ids = [];
            res.forEach(function (item) {
                ids.push(item.id.videoId);
            });
            return _this.getVideos(ids);
        })
            .toPromise()
            .catch(this.handleError);
    };
    YoutubeApiService.prototype.getVideos = function (ids) {
        return this.http.get(this.base_url + 'videos?id=' + ids.join(',') + '&maxResults=' + this.max_results + '&type=video&part=snippet,contentDetails,statistics&key=' + __WEBPACK_IMPORTED_MODULE_5__constants__["a" /* YOUTUBE_API_KEY */])
            .map(function (results) {
            return results.json()['items'];
        })
            .toPromise()
            .catch(this.handleError);
    };
    YoutubeApiService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        this.notificationService.showNotification(errMsg);
        return Promise.reject(errMsg);
    };
    return YoutubeApiService;
}());
YoutubeApiService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__notification_service__["a" /* NotificationService */]) === "function" && _b || Object])
], YoutubeApiService);

var _a, _b;
//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/youtube-api.service.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Component */])({
        selector: 'app',
        template: __webpack_require__(634),
        styles: [__webpack_require__(626)]
    })
], AppComponent);

//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/app.component.js.map

/***/ }),

/***/ 353:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 353;


/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app___ = __webpack_require__(461);




__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["a" /* enableProdMode */])();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app___["a" /* AppModule */]);
//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/main.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_main_component__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__main_videos_list_videos_list_component__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__main_videos_playlist_videos_playlist_component__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__main_videos_search_videos_search_component__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__main_video_player_video_player_component__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_services_youtube_api_service__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_services_youtube_player_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_services_playlist_store_service__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared_services_notification_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_pipes_video_duration_pipe__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_pipes_video_likes_pipe__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__shared_pipes_video_views_pipe__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__shared_pipes_playlist_item_name_pipe__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__shared_directives_lazy_scroll_lazy_scroll_directive__ = __webpack_require__(468);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// Components






// Services




// Pipes





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* ReactiveFormsModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__main_main_component__["a" /* MainComponent */],
            __WEBPACK_IMPORTED_MODULE_6__main_videos_list_videos_list_component__["a" /* VideosListComponent */],
            __WEBPACK_IMPORTED_MODULE_8__main_videos_search_videos_search_component__["a" /* VideosSearchComponent */],
            __WEBPACK_IMPORTED_MODULE_9__main_video_player_video_player_component__["a" /* VideoPlayerComponent */],
            __WEBPACK_IMPORTED_MODULE_7__main_videos_playlist_videos_playlist_component__["a" /* VideosPlaylistComponent */],
            __WEBPACK_IMPORTED_MODULE_14__shared_pipes_video_duration_pipe__["a" /* VideoDurationPipe */],
            __WEBPACK_IMPORTED_MODULE_15__shared_pipes_video_likes_pipe__["a" /* VideoLikesPipe */],
            __WEBPACK_IMPORTED_MODULE_16__shared_pipes_video_views_pipe__["a" /* VideoViewsPipe */],
            __WEBPACK_IMPORTED_MODULE_17__shared_pipes_playlist_item_name_pipe__["a" /* PlaylistItemNamePipe */],
            __WEBPACK_IMPORTED_MODULE_18__shared_directives_lazy_scroll_lazy_scroll_directive__["a" /* LazyScroll */]
        ],
        bootstrap: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_10__shared_services_youtube_api_service__["a" /* YoutubeApiService */],
            __WEBPACK_IMPORTED_MODULE_11__shared_services_youtube_player_service__["a" /* YoutubePlayerService */],
            __WEBPACK_IMPORTED_MODULE_12__shared_services_playlist_store_service__["a" /* PlaylistStoreService */],
            __WEBPACK_IMPORTED_MODULE_13__shared_services_notification_service__["a" /* NotificationService */]
        ]
    })
], AppModule);

//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/app.module.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_module__ = __webpack_require__(460);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__app_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_component__ = __webpack_require__(309);
/* unused harmony namespace reexport */


//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/index.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_youtube_api_service__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_youtube_player_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_playlist_store_service__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_notification_service__ = __webpack_require__(72);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MainComponent = (function () {
    function MainComponent(youtubeService, youtubePlayer, playlistService, notificationService) {
        this.youtubeService = youtubeService;
        this.youtubePlayer = youtubePlayer;
        this.playlistService = playlistService;
        this.notificationService = notificationService;
        this.videoList = [];
        this.videoPlaylist = [];
        this.loadingInProgress = false;
        this.playlistToggle = false;
        this.playlistNames = false;
        this.pageLoadingFinished = false;
        this.repeat = false;
        this.shuffle = false;
        this.videoPlaylist = this.playlistService.retrieveStorage().playlists;
    }
    MainComponent.prototype.playFirstInPlaylist = function () {
        if (this.videoPlaylist[0])
            this.youtubePlayer.playVideo(this.videoPlaylist[0].id);
    };
    MainComponent.prototype.handleSearchVideo = function (videos) {
        this.videoList = videos;
    };
    MainComponent.prototype.checkAddToPlaylist = function (video) {
        var _this = this;
        if (!this.videoPlaylist.some(function (e) { return e.id === video.id; })) {
            this.videoPlaylist.push(video);
            this.playlistService.addToPlaylist(video);
            var inPlaylist_1 = this.videoPlaylist.length - 1;
            setTimeout(function () {
                var topPos = document.getElementById(_this.videoPlaylist[inPlaylist_1].id).offsetTop;
                var playlistEl = document.getElementById('playlist');
                playlistEl.scrollTop = topPos - 100;
            });
        }
    };
    MainComponent.prototype.repeatActive = function (val) {
        this.repeat = val;
        this.shuffle = false;
    };
    MainComponent.prototype.shuffleActive = function (val) {
        this.shuffle = val;
        this.repeat = false;
    };
    MainComponent.prototype.togglePlaylist = function () {
        var _this = this;
        this.playlistToggle = !this.playlistToggle;
        setTimeout(function () {
            _this.playlistNames = !_this.playlistNames;
        }, 200);
    };
    MainComponent.prototype.searchMore = function () {
        var _this = this;
        if (this.loadingInProgress || this.pageLoadingFinished || this.videoList.length < 1)
            return;
        this.loadingInProgress = true;
        this.youtubeService.searchNext()
            .then(function (data) {
            _this.loadingInProgress = false;
            if (data.length < 1 || data.status === 400) {
                setTimeout(function () {
                    _this.pageLoadingFinished = true;
                    setTimeout(function () {
                        _this.pageLoadingFinished = false;
                    }, 10000);
                });
                return;
            }
            data.forEach(function (val) {
                _this.videoList.push(val);
            });
        }).catch(function (error) {
            _this.loadingInProgress = false;
        });
    };
    MainComponent.prototype.nextVideo = function () {
        var current = this.youtubePlayer.getCurrentVideo();
        var inPlaylist = undefined;
        this.videoPlaylist.forEach(function (video, index) {
            if (video.id === current) {
                inPlaylist = index;
            }
        });
        if (inPlaylist !== undefined) {
            var topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
            var playlistEl = document.getElementById('playlist');
            if (this.shuffle) {
                var shuffled = this.videoPlaylist[this.getShuffled(inPlaylist)].id;
                this.youtubePlayer.playVideo(shuffled);
                playlistEl.scrollTop = document.getElementById(shuffled).offsetTop - 100;
            }
            else {
                if (this.videoPlaylist.length - 1 === inPlaylist) {
                    this.youtubePlayer.playVideo(this.videoPlaylist[0].id);
                    playlistEl.scrollTop = 0;
                }
                else {
                    this.youtubePlayer.playVideo(this.videoPlaylist[inPlaylist + 1].id);
                    playlistEl.scrollTop = topPos - 100;
                }
            }
        }
    };
    MainComponent.prototype.prevVideo = function () {
        var current = this.youtubePlayer.getCurrentVideo();
        var inPlaylist = undefined;
        this.videoPlaylist.forEach(function (video, index) {
            if (video.id === current) {
                inPlaylist = index;
            }
        });
        if (inPlaylist !== undefined) {
            var topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
            var playlistEl = document.getElementById('playlist');
            if (this.shuffle) {
                var shuffled = this.videoPlaylist[this.getShuffled(inPlaylist)].id;
                this.youtubePlayer.playVideo(shuffled);
                playlistEl.scrollTop = document.getElementById(shuffled).offsetTop - 100;
            }
            else {
                if (inPlaylist === 0) {
                    this.youtubePlayer.playVideo(this.videoPlaylist[this.videoPlaylist.length - 1].id);
                    playlistEl.scrollTop = playlistEl.offsetHeight;
                }
                else {
                    this.youtubePlayer.playVideo(this.videoPlaylist[inPlaylist - 1].id);
                    playlistEl.scrollTop = topPos - 230;
                }
            }
        }
    };
    MainComponent.prototype.getShuffled = function (index) {
        var i = Math.floor(Math.random() * this.videoPlaylist.length);
        return i !== index ? i : this.getShuffled(index);
    };
    MainComponent.prototype.closePlaylist = function () {
        this.playlistToggle = false;
        this.playlistNames = false;
    };
    MainComponent.prototype.clearPlaylist = function () {
        this.videoPlaylist = [];
        this.playlistService.clearPlaylist();
        this.notificationService.showNotification("Playlist cleared.");
    };
    MainComponent.prototype.exportPlaylist = function () {
        if (this.videoPlaylist.length < 1) {
            this.notificationService.showNotification("Nothing to export.");
            return;
        }
        var data = JSON.stringify(this.videoPlaylist);
        var a = document.createElement("a");
        var file = new Blob([data], { type: "text/json" });
        a.href = URL.createObjectURL(file);
        a.download = "playlist.json";
        a.click();
        this.notificationService.showNotification("Playlist exported.");
    };
    MainComponent.prototype.importPlaylist = function (playlist) {
        this.videoPlaylist = playlist;
        this.playlistService.importPlaylist(this.videoPlaylist);
    };
    return MainComponent;
}());
MainComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Component */])({
        selector: 'main-list',
        template: __webpack_require__(635),
        styles: [__webpack_require__(627)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_youtube_api_service__["a" /* YoutubeApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services_youtube_api_service__["a" /* YoutubeApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_youtube_player_service__["a" /* YoutubePlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_youtube_player_service__["a" /* YoutubePlayerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_services_playlist_store_service__["a" /* PlaylistStoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_services_playlist_store_service__["a" /* PlaylistStoreService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__shared_services_notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_services_notification_service__["a" /* NotificationService */]) === "function" && _d || Object])
], MainComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/main.component.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_youtube_player_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_notification_service__ = __webpack_require__(72);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoPlayerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VideoPlayerComponent = (function () {
    function VideoPlayerComponent(youtubePlayer, notificationService) {
        var _this = this;
        this.youtubePlayer = youtubePlayer;
        this.notificationService = notificationService;
        this.minPlayer = true;
        this.superMinPlayer = false;
        this.playingEvent = 'pause';
        this.shuffle = false;
        this.repeat = false;
        this.fullscreenActive = false;
        this.repeatActive = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        this.shuffleActive = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        this.nextVideoEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        this.prevVideoEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        this.playFirstInPlaylist = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        this.clearPlaylist = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        this.exportPlaylist = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        this.importPlaylist = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        this.closePlaylist = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        this.youtubePlayer.playPauseEvent.subscribe(function (event) { return _this.playingEvent = event; });
    }
    VideoPlayerComponent.prototype.ngAfterContentInit = function () {
        var doc = window.document;
        var playerApi = doc.createElement('script');
        playerApi.type = 'text/javascript';
        playerApi.src = 'https://www.youtube.com/iframe_api';
        doc.body.appendChild(playerApi);
        this.youtubePlayer.createPlayer();
    };
    VideoPlayerComponent.prototype.toggleFullscreen = function () {
        this.minPlayer = false;
        this.superMinPlayer = false;
        this.fullscreenActive = !this.fullscreenActive;
        var width = this.fullscreenActive ? window.innerWidth - 70 : 440;
        var height = this.fullscreenActive ? window.innerHeight - 120 : 250;
        this.youtubePlayer.resizePlayer(width, height);
    };
    VideoPlayerComponent.prototype.playPause = function (event) {
        this.playingEvent = event;
        if (!this.youtubePlayer.getCurrentVideo()) {
            this.playFirstInPlaylist.emit();
            return;
        }
        event === 'pause' ? this.youtubePlayer.pausePlayingVideo() : this.youtubePlayer.playPausedVideo();
    };
    VideoPlayerComponent.prototype.nextVideo = function () {
        this.nextVideoEvent.emit();
    };
    VideoPlayerComponent.prototype.prevVideo = function () {
        this.prevVideoEvent.emit();
    };
    VideoPlayerComponent.prototype.togglePlayer = function () {
        this.minPlayer = !this.minPlayer;
        this.superMinPlayer = false;
    };
    VideoPlayerComponent.prototype.minimizePlayer = function () {
        this.superMinPlayer = !this.superMinPlayer;
    };
    VideoPlayerComponent.prototype.toggleRepeat = function () {
        this.repeat = !this.repeat;
        this.shuffle = false;
        this.repeatActive.emit(this.repeat);
    };
    VideoPlayerComponent.prototype.toggleShuffle = function () {
        this.shuffle = !this.shuffle;
        this.repeat = false;
        this.shuffleActive.emit(this.shuffle);
    };
    VideoPlayerComponent.prototype.openClosedPlaylist = function () {
        this.closePlaylist.emit();
    };
    VideoPlayerComponent.prototype.clearPlaylistAction = function () {
        this.clearPlaylist.emit();
    };
    VideoPlayerComponent.prototype.exportPlaylistAction = function () {
        this.exportPlaylist.emit();
    };
    VideoPlayerComponent.prototype.importPlaylistAction = function () {
        var import_button = document.getElementById('import_button');
        import_button.click();
    };
    VideoPlayerComponent.prototype.handleInputChange = function (e) {
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        if (file.type !== 'application/json') {
            this.notificationService.showNotification("File not supported.");
            return;
        }
        var reader = new FileReader();
        var me = this;
        reader.readAsText(file);
        reader.onload = function (ev) {
            var list;
            try {
                list = JSON.parse(ev.target['result']);
            }
            catch (exc) {
                list = null;
            }
            if (!list) {
                me.notificationService.showNotification("Playlist not valid.");
                return;
            }
            if (list.length < 1) {
                me.notificationService.showNotification("Nothing to import.");
                return;
            }
            me.importPlaylist.emit(list);
            me.notificationService.showNotification("Playlist imported.");
            document.getElementById('import_button')['value'] = "";
        };
    };
    return VideoPlayerComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], VideoPlayerComponent.prototype, "repeatActive", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], VideoPlayerComponent.prototype, "shuffleActive", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], VideoPlayerComponent.prototype, "nextVideoEvent", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], VideoPlayerComponent.prototype, "prevVideoEvent", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], VideoPlayerComponent.prototype, "playFirstInPlaylist", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], VideoPlayerComponent.prototype, "clearPlaylist", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], VideoPlayerComponent.prototype, "exportPlaylist", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], VideoPlayerComponent.prototype, "importPlaylist", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], VideoPlayerComponent.prototype, "closePlaylist", void 0);
VideoPlayerComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Component */])({
        selector: 'video-player',
        template: __webpack_require__(636),
        styles: [__webpack_require__(628)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_youtube_player_service__["a" /* YoutubePlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services_youtube_player_service__["a" /* YoutubePlayerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_notification_service__["a" /* NotificationService */]) === "function" && _b || Object])
], VideoPlayerComponent);

var _a, _b;
//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/video-player.component.js.map

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_youtube_player_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_playlist_store_service__ = __webpack_require__(140);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideosListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VideosListComponent = (function () {
    function VideosListComponent(youtubePlayer, playlistService) {
        this.youtubePlayer = youtubePlayer;
        this.playlistService = playlistService;
        this.videoPlaylist = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
    }
    VideosListComponent.prototype.play = function (video) {
        this.youtubePlayer.playVideo(video.id);
        this.addToPlaylist(video);
    };
    VideosListComponent.prototype.addToPlaylist = function (video) {
        this.videoPlaylist.emit(video);
    };
    return VideosListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
    __metadata("design:type", Object)
], VideosListComponent.prototype, "videoList", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
    __metadata("design:type", Object)
], VideosListComponent.prototype, "loadingInProgress", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], VideosListComponent.prototype, "videoPlaylist", void 0);
VideosListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Component */])({
        selector: 'videos-list',
        template: __webpack_require__(637),
        styles: [__webpack_require__(629)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_youtube_player_service__["a" /* YoutubePlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services_youtube_player_service__["a" /* YoutubePlayerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_playlist_store_service__["a" /* PlaylistStoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_playlist_store_service__["a" /* PlaylistStoreService */]) === "function" && _b || Object])
], VideosListComponent);

var _a, _b;
//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/videos-list.component.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_youtube_player_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_playlist_store_service__ = __webpack_require__(140);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideosPlaylistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VideosPlaylistComponent = (function () {
    function VideosPlaylistComponent(youtubePlayer, playlistService) {
        var _this = this;
        this.youtubePlayer = youtubePlayer;
        this.playlistService = playlistService;
        this.youtubePlayer.videoChangeEvent.subscribe(function (event) { return event ? _this.playNextVideo() : false; });
    }
    VideosPlaylistComponent.prototype.play = function (id) {
        this.youtubePlayer.playVideo(id);
    };
    VideosPlaylistComponent.prototype.currentPlaying = function (id) {
        return this.youtubePlayer.getCurrentVideo() === id;
    };
    VideosPlaylistComponent.prototype.removeFromPlaylist = function (video) {
        this.videoPlaylist.splice(this.videoPlaylist.indexOf(video), 1);
        this.playlistService.removeFromPlaylist(video);
    };
    VideosPlaylistComponent.prototype.playNextVideo = function () {
        var current = this.youtubePlayer.getCurrentVideo();
        var inPlaylist = undefined;
        if (this.repeat) {
            this.youtubePlayer.playVideo(current);
            return;
        }
        this.videoPlaylist.forEach(function (video, index) {
            if (video.id === current) {
                inPlaylist = index;
            }
        });
        if (inPlaylist !== undefined) {
            var topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
            var playlistEl = document.getElementById('playlist');
            if (this.shuffle) {
                var shuffled = this.videoPlaylist[this.getShuffled(inPlaylist)].id;
                this.youtubePlayer.playVideo(shuffled);
                playlistEl.scrollTop = document.getElementById(shuffled).offsetTop - 100;
            }
            else {
                if (this.videoPlaylist.length - 1 === inPlaylist) {
                    this.youtubePlayer.playVideo(this.videoPlaylist[0].id);
                    playlistEl.scrollTop = 0;
                }
                else {
                    this.youtubePlayer.playVideo(this.videoPlaylist[inPlaylist + 1].id);
                    playlistEl.scrollTop = topPos - 100;
                }
            }
        }
    };
    VideosPlaylistComponent.prototype.getShuffled = function (index) {
        var i = Math.floor(Math.random() * this.videoPlaylist.length);
        return i !== index ? i : this.getShuffled(index);
    };
    return VideosPlaylistComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
    __metadata("design:type", Object)
], VideosPlaylistComponent.prototype, "playlistToggle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
    __metadata("design:type", Object)
], VideosPlaylistComponent.prototype, "videoPlaylist", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
    __metadata("design:type", Object)
], VideosPlaylistComponent.prototype, "playlistNames", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
    __metadata("design:type", Object)
], VideosPlaylistComponent.prototype, "repeat", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
    __metadata("design:type", Object)
], VideosPlaylistComponent.prototype, "shuffle", void 0);
VideosPlaylistComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Component */])({
        selector: 'videos-playlist',
        template: __webpack_require__(638),
        styles: [__webpack_require__(630)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_youtube_player_service__["a" /* YoutubePlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services_youtube_player_service__["a" /* YoutubePlayerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_playlist_store_service__["a" /* PlaylistStoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_playlist_store_service__["a" /* PlaylistStoreService */]) === "function" && _b || Object])
], VideosPlaylistComponent);

var _a, _b;
//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/videos-playlist.component.js.map

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_youtube_api_service__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_youtube_player_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_notification_service__ = __webpack_require__(72);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideosSearchComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var VideosSearchComponent = (function () {
    function VideosSearchComponent(fb, youtubeService, youtubePlayer, notificationService) {
        var _this = this;
        this.fb = fb;
        this.youtubeService = youtubeService;
        this.youtubePlayer = youtubePlayer;
        this.notificationService = notificationService;
        this.videosUpdated = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        this.searchForm = this.fb.group({
            query: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* Validators */].required]
        });
        this.youtubeService.searchVideos('')
            .then(function (data) {
            _this.videosUpdated.emit(data);
        });
    }
    VideosSearchComponent.prototype.doSearch = function (event) {
        var _this = this;
        if (this.loadingInProgress || (this.searchForm.value.query.trim().length === 0) ||
            (this.last_search && this.last_search === this.searchForm.value.query))
            return;
        this.videosUpdated.emit([]);
        this.last_search = this.searchForm.value.query;
        this.youtubeService.searchVideos(this.last_search)
            .then(function (data) {
            if (data.length < 1)
                _this.notificationService.showNotification("No matches found.");
            _this.videosUpdated.emit(data);
        });
    };
    return VideosSearchComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], VideosSearchComponent.prototype, "videosUpdated", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
    __metadata("design:type", Object)
], VideosSearchComponent.prototype, "loadingInProgress", void 0);
VideosSearchComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Component */])({
        selector: 'videos-search',
        template: __webpack_require__(639),
        styles: [__webpack_require__(631)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_youtube_api_service__["a" /* YoutubeApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_youtube_api_service__["a" /* YoutubeApiService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_services_youtube_player_service__["a" /* YoutubePlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_services_youtube_player_service__["a" /* YoutubePlayerService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__shared_services_notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_services_notification_service__["a" /* NotificationService */]) === "function" && _d || Object])
], VideosSearchComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/videos-search.component.js.map

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YOUTUBE_API_KEY; });
var YOUTUBE_API_KEY = 'AIzaSyAsMiGn7Z09Yh1zYyJlmPf0ak8XwZ7lFJY';
//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/constants.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LazyScroll; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LazyScroll = (function () {
    function LazyScroll(element) {
        this.element = element;
        this.OnScrollMethod = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        this._element = this.element.nativeElement;
        if (!this.scrollTrigger) {
            this.scrollTrigger = 1;
        }
    }
    LazyScroll.prototype.onScroll = function () {
        this._count++;
        if (this._element.scrollTop + this._element.clientHeight >= this._element.scrollHeight) {
            this.OnScrollMethod.emit(null);
        }
        else {
            if (this._count % this.scrollTrigger === 0) {
                this.OnScrollMethod.emit(null);
            }
        }
    };
    return LazyScroll;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])('ScrollDistance'),
    __metadata("design:type", Number)
], LazyScroll.prototype, "scrollTrigger", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], LazyScroll.prototype, "OnScrollMethod", void 0);
LazyScroll = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Directive */])({
        selector: '[LazyScroll]',
        host: {
            '(scroll)': 'onScroll($event)'
        }
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* ElementRef */]) === "function" && _a || Object])
], LazyScroll);

var _a;
//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/lazy-scroll.directive.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaylistItemNamePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PlaylistItemNamePipe = (function () {
    function PlaylistItemNamePipe() {
    }
    PlaylistItemNamePipe.prototype.transform = function (value, args) {
        var dots = "...";
        if (value.length > 65) {
            value = value.substring(0, 62) + dots;
        }
        return value;
    };
    return PlaylistItemNamePipe;
}());
PlaylistItemNamePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Pipe */])({
        name: 'playlistItemName'
    })
], PlaylistItemNamePipe);

//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/playlist-item-name.pipe.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoDurationPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VideoDurationPipe = (function () {
    function VideoDurationPipe() {
    }
    VideoDurationPipe.prototype.transform = function (value, args) {
        var time = value;
        if (!time) {
            return '...';
        }
        return ['PT', 'H', 'M', 'S'].reduce(function (prev, cur, i, arr) {
            var now = prev.rest.split(cur);
            if (cur !== 'PT' && cur !== 'H' && !prev.rest.match(cur)) {
                prev.new.push('00');
            }
            if (now.length === 1) {
                return prev;
            }
            prev.new.push(now[0]);
            return {
                rest: now[1].replace(cur, ''),
                new: prev.new
            };
        }, { rest: time, new: [] })
            .new.filter(function (_time) { return _time !== ''; })
            .map(function (_time) { return _time.length === 1 ? "0" + _time : _time; })
            .join(':');
    };
    return VideoDurationPipe;
}());
VideoDurationPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Pipe */])({
        name: 'videoDuration'
    })
], VideoDurationPipe);

//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/video-duration.pipe.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoLikesPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VideoLikesPipe = (function () {
    function VideoLikesPipe() {
    }
    VideoLikesPipe.prototype.transform = function (value, args) {
        return parseInt(value).toLocaleString('en');
    };
    return VideoLikesPipe;
}());
VideoLikesPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Pipe */])({
        name: 'videoLikes'
    })
], VideoLikesPipe);

//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/video-likes.pipe.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoViewsPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VideoViewsPipe = (function () {
    function VideoViewsPipe() {
    }
    VideoViewsPipe.prototype.transform = function (value, args) {
        return parseInt(value).toLocaleString('en');
    };
    return VideoViewsPipe;
}());
VideoViewsPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Pipe */])({
        name: 'videoViews'
    })
], VideoViewsPipe);

//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/video-views.pipe.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
// This file includes polyfills needed by Angular 2 and is loaded before
// the app. You can add your own extra polyfills to this file.
















//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/polyfills.js.map

/***/ }),

/***/ 626:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(42)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 627:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(42)();
// imports


// module
exports.push([module.i, ".loader-video {\n  top: calc(50% - 35px);\n  left: calc(50% - 16px);\n}\n\n.mdl-layout__header {\n  height: 64px;\n}\n\n.mdl-layout__content {\n  width: 95%;\n}\n\n.mdl-layout__header-row {\n  padding: 0 40px 0 16px;\n}\n\n.mdl-layout__drawer-button {\n  right: 0;\n  left: inherit;\n}\n\n.blur-main-playlist-opened {\n  opacity: 0.4;\n  transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  -ms-transition: all 0.3s ease;\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n}\n\n.mdl-js-snackbar {\n  bottom: 0;\n  z-index: 999;\n  right: 0;\n  left: 78%;\n  background-color: rgba(196, 48, 43, 0.85);\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 628:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(42)();
// imports


// module
exports.push([module.i, ".main-player-block {\n  position: absolute;\n  width: 100%;\n  height: 50px;\n  bottom: 0;\n  background-color: rgba(79, 111, 144, 1);\n  z-index: 992;\n}\n\n.player-containter {\n  -webkit-transition: all 300ms ease-in-out;\n  transition: all 300ms ease-in-out;\n  width: 440px;\n  height: 250px;\n  position: fixed;\n  z-index: 992;\n  bottom: 16px;\n  left: 16px;\n  background-color: #000;\n  border: 3px solid rgba(79, 111, 144, 0.75);\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);\n}\n\n.player-containter.minimized {\n  -webkit-transform: translate3d(-20%, 20%, 0) scale(0.6);\n          transform: translate3d(-20%, 20%, 0) scale(0.6);\n}\n\n.player-containter.super-minimized {\n  -webkit-transform: translate3d(-42.5%, 46.5%, 0) scale(0.15);\n          transform: translate3d(-42.5%, 46.5%, 0) scale(0.15);\n}\n\n.player-view-controls {\n  position: absolute;\n  color: white;\n  background-color: rgb(196, 48, 43);\n  top: -27px;\n  left: -3px;\n  font-size: 30px;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n\n.player-view-controls i {\n  cursor: pointer;\n}\n\n.player-view-controls .minimize {\n  margin-left: -7px;\n}\n\n.player-controls-block {\n  margin-top: 5px;\n  text-align: center;\n  color: #fff;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.mdl-button--icon.play {\n  width: 42px;\n  height: 42px;\n}\n\n.mdl-button--icon.play i {\n  -webkit-transform: translate(-20px, -12px);\n          transform: translate(-20px, -12px);\n  font-size: 40px;\n}\n\n.mdl-button--icon.prev {\n  width: 30px;\n  height: 30px;\n}\n\n.mdl-button--icon.prev i {\n  -webkit-transform: translate(-15px, -12px);\n          transform: translate(-15px, -12px);\n  font-size: 28px;\n}\n\n.mdl-button--icon.next {\n  width: 30px;\n  height: 30px;\n}\n\n.mdl-button--icon.next i {\n  -webkit-transform: translate(-14px, -12px);\n          transform: translate(-14px, -12px);\n  font-size: 28px;\n}\n\n.repeat-shuffle-block {\n  margin-left: 40px;\n  position: absolute;\n  top: 10px;\n}\n\n.repeat-shuffle-block button.active {\n  background-color: rgba(196, 48, 43, 0.85);\n}\n\n.mute-block {\n  margin-left: -80px;\n  position: absolute;\n  top: 10px;\n}\n\n.mute-block button.active {\n  background-color: rgba(196, 48, 43, 0.85);\n}\n\n.playlist-drop-button {\n  position: absolute;\n  color: #fff;\n  right: 12px;\n  top: 10px;\n}\n\n.main-yt-player-block {\n  position: relative;\n  text-align: center;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.main-yt-player-block .material-icons {\n  position: absolute;\n  color: white;\n  font-size: 255px;\n  left: 0;\n  right: 0;\n  margin: 0 auto;\n  cursor: pointer;\n  display: none;\n  text-shadow: 2px 2px 2px #000;\n}\n\n.main-yt-player-block:hover .material-icons {\n  display: block;\n}\n\n.player-fullscreen {\n  bottom: 50px;\n  left: 0;\n  width: 95%;\n  height: calc(100% - 114px);\n  border: none;\n  box-shadow: none;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 629:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(42)();
// imports


// module
exports.push([module.i, ".loader-progress {\n  position: relative;\n  width: 100%;\n  margin-bottom: 60px;\n  top: 0;\n  left: 0;\n}\n\n.loader-progress>.loading {\n  margin: 0 auto;\n}\n\n.demo-card-square.mdl-card {\n  height: 210px;\n  width: 100%;\n}\n\n.custom-cell.mdl-cell--2-col {\n  width: calc(20% - 16px);\n}\n\n.custom-cell {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.demo-card-square>.mdl-card__title {\n  color: #fff;\n}\n\n.mdl-card__title {\n  position: relative;\n  transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  -ms-transition: all 0.3s ease;\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n}\n\n.mdl-card--expand:hover {\n  box-shadow: inset 0 0 0 9999px rgba(0, 0, 0, 0.3);\n  background-size: 130% !important;\n  cursor: pointer;\n}\n\n.mdl-card__supporting-text {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding: 6px 2px 2px 2px;\n  color: rgb(196, 48, 43);\n  text-align: right;\n  width: 97%;\n}\n\n.mdl-card__supporting-text .material-icons {\n  cursor: pointer;\n  font-size: 20px;\n}\n\n.video-name-block {\n  font-size: 11px;\n  font-weight: normal;\n  position: absolute;\n  left: 0;\n  top: 0;\n  height: 40px;\n  width: 100%;\n  background-color: rgba(0, 0, 0, 0.45);\n}\n\n.video-info-block {\n  font-size: 11px;\n  font-weight: normal;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  height: 30px;\n  width: 100%;\n  background-color: rgba(0, 0, 0, 0.45);\n}\n\n.video-informations {\n  padding: 8px;\n  text-align: center;\n}\n\n.video-informations i {\n  font-size: 11px;\n}\n\n.video-play-button {\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto;\n}\n\n.video-play-button i {\n  font-size: 50px;\n  visibility: hidden;\n}\n\n.mdl-card--expand:hover .video-play-button i {\n  visibility: visible;\n}\n\n.last-item {\n  margin-bottom: 45px;\n}\n\n@media (max-width: 479px) {\n  .custom-cell.mdl-cell--2-col {\n    width: calc(100% - 16px);\n  }\n}\n\n@media (max-width: 839px) and (min-width: 480px) {\n  .custom-cell.mdl-cell--2-col {\n    width: calc(50% - 16px);\n  }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 630:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(42)();
// imports


// module
exports.push([module.i, ".playlist {\n  height: calc(100% - 113px);\n  width: 5%;\n  max-width: 70px;\n  position: fixed;\n  top: 64px;\n  right: 0;\n  background-color: rgba(49, 68, 86, 1);\n  overflow-x: hidden;\n  -webkit-transition: 0.1s;\n  transition: 0.1s;\n  box-shadow: -2px 2px 2px 0 rgba(0, 0, 0, .14), -2px 3px 1px -2px rgba(0, 0, 0, .2), -2px 1px 5px 0 rgba(0, 0, 0, .12);\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.playlist.opened {\n  width: 24%;\n  max-width: 24%;\n  z-index: 993;\n  height: calc(100% - 114px);\n  box-shadow: none;\n}\n\n.playlist-thumbnail {\n  height: 55px;\n  width: 55px;\n  background: #000;\n  margin: 5px;\n  display: inline-block;\n  position: relative;\n}\n\n.playist-item.playing {\n  background: rgba(196, 48, 43, 0.95);\n}\n\n.playist-item-empty {\n  color: #fff;\n}\n\n.playist-item-empty .playlist-thumbnail {\n  text-align: center;\n}\n\n.playist-item-empty i {\n  margin-top: 10px;\n  font-size: 35px;\n}\n\n.playist-item:hover {\n  background: rgba(196, 48, 43, 0.5);\n  cursor: pointer;\n}\n\n.playist-item:hover .delete-from-playlist {\n  display: block;\n}\n\n.no-in-playlist {\n  color: #fff;\n  text-shadow: 2px 2px 2px #000;\n}\n\n.video-duration {\n  color: #fff;\n  text-shadow: 2px 2px 2px #000;\n  position: absolute;\n  bottom: -4px;\n  left: 1px;\n  font-size: 9px;\n}\n\n.opened-item-info {\n  display: inline-block;\n  color: rgba(255, 255, 255, 0.8);\n  position: absolute;\n  left: 70px;\n  margin-top: 8px;\n}\n\n.opened-item-info.closed {\n  display: none;\n}\n\n.delete-from-playlist {\n  position: absolute;\n  display: none;\n  bottom: 0;\n  right: 0;\n  color: #f44542;\n  background-color: rgba(0, 0, 0, 0.65);\n  font-size: 16px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 631:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(42)();
// imports


// module
exports.push([module.i, ".mdl-textfield--floating-label.is-focused>.mdl-textfield__label {\n  color: #fff;\n}\n\n.mdl-textfield__input {\n  border-bottom: 1px solid rgba(255, 255, 255, .12);\n}\n\n.mdl-textfield__label {\n  color: rgba(255, 255, 255, .26);\n}\n\n.mdl-textfield__label:after {\n  background-color: #fff;\n}\n\n.mdl-textfield {\n  width: 45%;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 634:
/***/ (function(module, exports) {

module.exports = "<main-list></main-list>\n\n<a href=\"https://github.com/SamirHodzic/ngx-youtube-player\">\n  <img src=\"assets/github-logo.png\" style=\"position: absolute; z-index: 9999; top: 12px; right: 6%; width: 40px;\">\n</a>"

/***/ }),

/***/ 635:
/***/ (function(module, exports) {

module.exports = "<div class=\"mdl-layout mdl-js-layout mdl-layout--fixed-header\">\n  <header class=\"mdl-layout__header\" style=\"background-color: rgb(79, 111, 144);\">\n    <div class=\"mdl-layout__header-row\">\n      <div class=\"mdl-layout-title\" style=\"width: 12%;\">\n        <img src=\"assets/logo.png\" style=\"height: 35px;\">\n      </div>\n      <nav class=\"mdl-navigation mdl-layout--large-screen-only\" style=\"width: 100%;\">\n        <videos-search (videosUpdated)=\"handleSearchVideo($event)\" [loadingInProgress]=\"loadingInProgress\" style=\"width: 100%;\"></videos-search>\n      </nav>\n      <div aria-expanded=\"false\" role=\"button\" tabindex=\"0\" class=\"mdl-layout__drawer-button mdl-layout--large-screen-only\" (click)=\"togglePlaylist()\">\n        <i class=\"material-icons\"></i>\n      </div>\n    </div>\n  </header>\n\n  <videos-playlist [repeat]=\"repeat\" [shuffle]=\"shuffle\" [playlistToggle]=\"playlistToggle\" [playlistNames]=\"playlistNames\" [videoPlaylist]=\"videoPlaylist\"></videos-playlist>\n\n  <main class=\"mdl-layout__content\" LazyScroll (OnScrollMethod)=\"searchMore()\" ScrollDistance=\"3\">\n    <div class=\"page-content\" [ngClass]=\"{'blur-main-playlist-opened': playlistToggle}\">\n      <videos-list *ngIf=\"videoList.length\" class=\"mdl-grid\" (videoPlaylist)=\"checkAddToPlaylist($event)\" [videoList]=\"videoList\" [loadingInProgress]=\"loadingInProgress\"></videos-list>\n      <div class=\"loader loader-video\" *ngIf=\"!videoList.length\">\n        <div class=\"loading\"></div>\n      </div>\n    </div>\n  </main>\n</div>\n\n<video-player (closePlaylist)=\"closePlaylist()\" (importPlaylist)=\"importPlaylist($event)\" (exportPlaylist)=\"exportPlaylist()\" (clearPlaylist)=\"clearPlaylist()\" (playFirstInPlaylist)=\"playFirstInPlaylist()\" (repeatActive)=\"repeatActive($event)\" (shuffleActive)=\"shuffleActive($event)\"\n  (nextVideoEvent)=\"nextVideo($event)\" (prevVideoEvent)=\"prevVideo($event)\"></video-player>\n\n<div id=\"demo-toast-example\" class=\"mdl-js-snackbar mdl-snackbar\">\n  <div class=\"mdl-snackbar__text\"></div>\n  <button class=\"mdl-snackbar__action\" type=\"button\"></button>\n</div>"

/***/ }),

/***/ 636:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-player-block\">\n  <div class=\"player-controls-block\">\n    <span class=\"mute-block\">\n\t\t\t<button id=\"fullscreen_tip\" class=\"mdl-button mdl-js-button mdl-button--icon\" [ngClass]=\"{'active': fullscreenActive}\" (click)=\"toggleFullscreen()\">\n\t\t\t\t<i class=\"material-icons\">fullscreen</i>\n\t\t\t</button>\n\t\t\t<div class=\"mdl-tooltip mdl-tooltip--top\" data-mdl-for=\"fullscreen_tip\">\n\t\t\t\tFullscreen\n\t\t\t</div>\n\t\t</span>\n    <button id=\"prev_tip\" class=\"mdl-button mdl-js-button mdl-button--icon prev\" (click)=\"prevVideo()\">\n\t\t\t<i class=\"material-icons\">skip_previous</i>\n\t\t</button>\n    <div class=\"mdl-tooltip mdl-tooltip--top\" data-mdl-for=\"prev_tip\">\n      Previous\n    </div>\n    <button class=\"mdl-button mdl-js-button mdl-button--icon play\" (click)=\"playPause('play')\" *ngIf=\"playingEvent === 'pause'\">\n\t\t\t<i class=\"material-icons\">play_circle_filled</i>\n\t\t</button>\n    <button class=\"mdl-button mdl-js-button mdl-button--icon play\" (click)=\"playPause('pause')\" *ngIf=\"playingEvent === 'play'\">\n\t\t\t<i class=\"material-icons\">pause_circle_filled</i>\n\t\t</button>\n    <button id=\"next_tip\" class=\"mdl-button mdl-js-button mdl-button--icon next\" (click)=\"nextVideo()\">\n\t\t\t<i class=\"material-icons\">skip_next</i>\n\t\t</button>\n    <div class=\"mdl-tooltip mdl-tooltip--top\" data-mdl-for=\"next_tip\">\n      Next\n    </div>\n    <span class=\"repeat-shuffle-block\">\n      <button id=\"repeat_tip\" class=\"mdl-button mdl-js-button mdl-button--icon\" [ngClass]=\"{'active': repeat}\" (click)=\"toggleRepeat()\">\n\t\t\t\t<i class=\"material-icons\">repeat_one</i>\n\t\t\t</button>\n\t\t\t<div class=\"mdl-tooltip mdl-tooltip--top\" data-mdl-for=\"repeat_tip\">\n\t\t\t\tRepeat one\n\t\t\t</div>\n      <button id=\"shuffle_tip\" class=\"mdl-button mdl-js-button mdl-button--icon\" [ngClass]=\"{'active': shuffle}\" (click)=\"toggleShuffle()\">\n\t\t\t\t<i class=\"material-icons\">shuffle</i>\n\t\t\t</button>\n\t\t\t<div class=\"mdl-tooltip mdl-tooltip--top\" data-mdl-for=\"shuffle_tip\">\n\t\t\t\tShuffle\n\t\t\t</div>\n    </span>\n  </div>\n  <div class=\"player-containter\" [ngClass]=\"{'minimized': minPlayer, 'super-minimized': superMinPlayer, 'player-fullscreen': fullscreenActive}\">\n    <div class=\"player-view-controls\">\n      <i class=\"material-icons\" *ngIf=\"!minPlayer && !superMinPlayer && !fullscreenActive\" (click)=\"togglePlayer()\">arrow_drop_down</i>\n      <i class=\"material-icons\" *ngIf=\"minPlayer && !superMinPlayer && !fullscreenActive\" (click)=\"togglePlayer()\">arrow_drop_up</i>\n      <i class=\"material-icons minimize\" *ngIf=\"!superMinPlayer && !fullscreenActive\" (click)=\"minimizePlayer()\">remove</i>\n    </div>\n    <div class=\"main-yt-player-block\">\n      <i class=\"material-icons\" *ngIf=\"superMinPlayer\" (click)=\"minimizePlayer()\">zoom_out_map</i>\n      <div id=\"yt-player\"></div>\n    </div>\n  </div>\n\n  <button id=\"demo-menu-top-right\" class=\"mdl-button mdl-js-button mdl-button--icon playlist-drop-button\" (click)=\"openClosedPlaylist()\">\n\t\t<i class=\"material-icons\">more_vert</i>\n\t</button>\n\n  <ul class=\"mdl-menu mdl-menu--top-right mdl-js-menu\" data-mdl-for=\"demo-menu-top-right\">\n    <li class=\"mdl-menu__item\" (click)=\"exportPlaylistAction()\">Export playlist</li>\n    <li class=\"mdl-menu__item\" (click)=\"importPlaylistAction()\">Import playlist</li>\n    <li class=\"mdl-menu__item\" (click)=\"clearPlaylistAction()\">Clear playlist</li>\n  </ul>\n\n  <input id=\"import_button\" style=\"display: none;\" type=\"file\" name=\"file\" accept=\".json, .txt\" (change)=\"handleInputChange($event)\">\n</div>"

/***/ }),

/***/ 637:
/***/ (function(module, exports) {

module.exports = "<div class=\"mdl-cell custom-cell mdl-cell--2-col\" id=\"{{i + video.id}}\" *ngFor=\"let video of videoList; let i = index;\" [ngClass]=\"{'last-item': i === videoList.length-1}\">\n  <div class=\"demo-card-square mdl-card mdl-shadow--2dp\">\n    <div class=\"mdl-card__title mdl-card--expand\" (click)=\"play(video)\" [ngStyle]=\"{'background': '#000 url(' + video.snippet.thumbnails.high.url + ') center center no-repeat', 'background-size': '125%'}\">\n      <div class=\"video-info-block\">\n        <div class=\"video-informations\">\n          <span style=\"float: left;\">\n\t\t\t\t\t\t<i class=\"material-icons\">thumb_up</i>\n\t\t\t\t\t\t{{ video.statistics.likeCount | videoLikes }}\n\t\t\t\t\t</span>\n          <span style=\"margin-left: 10px;\">\n\t\t\t\t\t\t<i class=\"material-icons\">remove_red_eye</i>\n\t\t\t\t\t\t{{ video.statistics.viewCount | videoViews}}\n\t\t\t\t\t</span>\n          <span style=\"margin-left: 10px; float: right;\">\n\t\t\t\t\t\t<i class=\"material-icons\">access_time</i>\n\t\t\t\t\t\t{{ video.contentDetails.duration | videoDuration }}\n\t\t\t\t\t</span>\n        </div>\n      </div>\n      <div class=\"video-name-block\">\n        <div class=\"video-informations\">\n          {{ video.snippet.title | playlistItemName }}\n        </div>\n      </div>\n      <div class=\"video-play-button\">\n        <i class=\"material-icons\">play_circle_filled</i>\n      </div>\n    </div>\n    <div class=\"mdl-card__supporting-text\">\n      <i (click)=\"addToPlaylist(video)\" class=\"material-icons\">playlist_add</i>\n    </div>\n  </div>\n</div>\n\n<div class=\"loader loader-progress\" *ngIf=\"loadingInProgress\">\n  <div class=\"loading\"></div>\n</div>"

/***/ }),

/***/ 638:
/***/ (function(module, exports) {

module.exports = "<div id=\"playlist\" class=\"playlist\" [ngClass]=\"{'opened': playlistToggle}\">\n  <div id=\"{{video.id}}\" class=\"playist-item\" *ngFor=\"let video of videoPlaylist; let i = index;\" (click)=\"play(video.id)\" [ngClass]=\"{'playing': currentPlaying(video.id)}\">\n    <div class=\"playlist-thumbnail\" [ngStyle]=\"{'background': '#000 url(' + video.snippet.thumbnails.default.url + ') center center no-repeat', 'background-size': '100%'}\">\n      <span class=\"no-in-playlist\">{{ i + 1 }}</span>\n      <span class=\"video-duration\">{{ video.contentDetails.duration | videoDuration }}</span>\n      <i class=\"material-icons delete-from-playlist\" (click)=\"removeFromPlaylist(video)\">cancel</i>\n    </div>\n    <div class=\"opened-item-info\" [ngClass]=\"{'closed': !playlistToggle}\" *ngIf=\"playlistNames\">\n      {{ video.snippet.title | playlistItemName }}\n    </div>\n  </div>\n  <div class=\"playist-item-empty\" *ngIf=\"!videoPlaylist.length\">\n    <div class=\"playlist-thumbnail\" [ngStyle]=\"{'background': '#000'}\">\n      <i class=\"material-icons\">block</i>\n    </div>\n    <div class=\"opened-item-info\" [ngClass]=\"{'closed': !playlistToggle}\" *ngIf=\"playlistNames\">\n      Playlist is empty\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 639:
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"searchForm\" (ngSubmit)=\"doSearch($event)\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" formControlName=\"query\" type=\"text\" id=\"query\" autocomplete=\"off\">\n    <label class=\"mdl-textfield__label\" for=\"query\">Search</label>\n  </div>\n  <button type=\"submit\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n\t\t<i class=\"material-icons\">search</i>\n\t</button>\n</form>"

/***/ }),

/***/ 654:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(354);


/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotificationService = (function () {
    function NotificationService() {
        this.timeoutDuration = 3500;
    }
    NotificationService.prototype.showNotification = function (message) {
        var notification = document.querySelector('.mdl-js-snackbar');
        var data = {
            message: message,
            timeout: this.timeoutDuration
        };
        notification['MaterialSnackbar'].showSnackbar(data);
    };
    return NotificationService;
}());
NotificationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], NotificationService);

//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/notification.service.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_src_facade_browser__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notification_service__ = __webpack_require__(72);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubePlayerService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var YoutubePlayerService = (function () {
    function YoutubePlayerService(notificationService) {
        this.notificationService = notificationService;
        this.videoChangeEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */](true);
        this.playPauseEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */](true);
    }
    YoutubePlayerService.prototype.createPlayer = function () {
        var _this = this;
        var interval = setInterval(function () {
            if ((typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_src_facade_browser__["a" /* window */].YT !== "undefined") && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_src_facade_browser__["a" /* window */].YT && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_src_facade_browser__["a" /* window */].YT.Player) {
                _this.yt_player = new __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_src_facade_browser__["a" /* window */].YT.Player('yt-player', {
                    width: '440',
                    height: '250',
                    playerVars: {
                        iv_load_policy: '3',
                        rel: '0'
                    },
                    events: {
                        onStateChange: function (ev) {
                            _this.onPlayerStateChange(ev);
                        }
                    }
                });
                clearInterval(interval);
            }
        }, 100);
    };
    YoutubePlayerService.prototype.onPlayerStateChange = function (event) {
        var state = event.data;
        switch (state) {
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
    };
    YoutubePlayerService.prototype.playVideo = function (videoId) {
        if (!this.yt_player) {
            this.notificationService.showNotification("Player not ready.");
            return;
        }
        this.yt_player.loadVideoById(videoId);
        this.currentVideoId = videoId;
    };
    YoutubePlayerService.prototype.pausePlayingVideo = function () {
        this.yt_player.pauseVideo();
    };
    YoutubePlayerService.prototype.playPausedVideo = function () {
        this.yt_player.playVideo();
    };
    YoutubePlayerService.prototype.getCurrentVideo = function () {
        return this.currentVideoId;
    };
    YoutubePlayerService.prototype.resizePlayer = function (width, height) {
        this.yt_player.setSize(width, height);
    };
    return YoutubePlayerService;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]) === "function" && _a || Object)
], YoutubePlayerService.prototype, "videoChangeEvent", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]) === "function" && _b || Object)
], YoutubePlayerService.prototype, "playPauseEvent", void 0);
YoutubePlayerService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__notification_service__["a" /* NotificationService */]) === "function" && _c || Object])
], YoutubePlayerService);

var _a, _b, _c;
//# sourceMappingURL=/Users/samir/dev/ngx-youtube-player/src/youtube-player.service.js.map

/***/ })

},[654]);
//# sourceMappingURL=main.bundle.js.map