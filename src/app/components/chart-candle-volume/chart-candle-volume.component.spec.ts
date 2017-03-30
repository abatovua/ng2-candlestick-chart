import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCandleVolumeComponent } from './chart-candle-volume.component';

describe('ChartCandleVolumeComponent', () => {
  let component: ChartCandleVolumeComponent;
  let fixture: ComponentFixture<ChartCandleVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCandleVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCandleVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
