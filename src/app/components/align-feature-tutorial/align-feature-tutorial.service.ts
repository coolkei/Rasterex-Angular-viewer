import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlignFeatureTutorialService {
  constructor() { }

  private _visible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public visible$: Observable<boolean> = this._visible.asObservable();
  public show(): void {
    this._visible.next(true);
  }
  public hide(): void {
    this._visible.next(false);
  }

}
