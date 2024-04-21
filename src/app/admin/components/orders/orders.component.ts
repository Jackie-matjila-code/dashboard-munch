import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  checked = false;
  color!: 'primary';
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
}
