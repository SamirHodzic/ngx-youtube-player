import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { NotificationService } from './notification.service';
import { YOUTUBE_API_KEY } from '../constants';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class YoutubeApiService {
  base_url = 'https://www.googleapis.com/youtube/v3/';
  max_results = 50;

  public nextToken: string;
  public lastQuery: string;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

  searchVideos(query: string): Promise<any> {
    const url = `${this.base_url}search?q=${query}&maxResults=${this.max_results}&type=video&part=snippet,id&key=${YOUTUBE_API_KEY}&videoEmbeddable=true`; // tslint:disable-line

    return this.http.get(url)
      .map(response => {
        let jsonRes = response; 
        let res = jsonRes['items'];
        this.lastQuery = query;
        this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;

        let ids = [];

        res.forEach((item) => {
          ids.push(item.id.videoId);
        });

        return this.getVideos(ids);
      })
      .toPromise()
      .catch(this.handleError)
  }

  searchNext(): Promise<any> {
    const url = `${this.base_url}search?q=${this.lastQuery}&pageToken=${this.nextToken}&maxResults=${this.max_results}&type=video&part=snippet,id&key=${YOUTUBE_API_KEY}&videoEmbeddable=true`; // tslint:disable-line

    return this.http.get(url)
      .map(response => {
        let jsonRes = response;
        let res = jsonRes['items'];
        this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;
        let ids = [];

        res.forEach((item) => {
          ids.push(item.id.videoId);
        });

        return this.getVideos(ids);
      })
      .toPromise()
      .catch(this.handleError)
  }

  getVideos(ids): Promise<any> {
    const url = `${this.base_url}videos?id=${ids.join(',')}&maxResults=${this.max_results}&type=video&part=snippet,contentDetails,statistics&key=${YOUTUBE_API_KEY}`; // tslint:disable-line

    return this.http.get(url)
      .map(results => {
        return results['items'];
      })
      .toPromise()
      .catch(this.handleError)
  }

  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    if (error instanceof ErrorEvent) {
      
      errMsg = 'An error occurred:' + error.error.message ;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    this.notificationService.showNotification(errMsg);
    return throwError(
      'Something bad happened; please try again later.'); 
  }
}
