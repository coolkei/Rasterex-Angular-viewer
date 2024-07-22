import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rx-accordion-toggle-button',
  templateUrl: './accordion-toggle-button.component.html',
  styleUrls: ['./accordion-toggle-button.component.scss']
})
export class AccordionToggleButtonComponent implements OnInit {
  @Input() value: boolean = false;
  @Output() onClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  handleOnClick() {
    this.value = !this.value;
    this.onClick.emit();
  }

}
