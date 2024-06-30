import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import EndPosints from "../../../utils/routes"
import {StorageService} from "../../../services/auth-service/storage.service";
import {fromFetch} from 'rxjs/fetch';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) {
    }

    createPost(postDto: any, images: File[]): Observable<any> {
        const form = new FormData()
        Object.keys(postDto).forEach((key) => {
            form.append(key, postDto[key])
        })
        Array.from(images).forEach((file) => {
            form.append("images", file)
        })
        return fromFetch(`${EndPosints.POSTS}`, {
            method: "POST",
            body: form,
            selector: response => response.json(),
            headers: {...this.createAuthorizationHeader()}
        })
    }


    updatePost(postId: number, postDto: any, images: File[]): Observable<any> {
        const form = new FormData()

        Object.keys(postDto).forEach((key) => {
            form.append(key, postDto[key])
            console.log("data", Object.keys(postDto));
        })


        Array.from(images).forEach((file) => {
            form.append("images", file)
        })

        return fromFetch(`${EndPosints.POSTS}/${postId}`, {
            method: "PATCH",
            body: form,
            selector: response => response.json(),
            headers: {...this.createAuthorizationHeader()}
        })
    }

    getAllPosts(pageNumber: number): Observable<any> {
        return fromFetch(`${EndPosints.POSTS}?page=${pageNumber}`, {
            selector: response => response.json(),
            headers: this.createAuthorizationHeader()
        })
    }

    getPostById(postId: number): Observable<any> {
        return fromFetch(`${EndPosints.POSTS}/${postId}`, {
            selector: response => response.json(),
            headers: this.createAuthorizationHeader()
        })
    }


    deletePostById(postId: number): Observable<any> {
        return fromFetch(`${EndPosints.POSTS}/${postId}`, {
            method: "DELETE",
            headers: this.createAuthorizationHeader()
        })
    }

    // create post is forbidden so need to get token from header
    createAuthorizationHeader() {
        return {
            "Authorization": "Bearer " + StorageService.getToken()
        }
    }
}
