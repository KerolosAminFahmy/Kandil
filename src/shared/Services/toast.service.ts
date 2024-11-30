import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public MassegeToast = new BehaviorSubject<{severity: string, summary: string, detail: string}>({severity:"severity",summary:"",detail:""});
  constructor() { }
  showMessage(severity: string, summary: string, detail: string) {
    this.MassegeToast.next({severity:severity,summary:summary,detail:detail})
  }
}
