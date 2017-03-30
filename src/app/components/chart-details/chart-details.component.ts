import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'chart-details',
  templateUrl: './chart-details.component.html',
  styleUrls: ['./chart-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartDetailsComponent {
  @Input() public data;
  constructor() { }
}
