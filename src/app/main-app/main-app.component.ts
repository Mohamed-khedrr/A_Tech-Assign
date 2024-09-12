import { Component } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { TableComponent } from '../table/table.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-main-app',
  standalone: true,
  imports: [ChartComponent, TableComponent, CardComponent],
  templateUrl: './main-app.component.html',
  styleUrl: './main-app.component.scss',
})
export class MainAppComponent {}
