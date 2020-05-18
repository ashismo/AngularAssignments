import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Post} from './post.model';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private http: HttpClient) {}
    createAndStorePost(title: string, content: string) {
        const postData : Post = {title: title, content: content};

        this.http
            .post(
                'https://dummy-backed.firebaseio.com/posts.json',
                postData
            )
            .subscribe(responseData => {
                console.log(responseData);
            });
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

}