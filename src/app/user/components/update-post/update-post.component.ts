import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../user-services/post-service/post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import Routes from "../../../utils/routes";

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit{

  postId!: number;
  tags: any[] = []; // it could be of Tags[] type instead of any
  isSubmitting! : boolean;
  images: File[] = [];
  previewImages!:any[];
  addOnBlur = true;
  validateForm!: FormGroup;

  readonly separatorKeycodes = [ENTER, COMMA] as const;
  announcer = inject(LiveAnnouncer);
  constructor(private service: PostService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    // add tag
    if (value) {
      this.tags.push( value);
    }
    //remove input value
    event.chipInput!.clear();
  }

  remove(tag: any) {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.announcer.announce(`Removed${tag}`);
    }
  }

  edit(tag: any, event: MatChipEditedEvent) {
    const value = event.value.trim();
    // remove a tag if no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }
    //edit existing tag
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.push(value) ;
    }
  }

  ngOnInit(): void {

    this.validateForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: ['', Validators.required],
    });

    this.route.paramMap.subscribe(params => {
      const postIdParam = params.get('postId');
      if (postIdParam) {
        this.postId = Number(postIdParam);
        console.log('Post ID:', postIdParam);
        this.service.getPostById(this.postId).subscribe(postData => {
          // Once you have the post data, set it as the initial values of the form controls.
          console.log(postData)
          this.tags = postData.tags ?? []
          this.previewImages = postData.images? postData.images.map((imgObj: { uri: string; }) => {
            return Routes.BASE_ENDPOINT + imgObj.uri
          }) : [];
          this.validateForm.setValue({
            title: postData.title,
            body: postData.body,
            tags: postData.tags,
          });
        });
      } else {
        console.error('Post ID not found in URL');
      }
    });
  }


  onFileSelected(event: any) {
    this.images = event.target.files; // take file from html
    this.updatePreviewImages();
  }

  updatePreviewImages() {
    this.previewImages = [];

    Array.from(this.images).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImages = [...this.previewImages , reader.result]
      };
      reader.readAsDataURL(file);
    })
  }

  updatePost() {
    if (!this.postId) {
      console.error('Post ID not available for update');
      return;
    }
    // Get the updated post data from the form.
    const updatedPostData = this.validateForm.value;

    // Call the service to update the post.
    this.service.updatePost(this.postId, updatedPostData , this.images ).subscribe(res => {
      this.router.navigate(['/user/dashboard']);

    });
  }

}
