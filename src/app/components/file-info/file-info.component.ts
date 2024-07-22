import { Component } from '@angular/core';
import { RXCore } from 'src/rxcore';
import { PrintService } from '../print/print.service';
import { RxCoreService } from 'src/app/services/rxcore.service';

@Component({
  selector: 'file-info',
  templateUrl: './file-info.component.html',
  styleUrls: ['./file-info.component.scss']
})
export class FileInfoComponent {
  fileInfo: {};
  infoPanelVisible: boolean = false;
  groups = [ {"name": "Properties"}, {"name": "Fonts"}, {"name": "Xrefs"}];
  selected = this.groups[0];

  constructor(private printService: PrintService, private readonly rxCoreService: RxCoreService) {
    this.rxCoreService.guiState$.subscribe(() => {
      this.infoPanelVisible = false;
      this.fileInfo= {};
    });
  }

  ngOnInit() {
    RXCore.onGuiFileInfo((fileInfo) => {
      this.fileInfo = fileInfo;

      if (this.printService.getPrint()) {
        this.printService.print(fileInfo);
      } else if (!this.infoPanelVisible) {
        this.infoPanelVisible = true;
      }
    });
  }
}
