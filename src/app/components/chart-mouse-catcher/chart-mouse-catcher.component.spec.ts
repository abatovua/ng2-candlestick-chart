import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMouseCatcherComponent } from './chart-mouse-catcher.component';

describe('ChartMouseCatcherComponent', () => {
  let component: ChartMouseCatcherComponent;
  let fixture: ComponentFixture<ChartMouseCatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartMouseCatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartMouseCatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
