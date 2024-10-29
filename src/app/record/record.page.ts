import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonMenuToggle,
  IonMenuButton,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, timeOutline } from 'ionicons/icons';
import { onValue, ref } from 'firebase/database';
import { database } from '../config/fire';
import { IRecord } from '../interfaces/irecord';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    IonMenuToggle,
    IonMenuButton,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonButton,
  ],
})
export class RecordPage implements OnInit {
  water!: string;
  records: IRecord[] = [];
  inputDateValue!: string;

  constructor() {
    addIcons({ homeOutline, timeOutline });
  }

  ngOnInit(): void {
    this.getWater();
    this.getRecords();
  }

  public captureDateValue(event: Event) {
    this.inputDateValue = (event as CustomEvent).detail.value;
  }

  public getWater() {
    const query = ref(database, 'agua');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.water = `${snap.val()} Litros`;
    });
  }

  public getRecords() {
    const query = ref(database, 'historial');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      const values = Object.values(snap.val() as IRecord[]).reverse();
      const currentDate = new Date();
      if (!this.inputDateValue) {
        this.records = this.filter(values, currentDate);
      } else {
        this.records = this.filter(
          values,
          new Date(this.inputDateValue)
        );
      }
    });
  }

  public formatDateRecord(date: Date) {
    let y = date.getFullYear();
    let m = (date.getMonth() + 1).toString().padStart(2, '0');
    let d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}T00:00:00`;
  }

  public filter(array: IRecord[], date: Date) {
    return array.filter(
      (a) =>
        new Date(this.formatDateRecord(new Date(a.date))).getTime() ===
        new Date(this.formatDateRecord(date)).getTime()
    );
  }
}
