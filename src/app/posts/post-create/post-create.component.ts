import { PostsService } from './../posts.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { Post } from '../post.model'
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  //exporting postCreated value to outside this component
  //@Output() postCreated = new EventEmitter<Post>();
  enteredTitle = '';
  enteredContent = '';
  post: Post;
  isLoading = false
  private mode = 'create';
  private postId: string;

  constructor(public postService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId')
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = { id: postData._id, title: postData.title, content: postData.content }
        })
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }


  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content)
    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content)
    }
    //const post: Post = { title: form.value.title, content: form.value.content };
    form.resetForm()
    //this.postServiced.emit(post)
  }




}