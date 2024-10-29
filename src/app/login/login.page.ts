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
  IonInput,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonToast,
  IonLabel,
  IonSpinner
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/fire';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonInput,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonToast,
    IonLabel,
    IonSpinner
  ],
})
export class LoginPage implements OnInit {
  formLogin!: FormGroup;
  inavlidInput: boolean = false;
  errorMessage: string = '';
  spinner: boolean = false
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  public async login() {
    if (this.formLogin.invalid) {
      this.errorMessage = 'Error al ingresar sus datos, intente de nuevo';
      this.inavlidInput = true;
      return;
    }
    
    this.spinner = true;
    signInWithEmailAndPassword(
      auth,
      this.formLogin.value.email,
      this.formLogin.value.password
    )
      .then((userCredential) => {
        const user = {
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.formLogin.reset();
        this.spinner = false;
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        this.errorMessage = 'Credenciales invalidas o inexistentes';
        this.inavlidInput = true;
        this.spinner = false;
        return;
      });
    this.inavlidInput = false;
  }
}
