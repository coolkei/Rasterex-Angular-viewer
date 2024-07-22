import { Component, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'rx-dnd-zone',
  templateUrl: './dnd-zone.component.html',
  styleUrls: ['./dnd-zone.component.scss']
})
export class DndZoneComponent {
  @Output('onDrop') fileDrop = new EventEmitter<Array<File>>();

  public dragging: boolean = false;

  constructor() {}

  @HostListener('dragenter', ['$event'])
  private handleDragEnter(event: DragEvent): void {
      event.stopPropagation();
      event.preventDefault();
      this.dragging = true;
  }

  @HostListener('body:dragenter', ['$event'])
  private onBodyDragEnter(event: DragEvent): void {
      event.preventDefault();
      event.stopPropagation();
      this.dragging = false;
  }

  /* Handlers */
  public onDrop(files): void {
      this.fileDrop.emit(files);
      this.dragging = false;
  }

  public onDragLeave(): void {
      this.dragging = false;
  }

  public onDropError(error: string): void {
      //this.toaster.warning(error);
      this.dragging = false;
  }
}
