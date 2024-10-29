import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonRouterOutlet,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButtons,
  IonMenuToggle,
  IonMenuButton,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { getAuth, signOut } from 'firebase/auth';
import { addIcons } from 'ionicons';
import { homeSharp, timeSharp, logOutSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    RouterLink,
    RouterLinkActive,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenu,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButtons,
    IonMenuToggle,
    IonMenuButton,
    IonSplitPane,
  ],
})
export class AppComponent {
  constructor(private readonly router: Router) {
    addIcons({ homeSharp, timeSharp, logOutSharp });
  }

  public logOut() {
    signOut(getAuth()).then();
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }
}
