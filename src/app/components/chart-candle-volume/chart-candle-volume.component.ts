import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: '[chart-candle-volume]',
  templateUrl: './chart-candle-volume.component.html',
  styleUrls: ['./chart-candle-volume.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCandleVolumeComponent {
  @Input() public dataset: any;
  constructor() { }
}
