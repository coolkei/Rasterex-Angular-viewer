import { Directive, Input, HostListener } from '@angular/core';
import { RXCore } from 'src/rxcore';

@Directive({
  selector: '[stampTemplate]'
})
export class StampTemplateDirective {
  @Input() stampTemplate: any;

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    if (!event.dataTransfer) return;

    console.log(event.dataTransfer.effectAllowed);

    RXCore.markupSymbol(true);
    event.dataTransfer.effectAllowed = "move";

    

    event.dataTransfer.setData('Text', JSON.stringify(this.stampTemplate));
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent): void {
    RXCore.markupSymbol(false);
  }

}
