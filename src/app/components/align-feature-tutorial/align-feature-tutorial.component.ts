import { Component, OnInit } from '@angular/core';
import { AlignFeatureTutorialService } from './align-feature-tutorial.service';

@Component({
  selector: 'app-align-feature-tutorial',
  templateUrl: './align-feature-tutorial.component.html',
  styleUrls: ['./align-feature-tutorial.component.scss']
})
export class AlignFeatureTutorialComponent implements OnInit {
  step: number = 1;
  visible: boolean = false;
  window = window;
  top = top;

  constructor(private readonly service: AlignFeatureTutorialService) {}

  ngOnInit(): void {
      this.service.visible$.subscribe((value) => {
        this.step = 1;
        this.visible = value;
      });
  }

  onButtonClick(): void {
    if (this.step == 3) {
      this.visible = false;
      this.step = 1;
    } else {
      this.step = (this.step % 3) + 1;
    }
  }
}
