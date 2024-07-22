import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'rx-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  host: {
    '(document:click)': 'handleClickOutside($event)',
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class DropdownMenuComponent implements OnInit {
  @Input() align: 'left' | 'right' = 'left';
  @ViewChild('button') button: ElementRef;
  public opened: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  handleDropdown(): void {
    this.opened = !this.opened;
  }

  /* Listeners */
  handleClickOutside(event: any) {
    if (!this.opened) return;
    const clickedButton = this.button.nativeElement.contains(event.target);
    if (!clickedButton) {
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
