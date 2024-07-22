import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { STAMP_TEMPLATES } from './stamp-templates';
import { RXCore } from 'src/rxcore';

@Component({
  selector: 'rx-stamp-panel',
  templateUrl: './stamp-panel.component.html',
  styleUrls: ['./stamp-panel.component.scss']
})
export class StampPanelComponent implements OnInit {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  templates: any = STAMP_TEMPLATES;
  opened: boolean = false;
  activeIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
  }

  onPanelClose(): void {
    this.onClose.emit();
  }
}
