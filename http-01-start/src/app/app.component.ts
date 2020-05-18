import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPost();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        'https://dummy-backed.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.onFetchPost();
  }

  onClearPosts() {
    // Send Http request
  }

  private onFetchPost() {
    this.http.get('https://dummy-backed.firebaseio.com/posts.json')
    // ASHISH: Transform data using pipe. Observers get data after the transformation of the data  
    .pipe(
      map(
        response => {
          const postsArray = [];
          for(const key in response) {
            if(response.hasOwnProperty(key)) {
              postsArray.push({...response[key], id: key});
            }
          }
          return postsArray;
        }
      )
    )
    .subscribe(
      posts => {
        console.log(posts);
      }
    );
  }
}
