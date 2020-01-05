import { PostsService } from './../posts.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model'
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

//It is not recommended to call postsService.getPosts() inside constructor. Therefore we "implements"
export class PostListComponent implements OnInit, OnDestroy {
  //@Input() posts: Post[] = []
  posts: Post[] = []
  //constructor(public postsService: PostsService) automatically create postsService instance.
  isLoading = false;
  private postsSub: Subscription;
  //instanceName: PostsService <<< invoking PostsService class and assign to instanceName.
  //I can access to methods by instanceName.addPosts()
  //public means that we create set it up as state.
  constructor(public postsService: PostsService) {
    // console.log(postsService)
    // this.posts = postsService.getPosts()
  }

  //when we import OnInit, we have to deploy ngOnInit too
  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    //ro make sure this subscription is destroied when we finish, we add OnDestroy
    this.postsSub = this.postsService.getPostUpdatedListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts
    })
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId)
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe()
  }

} 