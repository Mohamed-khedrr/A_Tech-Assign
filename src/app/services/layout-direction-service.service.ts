import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutDirectionServiceService {
  isRTL = signal(false);

  toggleDirection() {
    this.isRTL.set(!this.isRTL());
  }
}
