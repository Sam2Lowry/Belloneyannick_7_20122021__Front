import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from './../add-post/add-post.component';
import { Subscription } from 'rxjs';
import { ApiService } from './../../auth/api.service';
import { Post } from './../../models/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  private sub!: Subscription;
  posts: Post[] = [];
  hidden = false;
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor(private dialog: MatDialog, private apiService: ApiService) {}

  openDialog() {
    this.dialog.open(AddPostComponent);
  }

  ngOnInit(): void {
    this.getAllPost();
    //this.getCounterComment();
  }

  getAllPost(): void {
    this.apiService.getAllPosts().subscribe((res) => {
      this.posts = res;
      console.log(this.posts);
    });
  }

  /*getCounterComment(): void {
    this.apiService.getAllPosts().subscribe((res) => {
      this.posts = res;
      console.log(this.posts.length);
      return this.posts.length;
    });
  }
  */

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
}
