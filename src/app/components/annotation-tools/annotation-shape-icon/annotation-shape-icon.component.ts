import { Component, Input } from '@angular/core';
import { MARKUP_TYPES } from 'src/rxcore/constants';

@Component({
  selector: 'rx-annotation-shape-icon',
  templateUrl: './annotation-shape-icon.component.html',
  styleUrls: ['./annotation-shape-icon.component.scss']
})
export class AnnotationShapeIconComponent {
  markerType = MARKUP_TYPES;
  @Input() type: number; 
  @Input() subtype: number; 
}
