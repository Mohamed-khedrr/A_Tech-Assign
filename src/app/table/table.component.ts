import { LayoutDirectionServiceService } from './../services/layout-direction-service.service';
import {
  Component,
  ComponentFactoryResolver,
  inject,
  Injector,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
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
import { CardComponent } from '../card/card.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  componentFactoryResolver = inject(ComponentFactoryResolver);
  injector = inject(Injector);
  viewContainerRef = inject(ViewContainerRef);
  fileSaverService = inject(FileSaverService);
  layoutDirectionServiceService = inject(LayoutDirectionServiceService);

  searchValue: string = '';

  getToolTipTxt(mainStr: string, originalStr: string): string {
    if (mainStr.endsWith('...')) {
      mainStr = mainStr.slice(0, mainStr.indexOf('  ...') - 3);
      if (originalStr.length > mainStr.length) {
        const compareChars = mainStr.slice(-10);
        const startIndex = originalStr.indexOf(compareChars);
        if (startIndex !== -1) {
          return originalStr.substring(startIndex + 11);
        }
      }
    }
    return '';
  }

  async saveCardAsPdf() {
    // Create and render the card component
    const cardFactory =
      this.componentFactoryResolver.resolveComponentFactory(CardComponent);
    const cardComponentRef = this.viewContainerRef.createComponent(cardFactory);

    // Wait for the component to render
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Get the rendered HTML element
    const element = cardComponentRef.location.nativeElement;

    // Use html2canvas to capture the rendered component
    const canvas = await html2canvas(element);

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Add the canvas as an image to the PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 70);

    // Generate the PDF as a Blob
    const pdfBlob = pdf.output('blob');

    // Save the PDF using FileSaverService
    this.fileSaverService.save(pdfBlob, 'card-component.pdf');

    // Clean up: remove the temporary component
    this.viewContainerRef.clear();
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dt1.filterGlobal(value, 'contains');
  }

  products: Product[] = [
    {
      user: 'احمد محمود',
      mobileNumber: '0101111111',
      userAvatar:
        'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      ticketNumber: 'C-101',
      ticketPrice: 40,
      cinemaName: 'سينما مصر, مول العرب, برج الظافرة, سرايا القبة',
      peopleCount: 1,
      purchaseCount: 'مرة واحدة',
    },
    {
      user: 'محمد الغريب',
      mobileNumber: '0102222222',
      userAvatar:
        'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      ticketNumber: 'C-102',
      ticketPrice: 30,
      cinemaName: 'محمد خضر ,سينما مصر, مول العرب, برج الظافرة, سرايا القبة',
      peopleCount: 1,
      purchaseCount: 'مرة واحدة',
    },
    {
      user: 'خالد منصور',
      mobileNumber: '0103333333',
      userAvatar:
        'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      ticketNumber: 'C-103',
      ticketPrice: 50,
      cinemaName: 'سينما جراند, كايرو فيستيفال, مول الحسن, وسط البلد',
      peopleCount: 2,
      purchaseCount: 'مرتين',
    },
    {
      user: 'محمود علي',
      mobileNumber: '0104444444',
      userAvatar:
        'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      ticketNumber: 'C-104',
      ticketPrice: 45,
      cinemaName: 'سينما ريفولي, مدينة نصر, مول السلام, القاهرة',
      peopleCount: 3,
      purchaseCount: 'ثلاث مرات',
    },
    {
      user: 'عمرو حسن',
      mobileNumber: '0105555555',
      userAvatar:
        'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      ticketNumber: 'C-105',
      ticketPrice: 35,
      cinemaName: 'سينما كايرو, مول الاسكندرية, حي مصر الجديدة',
      peopleCount: 1,
      purchaseCount: 'مرة واحدة',
    },
    {
      user: 'علي سعيد',
      mobileNumber: '0106666666',
      userAvatar:
        'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      ticketNumber: 'C-106',
      ticketPrice: 60,
      cinemaName: 'سينما السلام, حي المعادي, مول الجيزة, القاهرة',
      peopleCount: 4,
      purchaseCount: 'أربع مرات',
    },
    {
      user: 'ياسر فهمي',
      mobileNumber: '0107777777',
      userAvatar:
        'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      ticketNumber: 'C-107',
      ticketPrice: 55,
      cinemaName: 'سينما الزمالك, مول الزهراء, الحي الخامس, الجيزة',
      peopleCount: 2,
      purchaseCount: 'مرتين',
    },
  ];
}
