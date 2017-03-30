import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[chart-mouse-catcher]',
  templateUrl: './chart-mouse-catcher.component.html',
  styleUrls: ['./chart-mouse-catcher.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartMouseCatcherComponent {
  @Input() public dataset;
  constructor() { }
}
