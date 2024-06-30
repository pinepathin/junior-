import {Component, OnInit} from '@angular/core';
import {PostService} from "../../user-services/post-service/post.service";
import Routes from "../../../utils/routes";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // showComments = false;
  liked = false;

  posts: any[] = [];
  pageNum: number = 0;
  baseBackend :string = Routes.BASE_ENDPOINT;
  total!: number;
  constructor(private service: PostService) {
  }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.service.getAllPosts(this.pageNum).subscribe((res: any) => {
      this.posts = res.content;
      this.total = res.totalPages * 5;
    })
  }

  deletePost = (postId: number) =>  {
    this.service.deletePostById(postId).subscribe(res => {
      this.posts = this.posts.filter((e) => e.id != postId)
    });
  }

  //The current page index defaults to 0, but can be explicitly set via pageIndex.
  pageIndexChange(event: any) {
    this.pageNum = event.pageIndex;
    this.getAllPosts();
  }

}
