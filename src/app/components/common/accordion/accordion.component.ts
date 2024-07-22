import { trigger, state, style, transition, animate } from "@angular/animations";
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList
} from "@angular/core";
import { AccordionItem } from "./directives/accordion-item.directive";
import { memoize } from 'lodash-es';

@Component({
  selector: "rx-accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('contentExpansion', [
      state('expanded', style({height: '*', opacity: 1, visibility: 'visible'})),
      state('collapsed', style({height: '0px', opacity: 0, visibility: 'hidden'})),
      transition('expanded <=> collapsed',
        animate('200ms cubic-bezier(.37,1.04,.68,.98)')),
    ])
  ]
})
export class AccordionComponent implements  AfterContentInit {
  expanded = new Set<number>();
  @Input() expandAll = false;
  @Input() collapsing = true;
  @Input() isBottom = false;
  @ContentChildren(AccordionItem) items: QueryList<AccordionItem>;

  ngAfterContentInit() {
    if (this.expandAll) {
      this.items?.forEach((item, index) => this.expanded.add(index));
    }
  }

  getToggleState = memoize((index: number) => {
    return this.toggleState.bind(this, index);
  })

  toggleState = (index: number) => {
    if (this.expanded.has(index)) {
      this.expanded.delete(index);
    } else {
      if (this.collapsing) {
        this.expanded.clear();
      }
      this.expanded.add(index);
    }
  };

  isExpanded = (index: number): boolean => {
    return this.expanded.has(index);
  }
}
