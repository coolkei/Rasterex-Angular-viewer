import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  private notificationSubject = new BehaviorSubject<any>({});
  public notification$ = this.notificationSubject.asObservable();

  notification(data: any): void {
    this.notificationSubject.next(data);
  }
}
