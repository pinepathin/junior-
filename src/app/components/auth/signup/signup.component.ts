import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth-service/auth.service";
import {FormBuilder, FormGroup, isFormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  //By adding the ! assertion (signupForm!), you're telling TypeScript that you will ensure signupForm is initialized in the ngOnInit method or elsewhere before it's used, effectively by passing the strict initialization check in the constructor.
  signupForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit() {
    // add the same properties in backend in sign up DTO
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required], // '' : null by default
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {validator: this.confirmationValidator})
  }

  private confirmationValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password != confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({passwordMisMatch: true})
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  //send the whole form of this method into auth service
  signup() {
    console.log('signup',this.signupForm?.value)
    this.authService.signup(this.signupForm.value).subscribe((response) => {
      console.log(response);
      if (response.id != null) {
        this.snackBar.open("You are registered successfully", 'Close', {duration: 5000});
        this.router.navigateByUrl('/login')
      } else {
        this.snackBar.open(response.message, 'Close', {duration: 5000})
      }
    }, (error: any) => {
      this.snackBar.open("Registration failed, please tray again later", 'Close', {duration: 5000})
    })
  }
}
