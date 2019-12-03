import { HttpClient } from '@angular/common/http';
import { Post } from './post.model'
import { Injectable } from '@angular/core';


//When post is updated on post-create page, post-list is not updating the page. We use rxjs.
import { Subject } from 'rxjs'
// @Injectable({providedIn: 'root'})
@Injectable()
export class PostsService {
  //To make sure this will not be edit directly, we set this a private
  private posts: Post[] = []
  //pasing Post object as a payload
  private postsUpdated = new Subject<Post[]>()

  //To access to express to communicate with backend, we are installing http client.
  constructor(private http: HttpClient) { }

  getPosts() {
    //making sure we copy the array
    this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts])
      })
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content }
    this.http.post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log('receving responce?', responseData.message)
        this.posts.push(post)
        this.postsUpdated.next([...this.posts])
      })
  }
}