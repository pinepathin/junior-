import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LightGallery} from "lightgallery/lightgallery";
import {PostService} from "../../user-services/post-service/post.service";
import {ActivatedRoute} from "@angular/router";
import {CommentService} from "../../user-services/comment-service/comment.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import Routes from "../../../utils/routes";
import {StorageService} from "../../../services/auth-service/storage.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input()
  post: any;
  @Input()
  deletable: any;
  @Input()
  updatable:any;
  @Input()
  customContainer : string = ""
  @Output() deletePost = new EventEmitter<number>();
  postImages :any[] = [];
  gallerySettings:any =  {
    dynamic: true,
    plugins: [],
    dynamicEl: [],
  };
  private  lightGallery!: LightGallery;

  onGalleryInit = (detail: { instance: LightGallery; }) => {
    this.lightGallery = detail.instance;
  }
  constructor( private service: PostService,
               private activatedRoute: ActivatedRoute,
               private formBuilder: FormBuilder,
               private commentService: CommentService,
               private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.post){
      this.deletable = StorageService.isCurrentUser(this.post.owner.id);
      this.updatable = StorageService.isCurrentUser(this.post.owner.id);
      this.postImages = this.post.images ? this.post.images.map((imgObj: { uri: string; }) => {
        const url =  Routes.BASE_ENDPOINT  +  imgObj.uri;
        return {
          src : url ,
          thumb : url
        }
      }) : [];
      this.gallerySettings.dynamicEl = this.postImages;
    }
  }

  onDelete(){
    this.deletePost.emit(this.post.id)
  }

  openGallery(){
    console.log(this.lightGallery)
    this.lightGallery.openGallery();
  }
}
