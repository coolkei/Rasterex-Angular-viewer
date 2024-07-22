import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RXCore } from 'src/rxcore';
import { RxCoreService } from 'src/app/services/rxcore.service';
import { MARKUP_TYPES } from 'src/rxcore/constants';

@Component({
  selector: 'rx-count-panel',
  templateUrl: './count-panel.component.html',
  styleUrls: ['./count-panel.component.scss'],
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class CountPanelComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;
  type: number = 0;
  color: string = '#333C4E';
  count: number = 0;
  name: string;
  placeholder = ['Circle', 'Square', 'Triangle', 'Diamond'];

  constructor(
    private readonly rxCoreService: RxCoreService) {}

    private _setDefaults(): void {
      this.type = 0;
      this.count = 0;
      this.name = '';
    }

  ngOnInit(): void {
    RXCore.markupCount(true, this.type);

    this._subscription = this.rxCoreService.guiMarkup$.subscribe(({markup, operation}) => {
      if (markup === -1 || markup.type != MARKUP_TYPES.COUNT.type || !operation.created) {
        this._setDefaults();
        return;
      }

      markup.AddAttribute('displayName', this.name || '');
    });
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  onDocumentClick(event): void {
    if (event.target.id == 'imageTemp') this.count++;
  }

  onCountTypeChange(type: number): void {
    this.count = 0;
    RXCore.markupCount(false);
    this.type = type;
    RXCore.markupCount(true, type);
  }

  onColorSelect(color: string): void {
    this.count = 0;
    this.color = color;
    RXCore.setGlobalStyle(true);
    RXCore.changeFillColor(color);
    RXCore.markUpFilled();
    RXCore.markupCount(false);
    RXCore.markupCount(true, this.type);
  }

  onSave(): void {
    this.count = 0;
    RXCore.markupCount(false);
    //RXCore.markupCount(true, this.type);
  }

}
