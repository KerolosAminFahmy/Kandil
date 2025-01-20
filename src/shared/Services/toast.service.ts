import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public MassegeToast = new BehaviorSubject<{severity: string, summary: string, detail: string,life:number}| null>(null);
  constructor() { }
  showMessage(severity: string, summary: string, detail: string,life:number=4000) {

    this.MassegeToast.next({severity:severity,summary:summary,detail:detail,life:life})
  }
}
