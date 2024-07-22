import { Directive, ElementRef, Input, EventEmitter, HostBinding, HostListener, Output, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[draggableFileTab]'
})
export class DraggableFileTabDirective {
  position: Position = { x: 0, y: 0 };
  private startPosition: Position;

  @Input() draggableFileTab: boolean = false;

  @Output() onDroppableZone: EventEmitter<number | undefined> = new EventEmitter<number | undefined>();
  @Output() onDrop: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('class.dragging') dragging = false;

  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  constructor(private el: ElementRef, private sanitizer: DomSanitizer) {}

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    event.stopPropagation();

    //if (!this.draggableFileTab) return;

    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    };
    this.dragging = true;
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    event.stopPropagation();

    if (!this.dragging) return;

    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;

    this.el.nativeElement.style.visibility = 'hidden';
    const efp = document.elementFromPoint(event.clientX, event.clientY);
    this.el.nativeElement.style.visibility = 'visible';

    if (efp) {
        const droppable: Element | null = efp.closest('.tab');
        if (droppable) {
          this.onDroppableZone.emit(Number(droppable.getAttribute("data-index")));
          return;
        }
    }

    this.onDroppableZone.emit(undefined);
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (!this.dragging) return;

    this.dragging = false;
    this.position = { x: 0, y: 0 };

    this.onDrop.emit();
  }
}
