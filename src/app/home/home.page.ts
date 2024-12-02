import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonButtons,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonLabel,
  IonItem,
  IonButton,
  IonToggle,
} from '@ionic/angular/standalone';
import { onValue, ref, set } from 'firebase/database';
import { addIcons } from 'ionicons';
import { homeOutline, timeOutline } from 'ionicons/icons';
import { database } from '../config/fire';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonMenuButton,
    IonButtons,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonLabel,
    IonItem,
    IonButton,
    IonToggle,
  ],
})
export class HomePage implements OnInit {
  powerValue!: number;
  textPower!: string;
  humidity!: string;
  tank!: string;
  displayName: string = '';
  filterValue!: number;
  textFilterWater!: string;

  constructor() {
    addIcons({ homeOutline, timeOutline });
  }

  ngOnInit(): void {
    this.getPower();
    this.getHumidity();
    this.getTank();
    this.getFilterWater();
    this.showDisplayName();
  }

  public power(event: Event) {
    const value = (event as CustomEvent).detail.value;
    const query = ref(database, 'apagar');
    if (this.powerValue === 1) set(query, value[0]);
    else set(query, value[1]);
  }

  public filterWater(event: Event) {
    const value = (event as CustomEvent).detail.value;
    const query = ref(database, 'filtro');
    if (this.filterValue === 1) set(query, value[0]);
    else set(query, value[1]);
  }

  public getPower() {
    const query = ref(database, 'apagar');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.powerValue = snap.val();
      this.textPower = this.powerValue === 1 ? 'Encendido' : 'Apagado';
    });
  }

  public getHumidity() {
    const query = ref(database, 'humedad');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.humidity = `${snap.val()}%`;
    });
  }

  public getTank() {
    const query = ref(database, 'tanque');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.tank = `${snap.val()}%`;
    });
  }

  public getFilterWater() {
    const query = ref(database, 'filtro');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.filterValue = snap.val();
      this.textFilterWater =
        this.filterValue === 1 ? 'Filtro activado' : 'Filtro desactivado';
    });
  }

  public showDisplayName() {
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('user')!);
      this.displayName = user.displayName;
    }, 1500);
  }
}
