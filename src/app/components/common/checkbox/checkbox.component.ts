import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'rx-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() label: string;
  @Input() value: boolean = false;
  @Output('valueChange') onValueChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  handleOnClick() {
    this.value = !this.value;
    this.onValueChange.emit(this.value);
  }

}
