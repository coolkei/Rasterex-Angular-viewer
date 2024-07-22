import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RxCoreService } from "src/app/services/rxcore.service";

@Component({
    selector: 'rx-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
    @Input() x: number;
    @Input() y: number;
    @Input() show: boolean;
   @Output('onAction') onAction = new EventEmitter<string>();

   shouldPaste: boolean;

   constructor(
    private rxCoreService: RxCoreService
   ){}

   ngOnInit(): void {
        this.shouldPaste = this.rxCoreService._guiShouldPaste.getValue();
        this.rxCoreService.shouldPaste$.subscribe(value => {
            this.shouldPaste = value;
        })  
   }

    setAction(action: string) {
        this.onAction.emit(action)
    }
}