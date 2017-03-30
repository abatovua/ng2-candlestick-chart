import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  private dataUrl = 'http://localhost:3000/data';
  public historicalData: any[];

  constructor(private http: Http) {}

  public ngOnInit() {
    this.http.get(this.dataUrl)
      .map(res => res.json())
      .subscribe(data => {
        this.historicalData = data;
      });
  }
}