import { PostsService } from './../posts.service';
import { Component, Output, EventEmitter, } from '@angular/core';

import { Post } from '../post.model'
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  //exporting postCreated value to outside this component
  //@Output() postCreated = new EventEmitter<Post>();

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    //const post: Post = { title: form.value.title, content: form.value.content };
    this.postCreate.addPost(form.value.title, form.value.content)
    form.resetForm()
    //this.postCreated.emit(post)
  }

  constructor(public postCreate: PostsService) { }



}