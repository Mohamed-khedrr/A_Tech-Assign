import { Component, inject, ViewChild } from '@angular/core';
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
import { TooltipModule } from 'primeng/tooltip';
import { StrLengthHandlerPipe } from './str-length-handler.pipe';
import { FileSaverModule, FileSaverService } from 'ngx-filesaver';

interface Product {
  user: string;
  userAvatar: string;
  ticketNumber: string;
  ticketPrice: number;
  cinemaName: string;
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
    TooltipModule,
    StrLengthHandlerPipe,
    FileSaverModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @ViewChild('dt1') dt1!: Table;

  fileSaver = inject(FileSaverService);

  searchValue: string = '';
  isRTL: boolean = true;

  getToolTipTxt(mainStr: string, originalStr: string): string {
    if (mainStr.endsWith(' ...')) {
      mainStr = mainStr.slice(0, mainStr.lastIndexOf('  ...'));
    }
    if (originalStr.length > mainStr.length) {
      const compareChars = mainStr.slice(-10);
      const startIndex = originalStr.indexOf(compareChars);
      if (startIndex !== -1) {
        return originalStr.substring(startIndex + 11);
      }
    }
    return '';
  }

  saveFile() {
    const fileContent = 'This is the content of the file.';
    const fileName = 'example.txt';
    const fileType = 'text/plain';

    const blob = new Blob([fileContent], { type: fileType });

    this.fileSaver.save(blob, fileName);
  }

  products: Product[] = [
    {
      user: 'احمد محمود',
      mobileNumber: '0101111111',
      userAvatar:
        'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      ticketNumber: 'C-101',
      ticketPrice: 40,
      cinemaName: 'سينما مصر, مول العرب, برج الظافرة, سيرايا القبة',
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
      cinemaName: 'محمد خضر ,سينما مصر, مول العرب, برج الظافرة, سيرايا القبة',
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
