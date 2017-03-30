import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnChanges,
  OnDestroy,
  AfterViewInit
} from '@angular/core';

import {
  trigger,
  keyframes,
  style,
  transition,
  animate
} from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/throttle';

export interface CandleChartColorSchema {
  candle: {
    upTrend: {
      regular: string;
      hover: string;
    },
    downTrend: {
      regular: string;
      hover: string;
    }
  };
}

@Component({
  selector: 'candle-chart',
  templateUrl: './candle-chart.component.html',
  styleUrls: [ './candle-chart.component.css' ],
  animations: [
    trigger('detailsState', [
      transition('void => *',
        animate(100, keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 1, offset: 1 })
        ]))
      ),
      transition('* => void', animate(100, style({ opacity: 0 })))
    ])
  ]
})
export class CandleChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() public data;
  @Input() public candlesSectionHeight;
  @Input() public volumeSectionHeight;
  @Input() public timelineSectionHeight;

  @ViewChild('container')
  public container: ElementRef;

  public scaleSubscription: Subscription;
  public mousePositionSubscription: Subscription;
  public resizeSubscription: Subscription;
  private isOverChart: boolean = false;

  public initialized: boolean = false;

  public chartWidth: number;
  public scale = 1;
  public scaleStep = 0.2;
  public minScale = 0.7;
  public maxScale = 3;
  public chartOuterPadding = 20;

  public candleWidth = 10;
  public candleGap = 5;

  public detailsTextFontSize = 15;
  public colorSchema: CandleChartColorSchema = {
    candle: {
      upTrend: {
        regular: 'rgba(76,175,80 ,1)',
        hover: 'rgba(46,125,50 ,1)'
      },
      downTrend: {
        regular: 'rgba(244,67,54 ,1)',
        hover: 'rgba(198,40,40 ,1)'
      }
    }
  };

  public visibleCandles: any[];
  public selected: any;

  constructor(
    public ref: ChangeDetectorRef
  ) {}

  public ngOnChanges() {}

  public ngAfterViewInit() {
    this.init();
    this.ref.detectChanges();
  }

  public ngOnDestroy() {
    this.scaleSubscription.unsubscribe();
    this.mousePositionSubscription.unsubscribe();
    this.resizeSubscription.unsubscribe();
  }

  public getViewBox() {
    return `0 0 ${this.chartWidth} ${this.candlesSectionHeight + this.volumeSectionHeight + this.timelineSectionHeight}`;
  }

  public getCurrentDataSet(componentWidth, scale) {
    const freeWidth = componentWidth - 2 * this.chartOuterPadding;
    const candlesSectionFreeHeight = this.candlesSectionHeight - 2 * this.chartOuterPadding;
    const volumeSectionFreeHeight = this.volumeSectionHeight - this.chartOuterPadding;

    const scaledCandleWidth = this.candleWidth * scale;
    const scaledCandleGap = this.candleGap * scale;

    const maxCandles = Math.ceil((freeWidth - scaledCandleGap) / (scaledCandleWidth + scaledCandleGap));

    const current = this.data.slice(4000, maxCandles + 4000);

    const boundaries = current.reduce((acc, el) => {
      acc.candles.min = !acc.candles.min ? el.low : Math.min(acc.candles.min, el.low);
      acc.candles.max = Math.max(acc.candles.max, el.high);
      acc.maxVolume = Math.max(acc.maxVolume, el.volume);
      return acc;
    }, { candles: { min: 0, max: 0 }, maxVolume: 0 });

    const currentCandleHeightProportion = candlesSectionFreeHeight / (boundaries.candles.max - boundaries.candles.min);
    const currentVolumeHeightProportion = volumeSectionFreeHeight / boundaries.maxVolume;

    return current.map((set, i) => {
      const { open, close, low, high, volume } = set;

      const upTrend = close > open;
      const priceDiff = Math.abs(close - open);

      const candleX = this.chartOuterPadding + (scaledCandleWidth + scaledCandleGap) * i;
      const candleY = (boundaries.candles.max - (upTrend ? close : open)) * currentCandleHeightProportion + this.chartOuterPadding;
      const candleWidth = scaledCandleWidth;
      const candleHeight = priceDiff ? priceDiff * currentCandleHeightProportion : 1;

      const linesX = candleX + (scaledCandleWidth / 2);
      const highY1 = (boundaries.candles.max - high) * currentCandleHeightProportion + this.chartOuterPadding;
      const lowY1 = candleY + candleHeight;
      const lowY2 = (boundaries.candles.max - low) * currentCandleHeightProportion + this.chartOuterPadding;

      const catcherHeight = this.candlesSectionHeight + this.volumeSectionHeight - this.chartOuterPadding;

      const medianVerticalX = candleX + scaledCandleWidth / 2;
      const medianVerticalY1 = 0;
      const medianVerticalY2 = this.candlesSectionHeight + this.volumeSectionHeight - this.chartOuterPadding;

      const medianHorizontalX1 = 0;
      const medianHorizontalX2 = componentWidth;
      const medianHorizontalY = candleY + candleHeight / 2;

      const histY = this.candlesSectionHeight + (boundaries.maxVolume - volume) * currentVolumeHeightProportion;
      const histHeight = volume * currentVolumeHeightProportion;

      return Object.assign({}, set,
        {
          candle: {
            upTrend,
            colors: upTrend ? this.colorSchema.candle.upTrend : this.colorSchema.candle.downTrend,
            rect: { x: candleX, y: candleY, width: scaledCandleWidth, height: candleHeight },
            low: { x1: linesX, x2: linesX, y1: lowY1, y2: lowY2 },
            high: { x1: linesX, x2: linesX, y1: highY1, y2: candleY }
          },
          catcher: { x: candleX, y: 0, width: scaledCandleWidth + scaledCandleGap, height: catcherHeight },
          median: {
            vertical: { x1: medianVerticalX, y1: medianVerticalY1, x2: medianVerticalX, y2: medianVerticalY2 },
            horizontal: { x1: medianHorizontalX1, y1: medianHorizontalY, x2: medianHorizontalX2, y2: medianHorizontalY }
          },
          hist: { x: candleX, y: histY, width: candleWidth, height: histHeight }
        }
      );
    });
  }

  public handleScale(delta: number) {
      const direction = delta > 0 ? 'down' : 'up';
      if (direction === 'down' && this.scale === this.minScale) return this.minScale;
      if (direction === 'up' && this.scale === this.maxScale) return this.maxScale;

      let newScale;

      switch (direction) {
        case 'up':
          newScale = parseFloat((this.scale + this.scaleStep).toFixed(5));
          return newScale >= this.maxScale ? this.maxScale : newScale;

        case 'down':
          newScale = parseFloat((this.scale - this.scaleStep).toFixed(5));
          return newScale <= this.minScale ? this.minScale : newScale;

        default:
          return this.scale;
      }
  }

  private init() {
    const chartWidth = this.container.nativeElement.clientWidth;
    const visibleCandles = this.getCurrentDataSet(chartWidth, this.scale);
    Object.assign(this, {
      chartWidth,
      scaleSubscription: this.setupScale(),
      mousePositionSubscription: this.setupMousePosition(),
      resizeSubscription: this.setupResize(),
      visibleCandles,
      selected: visibleCandles.length - 1,
      initialized: true
    });
  }

  private setupScale() {
    return Observable
      .fromEvent(document, 'wheel')
      .throttle(() => Observable.interval(0))
      .subscribe((e: MouseWheelEvent) => {
        if (this.isOverChart) {
          const scale = this.handleScale(e.deltaY);
          if(scale !== this.scale) {
            const visibleCandles = this.getCurrentDataSet(this.chartWidth, scale);
            Object.assign(this, {
              scale,
              visibleCandles,
              selected: visibleCandles.length - 1
            });
          }
        }
      });
  }

  private setupMousePosition() {
    return Observable
      .merge(
        Observable.fromEvent(this.container.nativeElement, 'mouseenter'),
        Observable.fromEvent(this.container.nativeElement, 'mouseleave')
      )
      .subscribe((e: MouseEvent) => {
        const { type } = e;
        const isOverChart = type === 'mouseenter';
        if (isOverChart) {
          this.isOverChart = isOverChart;
        } else {
          Object.assign(this, {
            isOverChart,
            selected: this.visibleCandles.length - 1
          });
        }
      });
  }

  private setupResize() {
    return Observable.fromEvent(window, 'resize')
      .subscribe((e: Event) => {
        const chartWidth = this.container.nativeElement.clientWidth;
        const visibleCandles = this.getCurrentDataSet(chartWidth, this.scale);
        Object.assign(this, {
          chartWidth,
          visibleCandles,
          selected: visibleCandles.length - 1
        });
      });
  }

  public select(index: number) {
    this.selected = index;
  }

  public currentSelected(index: number) {
    return this.selected === index;
  }

}
