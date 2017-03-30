import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { CandleChartComponent } from './components/candle-chart/candle-chart.component';
import { ChartMediansComponent } from './components/chart-medians/chart-medians.component';
import { ChartMouseCatcherComponent } from './components/chart-mouse-catcher/chart-mouse-catcher.component';
import { ChartCandleComponent } from './components/chart-candle/chart-candle.component';
import { ChartCandleVolumeComponent } from './components/chart-candle-volume/chart-candle-volume.component';
import { ChartDetailsComponent } from './components/chart-details/chart-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CandleChartComponent,
    ChartMediansComponent,
    ChartMouseCatcherComponent,
    ChartCandleComponent,
    ChartCandleVolumeComponent,
    ChartDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }