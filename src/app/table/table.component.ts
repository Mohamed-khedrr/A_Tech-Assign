import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToggleBtnComponent } from '../layout/toggle-btn/toggle-btn.component';

interface Product {
  user: string;
  userAvatar: string;
  ticketNumber: string;
  ticketPrice: number;
  activities: string[];
  peopleCount: number;
  purchaseCount: string;
  mobileNumber: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    AvatarModule,
    ChipModule,
    ToggleButtonModule,
    IconFieldModule,
    InputIconModule,
    ToggleBtnComponent,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @ViewChild('dt1') dt1!: Table;
  searchValue: string = '';
  isRTL: boolean = true;

  products: Product[] = [
    {
      user: 'احمد محمود',
      mobileNumber: '0101111111',
      userAvatar:
        'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      ticketNumber: 'C-101',
      ticketPrice: 40,
      activities: ['سينما مصر, مول العرب, برج الظافرة, سيرايا القبة'],
      peopleCount: 1,
      purchaseCount: 'مرة واحدة',
    },
    {
      user: 'محمد الغريب',
      mobileNumber: '0101111111',
      userAvatar:
        'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      ticketNumber: 'C-102',
      ticketPrice: 30,
      activities: ['سينما مصر, مول العرب, برج الظافرة, سيرايا القبة'],
      peopleCount: 1,
      purchaseCount: 'مرة واحدة',
    },
  ];

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dt1.filterGlobal(value, 'contains');
  }
  toggleDirection() {
    this.isRTL = !this.isRTL;
  }
}
