import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle-btn',
  standalone: true,
  imports: [],
  templateUrl: './toggle-btn.component.html',
  styleUrl: './toggle-btn.component.scss',
})
export class ToggleBtnComponent {
  isActive: boolean = true;
  toggle(e: any) {
    this.isActive = !this.isActive;
  }
}
