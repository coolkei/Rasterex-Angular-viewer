import { ContentChild, Directive, Input } from "@angular/core";
import { AccordionContent } from "./accordion-content.directive";
import { AccordionHeader } from "./accordion-header.directive";

@Directive({
  selector: "rx-accordion-item"
})
export class AccordionItem {
  @Input() title = "";
  @Input() disabled = false;
  @ContentChild(AccordionContent) content: AccordionContent;
  @ContentChild(AccordionHeader) customHeader: AccordionHeader;
}
