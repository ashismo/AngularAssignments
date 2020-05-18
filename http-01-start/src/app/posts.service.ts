import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Post} from './post.model';
import {map} from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class PostsService {

    // ASHISH: Another way to handle error is using Subject
    error = new Subject<string>();
    
    constructor(private http: HttpClient) {}
    createAndStorePost(title: string, content: string) {
        const postData : Post = {title: title, content: content};

        this.http
            .post(
                'https://dummy-backed1.firebaseio.com/posts.json',
                postData
            )
            .subscribe(
                responseData => {
                    console.log(responseData);
                },
                error => {
                    this.error.next(error.message);
                }
            );
    }


    fetchPosts() {
        return this.http.get<{[key: string]: Post}>('https://dummy-backed.firebaseio.com/posts.json')
            // ASHISH: Transform data using pipe. Observers get data after the transformation of the data  
            .pipe(
            map(
                (response: {[key: string]: Post}) => {
                const postsArray = [];
                for(const key in response) {
                    if(response.hasOwnProperty(key)) {
                    postsArray.push({...response[key], id: key});
                    }
                }
                return postsArray;
                }
            )
        );
    }

    onDeletePosts() {
        return this.http.delete('https://dummy-backed.firebaseio.com/posts.json');
    }

}