import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rx-save-comparison-menu',
  templateUrl: './save-comparison-menu.component.html',
  styleUrls: ['./save-comparison-menu.component.scss'],
  host: {
    '(document:click)': 'handleClickOutside($event)'
  }
})
export class SaveComparisonMenuComponent {
  @Input() dropPosition: 'top' | 'bottom' = 'top';
  @Output() onSelect = new EventEmitter<any>();
  opened: boolean = false;

  options = [
    { value: 0, title: "Save" },
    { value: 1, title: "Export PDF" },
    { value: 2, title: "Save & Export" },
  ];

  constructor (private elem: ElementRef) {}

  /* Listeners */
  handleClickOutside(event: any) {
    if (!this.opened) return;
    const clickedInside = this.elem.nativeElement.contains(event.target);
    if (!clickedInside) {
        this.opened = false;
    }
  }

  onOptionSelect(option: any): void {
    this.opened = false;
    this.onSelect.emit(option);
  }
}
