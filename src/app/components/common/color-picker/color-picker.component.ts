import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rx-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  @Input() value: string = "#000000FF";
  @Input() allowCustomColor: boolean = true;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  opened: boolean = false;

  constructor() { }

  @Input() defaultColors = [
    "#A52A2AFF",
    "#E4A49CFF",
    "#F6C986FF",
    "#FBE7A9FF",
    "#99E2B5FF",
    "#A6E6E7FF",
    "#A5A1E1FF",
    "#D7A4E2FF",
    "#F09336FF",
    "#F7CF5FFF",
    "#57BE69FF",
    "#52C1C2FF",
    "#7871E2FF",
    "#453BE7FF",
    "#760C8CFF",
    "#CD5EE4FF",
    "#7D2E25FF",
    "#844C14FF",
    "#F9B700FF",
    "#F7CF5FFF",
    "#57BE69FF",
    "#52C1C2FF",
    "#3D7C48FF",
    "#198688FF",
    "#FFFFFFFF",
    "#CCCDCDFF",
    "#9C9D9CFF",
    "#696969FF",
    "#000000FF",
    "#52C1C2FF",
    "#3D7C48FF",
    "#198688FF"
  ];

  ngOnInit(): void {
  }

  onColorSelect(color: string): void {
    this.valueChange.emit(color);
  }

  onColorPick(event: any): void {
    this.value = event.color.hex;
  }

  onOk() {
    this.valueChange.emit(this.value);
    this.opened = false;
  }

}
