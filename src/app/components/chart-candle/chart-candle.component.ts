import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[chart-candle]',
  templateUrl: './chart-candle.component.html',
  styleUrls: ['./chart-candle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCandleComponent {
  @Input() public dataset: any;
  @Input() public selected: boolean;
  constructor() { }

}
