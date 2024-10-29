import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonSpinner,
  IonLabel,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/fire';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonInput,
    IonButton,
    IonSpinner,
    IonLabel,
  ],
})
export class ForgotPasswordPage implements OnInit {
  formEmail!: FormGroup;
  errorMessage: string = '';
  isEmailInvalid: boolean = false;
  spinner: boolean = false;
  successSendEmail: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.formEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  public async sendEmail() {
    if (this.formEmail.invalid) {
      this.errorMessage = 'Email invalido';
      this.isEmailInvalid = true;
      return;
    }

    this.spinner = true;
    let email = this.formEmail.value.email;
    sendPasswordResetEmail(auth, email).then(async () => {
      this.successSendEmail = true;
      setTimeout(() => {
        this.formEmail.reset();
        this.spinner = false;
        this.successSendEmail = false;
        this.router.navigateByUrl('/login');
      }, 2200);
    });
  }
}
