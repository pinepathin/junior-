import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {fromFetch} from "rxjs/fetch";
import EndPosints from "../../../utils/routes";
import {StorageService} from "../../../services/auth-service/storage.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() { }

  createComment(commentDto: any, image: File): Observable<any> {
    const form = new FormData()
    Object.keys(commentDto).forEach((key) => {
      form.append(key, commentDto[key]);
    })
    if (image){
      form.append("image", image);

    }

    return fromFetch(`${EndPosints.COMMENTS}` , {
      method : "POST",
      body : form,
      selector: response => response.json(),
      headers : { ...this.createAuthorizationHeader() }
    });
  }

  addCommentImage(file: any, commentId: number): Observable<any> {
    return fromFetch(`${EndPosints.ADD_COMMENT_IMG}/${commentId}` , {
      method : "POST",
      body : JSON.stringify(file),
      selector: response => response.json(),
      headers : { ...this.createAuthorizationHeader(), "Content-Type" : "application/json" }
    })
  }


  getCommentByPostId(postId: number , params : { page : any    } = { page : 0  }){
    return fromFetch(`${EndPosints.COMMENTS_OF_POST}/${postId}?${ new URLSearchParams(params).toString()}`, {
      selector: response => response.json(),
      headers: this.createAuthorizationHeader()
    });
  }


  setVote(commentId:number){
    return fromFetch(`${EndPosints.COMMENTS}/${commentId}/vote`, {
      method: "Post",
      selector: response => response.json(),
      headers: this.createAuthorizationHeader()
    });

  }

  clearVote(commentId:number){
    return fromFetch(`${EndPosints.COMMENTS}/${commentId}/unvote`, {
      method: "Post",
      selector: response => response.json(),
      headers: this.createAuthorizationHeader()
    });
  }



  createAuthorizationHeader() {
    return {
      "Authorization" :  "Bearer " + StorageService.getToken()
    }
  }
}
