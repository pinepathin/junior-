import {Component, OnInit} from '@angular/core';

import {PostService} from "../../user-services/post-service/post.service";
import Routes from "../../../utils/routes";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // showComments = false;
  liked = false;
  usertofind: string = '';
  alluser: any[] = [];

  posts: any[] = [];
  pageNum: number = 0;
  baseBackend: string = Routes.BASE_ENDPOINT;
  total!: number;
  constructor(private service: PostService) {}

  ngOnInit() {
    this.getAllPosts();
    this.getUsers();
  }

  getAllPosts() {
    this.service.getAllPosts(this.pageNum).subscribe((res: any) => {
      this.posts = res.content;
      this.total = res.totalPages * 5;
    });
  }

  deletePost = (postId: number) => {
    this.service.deletePostById(postId).subscribe((res) => {
      this.posts = this.posts.filter((e) => e.id != postId);
    });
  };

  //The current page index defaults to 0, but can be explicitly set via pageIndex.
  pageIndexChange(event: any) {
    this.pageNum = event.pageIndex;
    this.getAllPosts();
  }

  getUsers() {
    
    fetch('http://localhost:8081/api/auth/all/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('c_token'),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // This returns a promise that resolves with the JSON parsed body text
      })
      .then((data) => {
        /*
        {
          PARCIPANTS=[USER1,USER2]
        }
  
  */ this.alluser = data;
      });
  


  }
}
