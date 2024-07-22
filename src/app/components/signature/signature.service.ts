import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { RXCore } from 'src/rxcore';
import { ISignatures, ISignatureData } from 'src/rxcore/models/ISignatures';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {
  constructor() {
    RXCore.onGuiPutSignatureComplete((username: string) => {
      this.getSignatures();
    });

    RXCore.onGuiGetSignatureComplete((signature: ISignatureData) => {
      if (signature) {
        signature.src = window.URL.createObjectURL(signature.data);
      }

      if (signature.initials) {
        this._signatures.initials = signature;
      } else {
        this._signatures.signature = signature;
      }

      this.signatures.next(this._signatures);
    });
  }

  private _signatures: ISignatures = {
    signature: undefined,
    initials: undefined,
  };

  private signatures: BehaviorSubject<ISignatures | undefined> = new BehaviorSubject<ISignatures | undefined>(undefined);
  public signatures$: Observable<ISignatures | undefined> = this.signatures.asObservable();

  public getSignatures(): void {
    RXCore.downloadSignature("Demo");
    RXCore.downloadSignature("Demo", true);
  }

  public putSignature(PNGImage: any, initials: boolean = false): void {
    RXCore.uploadSignature(PNGImage, "Demo", initials);
  }

  public adoptSignatureOpened: BehaviorSubject<{ opened: boolean, mode: 'create' | 'editSignature' | 'editInitials' }> = new BehaviorSubject<{ opened: boolean, mode: 'create' | 'editSignature' | 'editInitials' }>({ opened: false, mode: 'create' });
  public adoptSignatureOpened$: Observable<{ opened: boolean, mode: 'create' | 'editSignature' | 'editInitials' }> = this.adoptSignatureOpened.asObservable();

  public applySignatureInAllBlocks: Subject<ISignatureData> = new Subject<ISignatureData>();
  public applySignatureInAllBlocks$: Observable<ISignatureData> = this.applySignatureInAllBlocks.asObservable();

}
