import { Component } from '@angular/core';
// import { Post } from './posts/post.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MEAN-stack';
  //posts each element has to be {}. but we do not have any structure:
  //storedPosts = []
  //instead, we use interface Post 
  // storedPosts: Post[] = [];

  // onPostAdded(post) {
  //   this.storedPosts.push(post)
  // }
}
