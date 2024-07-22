import { Component, OnInit } from '@angular/core';
import { RxCoreService } from 'src/app/services/rxcore.service';
import { RXCore } from 'src/rxcore';
import { IVectorBlock } from 'src/rxcore/models/IVectorBlock';
import { IVectorLayer } from 'src/rxcore/models/IVectorLayer';

@Component({
  selector: 'rx-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {
  vectorBlocksAll: boolean = true;
  vectorBlocks: Array<IVectorBlock> = [];

  constructor(private readonly rxCoreService: RxCoreService) {}

  ngOnInit(): void {
    this.rxCoreService.guiVectorBlocks$.subscribe((blocks) => {
      this.vectorBlocks = blocks;
    });
  }

  onVectorBlocksAllSelect(onoff: boolean): void {
    this.vectorBlocksAll = onoff;
    RXCore.vectorBlocksAll(onoff);
  }

  onVectorBlockClick(block: IVectorBlock): void {

    if(block.state == 1){
      block.state = 0;
    }else{
      block.state = 1;
    }
    //block.state = !block?.state;
    RXCore.changeVectorBlock(block?.index);
  }
}
