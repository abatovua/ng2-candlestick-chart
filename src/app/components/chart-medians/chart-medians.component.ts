import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[chart-medians]',
  templateUrl: './chart-medians.component.html',
  styleUrls: ['./chart-medians.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartMediansComponent {
  @Input() public dataset;
  constructor() {}
}
