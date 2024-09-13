import { Component, inject, signal, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { QRCodeModule } from 'angularx-qrcode';
import { Clipboard } from '@angular/cdk/clipboard';
import { TooltipModule } from 'primeng/tooltip';
import { LayoutDirectionServiceService } from '../services/layout-direction-service.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, ButtonModule, TagModule, QRCodeModule, TooltipModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  clipboard = inject(Clipboard);

  layoutDirectionServiceService = inject(LayoutDirectionServiceService);

  qrData = signal('hello');
  ticketLink = signal('www.tazkty.com/473847');
  ticketData: Signal<Date> = signal(new Date(2024, 9, 26));
  arabicMonths = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];
  createStringDate(): string {
    return `فعال حتي ${this.ticketData().getDate()} ${
      this.arabicMonths[this.ticketData().getMonth()]
    } ${this.ticketData().getFullYear()}`;
  }

  copyTicketLink() {
    this.clipboard.copy(this.ticketLink());
  }
}
