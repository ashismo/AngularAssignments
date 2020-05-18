import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  error: any = null;

  constructor(private http: HttpClient,
      private postService: PostsService) {}

  ngOnInit() {
    this.onFetchPost()
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
}
