import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {PostService} from "../../user-services/post-service/post.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../user-services/comment-service/comment.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import Routes from "../../../utils/routes";
import {LightGallery} from "lightgallery/lightgallery";
import {subscribeOn} from "rxjs";
import {StorageService} from "../../../services/auth-service/storage.service";
import {compileClassMetadata} from "@angular/compiler";

@Component({
    selector: 'app-view-post',
    templateUrl: './view-post.component.html',
    styleUrls: ['./view-post.component.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class ViewPostComponent implements OnInit {

    postId: number = this.activatedRoute.snapshot.params["postId"]; // get postId from URL
    post: any;
    validateForm!: FormGroup;
    image!: File;
    imgPreview!: string | ArrayBuffer | null; // ArrayBuffer : specify the size of the buffer in bytes, and this size cannot be changed afterward.
    baseBackUrl: string = Routes.BASE_ENDPOINT
    isCommentsLoading: boolean = false;
    isLoading :boolean = false ;
    constructor(private service: PostService,
                private activatedRoute: ActivatedRoute,
                private formBuilder: FormBuilder,
                private commentService: CommentService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {

        this.validateForm = this.formBuilder.group({
            body: [null, Validators.required]
        })
        this.getPostById();

    }


    getPostById() {
        this.service.getPostById(this.postId).subscribe((res) => {
            this.post = res;
            console.log(res)

        })
    }

    addComment() {
        console.log(this.validateForm.value)

        this.commentService.createComment({...this.validateForm.value, postId: this.postId}, this.image).subscribe((res) => {
            console.log("Creat comment API response", res);
            if (res.id != null) {
                this.snackBar.open("Comment posted successfully", "close", {duration: 5000});
                this.getPostById();
                this.validateForm.reset();
                this.imgPreview = null;
            } else {
                this.snackBar.open("Something went wrong", "close", {duration: 5000});
            }
        })
    }

    onFileSelected(event: any) {
        this.image = event.target.files[0]; // take file from html
        this.previewImage();
    }

    previewImage() {
        const reader = new FileReader();
        reader.onload = () => {
            this.imgPreview = reader.result;
        };
        reader.readAsDataURL(this.image);
    }


    fetchNextComments() {

        if (!this.post.comments.last) {

            this.isCommentsLoading = true;
            // 4 3 2 1 0 -1 -2 -3 -4
            // if get null of this.post?.comments?.number so we need to send request with page="number > -1" then (null ?? -1) + 1 --> 0
            this.commentService.getCommentByPostId(this.postId, {page: (this.post?.comments?.number ?? -1) + 1})
                .subscribe((newPage) => {
                    //   console.log('fffff', newPage)
                    const tempComments = this.post.comments.content;
                    newPage.content = [...tempComments, ...newPage.content];
                    this.post.comments = newPage;
                    this.isCommentsLoading = false;
                })
        }


    }

    isCurrentUserHasVote( votes : []){
        return  votes.filter((voteObj:any) => {
            return StorageService.isCurrentUser(voteObj.userId);
        }).length > 0

    }



    toggleVote(commentIndex : number , commentId : number) {
        if (this.isLoading)
            return ;
       const hasVote: boolean = this.isCurrentUserHasVote(this.post.comments.content[commentIndex]?.votes ?? [])
        this.isLoading = true;
        if (!hasVote){
         this.commentService.setVote(commentId).subscribe(() => {

             this.post.comments.content[commentIndex].votes = [{ userId :  StorageService.getCurrentUser().id , commentId : commentId} ,
                 ...Array.from(this.post.comments.content[commentIndex].votes)
             ]
             this.isLoading = false ;
         })
        }else {
           this.commentService.clearVote(commentId).subscribe(() => {
               this.post.comments.content[commentIndex].votes = Array.from(this.post.comments.content[commentIndex].votes).filter((voteObj:any) => {
                   return !StorageService.isCurrentUser(voteObj.userId)
               })
               this.isLoading = false
           })
        }

    }

}
