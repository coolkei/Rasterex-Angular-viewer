import { Injectable } from '@angular/core';
import { RxCoreService } from 'src/app/services/rxcore.service';
import { RXCore } from 'src/rxcore';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  constructor(private readonly rxCoreService: RxCoreService) {}

  private isPrint = false;
  private selectedPaperOrientation: any;
  private paperSize: any;
  private selectedPaperSize: any;

  getPrint() {
    return this.isPrint;
  }

  data(isPrint: boolean, selectedPaperOrientation: any = null, paperSize: any = null, selectedPaperSize: any = null ) {
    this.isPrint = isPrint;
    this.selectedPaperOrientation = selectedPaperOrientation;
    this.paperSize = paperSize;
    this.selectedPaperSize = selectedPaperSize;
  }

  print(fileInfo: any) {

    const paperOrientation = this.selectedPaperOrientation.value;
    let width;
    let height;

    const selectedMetricTitle = this.paperSize.find((paper) => paper.value === this.selectedPaperSize.value);

    if (selectedMetricTitle) {
      width = parseInt(selectedMetricTitle.dimensions[0]);
      height = parseInt(selectedMetricTitle.dimensions[1]);

      if (selectedMetricTitle.dimensions[2] === 'in') {
        width *= 25.4;
        height *= 25.4;
      }
    }

    const paperSize = {
      width: width,
      height: height,
      mode : paperOrientation === 'Auto' ? 0 : paperOrientation === 'Landscape' ? 2 : 1
    };

    RXCore.printSizeEx(paperSize);
  }
}