import { Component } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { TableComponent } from '../table/table.component';
import { CardComponent } from '../card/card.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-app',
  standalone: true,
  imports: [
    ChartComponent,
    TableComponent,
    CardComponent,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './main-app.component.html',
  styleUrl: './main-app.component.scss',
})
export class MainAppComponent {
  selectedCity: any = { name: 'سنويا', code: 'year' };
  data = [
    { name: 'سنويا', code: 'year' },
    { name: 'شهريا', code: 'month' },
    { name: 'يوميا', code: 'day' },
  ];
}
