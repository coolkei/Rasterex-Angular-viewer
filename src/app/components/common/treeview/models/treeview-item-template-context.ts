import { TreeviewItem } from './treeview-item';

export interface TreeviewItemTemplateContext {
  item: TreeviewItem;
  level: number;
  onCollapseExpand: () => void;
  onCheckedChange: () => void;
}
