import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RXCore } from 'src/rxcore';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  @Input() opened: boolean;
  @Input() annotation: any; 
  @Input() text: string;
  @Input() action: string;
  @Output() closed = new EventEmitter<void>();

  cancel() {
    this.opened = false;
    this.closed.emit();
  }

  confirm(action): void {
    if (action === 'FOLLOW') { window.open(this.annotation.linkURL, '_blank'); } 
    else { this.annotation.bhaveLink = false; RXCore.deleteMarkUp(); }
    this.cancel();
  }

  markupLink() {
    return this.annotation.linkURL.length > 70 ? this.annotation.linkURL.slice(0, 70) + '...' : this.annotation.linkURL;
  }

}
