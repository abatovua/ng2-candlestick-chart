import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCandleComponent } from './chart-candle.component';

describe('ChartCandleComponent', () => {
  let component: ChartCandleComponent;
  let fixture: ComponentFixture<ChartCandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
