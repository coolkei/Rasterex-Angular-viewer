import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionComponent } from "./accordion.component";
import { AccordionItem } from "./directives/accordion-item.directive";
import { AccordionContent } from "./directives/accordion-content.directive";
import { AccordionHeader } from "./directives/accordion-header.directive";
import { AccordionToggleButtonComponent } from "./toggle-button/accordion-toggle-button.component";

@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItem,
    AccordionContent,
    AccordionHeader,
    AccordionToggleButtonComponent
  ],
  imports: [CommonModule],
  exports: [
    AccordionComponent,
    AccordionItem,
    AccordionContent,
    AccordionHeader,
    AccordionToggleButtonComponent
  ]
})
export class AccordionModule {}
