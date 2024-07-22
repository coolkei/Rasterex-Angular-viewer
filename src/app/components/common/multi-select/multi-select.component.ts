import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rx-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  host: {
    '(document:click)': 'handleClickOutside($event)',
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class MultiSelectComponent {
  @Input() options: Array<any> = [];
  @Input() selected: Array<any>;
  @Input() dropPosition: 'bottom' | 'top' = 'bottom';
  @Input() disabled: boolean = false;
  @Input() transparent: boolean = true;
  @Input() allSelected: boolean = false;
  @Output() selectedChange = new EventEmitter<any>();

  public opened: boolean = false;

  constructor(private elem: ElementRef) { }

  ngOnInit(): void {
  }

  get label(): string {
    const selected = this.options.filter(option => option.selected);

    if (!selected.length) {
      this.allSelected = false
      return 'No selected';
    }

    if (selected.length == this.options.length) return 'All';

    if (selected.length == 1) {
      return selected[0].label;
    }

    return `${selected[0].label} (+${selected.length - 1} other${selected.length > 3 ? 's' : ''})`;
  }

  get hasSelections(): boolean {
    return this.options.some(option => option.selected);
  }

  handleSelect(item: any) {
    item.selected = !item.selected;
    this.allSelected = !this.options.some(option => !option.selected);
    this.selectedChange.emit(this.options.filter(o => o.selected).map(o => o.value));
  }

  handleSelectAll(): void {
    this.allSelected = !this.allSelected;
    this.options.forEach(option => { option.selected = this.allSelected; });
    this.selectedChange.emit(this.options.filter(o => o.selected).map(o => o.value));
  }

  handleDropdown(): void {
    if (this.disabled) return;
    this.opened = !this.opened;
  }

  /* Listeners */
  handleClickOutside(event: any) {
    if (!this.opened) return;

    const clickedInside = this.elem.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.opened = false;
    }
  }

  handleKeyboardEvents($event: KeyboardEvent) {
    if (this.opened) {
      $event.preventDefault();
    } else {
      return;
    }

    if ($event.code === 'Escape') {
      this.opened = false;
    }
  }

}
