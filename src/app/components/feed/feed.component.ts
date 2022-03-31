import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './../../auth/api.service';
import { Post } from './../../models/post';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  private sub!: Subscription;
  posts: Post[] = [];
  addPostForm: any;
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor(
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    public fb: FormBuilder,
    private router: Router
  ) {
    this.addPostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image_url: [''],
    });
  }

  ngOnInit(): void {
    this.getAllPost();
    //this.getCounterComment();
  }

  // Récupération de tous les posts [A paginer par la suite]
  getAllPost(): void {
    this.apiService.getAllPosts().subscribe((res) => {
      this.posts = res;
      console.log(this.posts);
    });
  }

  // changement de vue pour commentaires détaillés
  navigateToComments(id: number): void {
    console.log(id);
  }

  // Destruction du post
  navigateToDestroy(id: number): void {
    console.log(id);
  }

  submit(): any {
    console.log(this.addPostForm.value);
    this.apiService.createPost(this.addPostForm.value).subscribe();
    this._snackBar.open('Post created', '', {
      duration: 2000,
    });
    this.getAllPost();
    this.router.navigate(['/feed']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
