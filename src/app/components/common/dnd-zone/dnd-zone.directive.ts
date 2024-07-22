import { Output, Directive, EventEmitter, HostListener } from "@angular/core";

@Directive({
    selector: '[dnd-zone]'
})
export class DndZoneDirective {
    @Output('onDrop') onDrop = new EventEmitter<FileList>();
    @Output('onDragLeave') onDragLeave = new EventEmitter();
    @Output('onDragOver') onDragOver = new EventEmitter();
    @Output('onDropError') onDropError: EventEmitter<string> = new EventEmitter<string>();

    @HostListener('drop', ['$event'])
    private handleDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();

        const files = event.dataTransfer?.files;
        if (files?.length) {
            this.onDrop.emit(files);
        }
    }

    @HostListener('dragover', ['$event'])
    private handleDragOver(event: DragEvent): void {
        event.stopPropagation();
        event.preventDefault();
        this.onDragOver.emit();
    }

    @HostListener('dragleave', ['$event'])
    private hanldeDragLeave(event: DragEvent): void {
        this.onDragLeave.emit();
    }
}
