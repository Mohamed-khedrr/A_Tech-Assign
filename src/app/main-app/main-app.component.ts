import { Component, inject, signal } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { TableComponent } from '../table/table.component';
import { CardComponent } from '../card/card.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { LayoutDirectionServiceService } from '../services/layout-direction-service.service';

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
  layoutDirectionServiceService = inject(LayoutDirectionServiceService);

  selectedCity: string = '';
  data = [
    { name: 'سنويا', code: 'year' },
    { name: 'شهريا', code: 'month' },
    { name: 'يوميا', code: 'day' },
  ];
}
