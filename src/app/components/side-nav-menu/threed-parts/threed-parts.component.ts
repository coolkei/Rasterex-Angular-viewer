import { Component } from '@angular/core';
import { RXCore } from 'src/rxcore';
import { IBlock3D } from 'src/rxcore/models/IBlock3D';
import { TreeviewItem } from '../../common/treeview/models/treeview-item';
import { TreeviewConfig } from '../../common/treeview/models/treeview-config';
import { RxCoreService } from 'src/app/services/rxcore.service';

@Component({
  selector: 'rx-threed-parts',
  templateUrl: './threed-parts.component.html',
  styleUrls: ['./threed-parts.component.scss']
})
export class ThreedPartsComponent {
  tabActiveIndex: number = 0;
  select3DVectorBlock: boolean = false;

  config = TreeviewConfig.create({
    hasFilter: false,
    decoupleChildFromParent: true
  });

  items: Array<TreeviewItem>;

  constructor(private readonly rxCoreService: RxCoreService) {
    this.rxCoreService.guiState$.subscribe((state) => {
      this.tabActiveIndex = 0;
      this.select3DVectorBlock = false;
    });
  }

  private _getItems(parts: Array<IBlock3D>): Array<TreeviewItem> {
    const items: Array<TreeviewItem> = [];
    for (let part of parts) {
      const item = new TreeviewItem({
        text: part?.name || '',
        value: part,
        checked: part.state
      });

      if (part.children?.length) {
        item.children = this._getItems(part.children);
      }

      items.push(item);
    }

    return items;
  }

  private _itemCheckedChange(checked: boolean, node: IBlock3D): void {
    let meshid: Array<any> = [];
    if (node.globalid) {
      meshid = RXCore.search3dAttributes(node.globalid);
    } else {
      meshid = RXCore.search3dAttributes(node.name);
    }

    if (meshid.length > 0) {
      for(let mi = 0; mi < meshid.length; mi++) {
        const globid = meshid[mi].userData.name;
        RXCore.set3DBlockState(globid, checked);
      }
    }
  }

  ngOnInit(): void {
    this.rxCoreService.gui3DParts$.subscribe((parts) => {
      if (this.select3DVectorBlock) {
        this.select3DVectorBlock = false;
        return;
      }
      this.items = this._getItems(parts);
    });
  }

  onCheckedAllChange(state: boolean): void {
    RXCore.set3DBlockStateAll(state);
  }

  onItemCheckedChange(event: TreeviewItem): void {
    this.select3DVectorBlock = false;
    this._itemCheckedChange(event.checked, event.value);
  }

  onItemClick(item: TreeviewItem): void {
    this.select3DVectorBlock = true;
    const meshid = RXCore.search3dAttributes(item.value.globalid);
    if (meshid.length > 0) {
      RXCore.select3DVectorBlock(meshid[0].userData.name);
    }
  }
}
