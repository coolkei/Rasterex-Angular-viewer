import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RxCoreService } from 'src/app/services/rxcore.service';
import { RXCore } from 'src/rxcore';
import { MARKUP_TYPES } from 'src/rxcore/constants';
import { IMarkup } from 'src/rxcore/models/IMarkup';
import { AnnotationToolsService } from '../annotation-tools.service';

@Component({
  selector: 'rx-erase-panel',
  templateUrl: './erase-panel.component.html',
  styleUrls: ['./erase-panel.component.scss']
})
export class ErasePanelComponent implements OnInit, OnDestroy {
  private _guiMarkupSubscription: Subscription;
  private _erasePanelStateSubscription: Subscription;

  visible: boolean = false;
  strokeThickness: number = 1;
  markup: IMarkup | -1;

  constructor(
    private readonly rxCoreService: RxCoreService,
    private readonly service: AnnotationToolsService) {}

  ngOnInit(): void {
    this._guiMarkupSubscription = this.rxCoreService.guiMarkup$.subscribe(({markup, operation}) => {
      this.markup = -1;
      if (markup === -1 || operation.deleted || !(markup.type == MARKUP_TYPES.ERASE.type && markup.subtype == MARKUP_TYPES.ERASE.subType)) {
        this.visible = false;
        this.strokeThickness = 1;
        return;
      }

      this.markup = markup;
      this.strokeThickness = markup.linewidth;

      if (operation.created) {
        setTimeout(() => {
          RXCore.selectMarkUpByIndex(markup.markupnumber);
        }, 100);
        this.visible = true;
      }
    });

    this._erasePanelStateSubscription = this.service.erasePanelState$.subscribe(state => {
      this.visible = state?.visible;
    });
  }

  ngOnDestroy(): void {
      if (this._guiMarkupSubscription) {
        this._guiMarkupSubscription.unsubscribe();
      }
      if (this._erasePanelStateSubscription) {
        this._erasePanelStateSubscription.unsubscribe();
      }
  }

  onStrokeThicknessChange(): void {
    RXCore.setLineWidth(this.strokeThickness);
  }
}
