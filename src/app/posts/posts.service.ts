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
  getPosts() {
    //making sure we copy the array
    return [...this.posts];
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content }
    this.posts.push(post)
    this.postsUpdated.next([...this.posts])
  }
}