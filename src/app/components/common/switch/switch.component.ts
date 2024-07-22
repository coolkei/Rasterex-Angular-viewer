import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rx-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
  private _checked: boolean;

  @Input()
  set checked(v: boolean) {
    this._checked = v !== false;
  }

  get checked() {
    return this._checked;
  }

  @Output('change') onChange = new EventEmitter<boolean>();

  onClick(event: MouseEvent): void {
    this.checked = !this.checked;

    // Component events
    //this.change.emit(this.checked);
    this.onChange.emit(this.checked);
    //this.changeEvent.emit(event);

    // value accessor callbacks
    //this.onChangeCallback(this.checked);
    //this.onTouchedCallback(this.checked);
    //this.cdr.markForCheck();
  }
}
