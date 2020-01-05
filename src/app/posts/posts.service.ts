import { HttpClient } from '@angular/common/http';
import { Post } from './post.model'
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

//When post is updated on post-create page, post-list is not updating the page. We use rxjs.
import { Subject } from 'rxjs'
import { Router } from '@angular/router';
// @Injectable({providedIn: 'root'})
@Injectable()
export class PostsService {
  //To make sure this will not be edit directly, we set this a private
  private posts: Post[] = []
  //pasing Post object as a payload
  private postsUpdated = new Subject<Post[]>()

  //To access to express to communicate with backend, we are installing http client.
  constructor(private http: HttpClient, private router: Router) { }

  getPosts() {
    //making sure we copy the array
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts])
      })
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts/' + id)
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content }
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        const postId = responseData.postId
        post.id = postId
        this.posts.push(post)
        this.postsUpdated.next([...this.posts])
        this.router.navigate(["/"])
      })
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http.put('http://localhost:3000/api/posts/' + id, post).subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts])
      this.router.navigate(["/"])
    });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatePosts = this.posts.filter(post => post.id !== postId)
        this.posts = updatePosts
        this.postsUpdated.next([...this.posts])
      })
  }
}