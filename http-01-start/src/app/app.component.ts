import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];

  error: any = null;

  // ASHISH: Must unsubscribe once we destroy the component
  private errorSub: Subscription;

  constructor(private http: HttpClient,
      private postService: PostsService) {}

  ngOnInit() {

    // ASHISH: Subscribe to error message using Subject
    this.postService.error.subscribe(
      errorMessage => {
        this.error = errorMessage;
      }
    )

    this.onFetchPost()
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.onFetchPost();
  }

  onClearPosts() {
    // Send Http request
    this.postService.onDeletePosts().subscribe(
      () => {
        this.loadedPosts = [];
      }
    )
  }

  private onFetchPost() {
    this.postService.fetchPosts().subscribe(
      response => {
        this.loadedPosts = response;
      }, 
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onHandleError() {
    this.error = null;
  }
}
