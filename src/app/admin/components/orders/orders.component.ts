import { Component } from '@angular/core';
import { Orders } from '../../../models/orders';
import { AdminService } from '../../services/admin.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  checked = false;

  deliveryFilter = '';

  orderList: Orders[] = [];
  filteredOrders: Orders[] = [];
  searchValue: any;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getOrderList();
    // this.deliveryFilter.valueChanges.subscribe((values) => {
    //   this.applyFilters(values);
    // });
  }

  getOrderList() {
    this.adminService.orders().subscribe((data) => {
      if (this.deliveryFilter) {
        let day: any = '';
        var today = new Date();
        if (this.deliveryFilter == 'sameDay') {
          day = today;
        } else if (this.deliveryFilter == 'nextDay') {
          day = new Date(today);
          day.setDate(today.getDate() + 1);
        } else if (this.deliveryFilter == 'nextWeek') {
          day = new Date(today);
          day.setDate(today.getDate() + 7);
        }
        this.orderList = data.filter(
          (item: any) =>
            item.delivery_date?.split('T')[0] === this.formatDate(day)
        );
      } else {
        this.orderList = data;
      }
    });
  }
  formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  applyFilters(selectedFilters: any) {
    this.deliveryFilter = selectedFilters;
    this.getOrderList();
  }

  search() {
    if (this.searchValue != '') {
      this.orderList = this.orderList?.filter((data: any) => {
        return data.person_name
          .toLocaleLowerCase()
          .match(this.searchValue?.toLocaleLowerCase());
      });
    } else if (this.searchValue == '') {
      this.getOrderList();
    }
  }
  // filterValue: any;

  // Filter() {
  //   if (this.filterValue != '') {
  //     this.orderList = this.orderList?.filter((data: any) => {
  //       return data.delivery_Day
  //         .toLocaleLowerCase()
  //         .match(this.filterValue?.toLocaleLowerCase());
  //     });
  //   } else if (this.filterValue == '') {
  //     this.getOrderList();
  //   }
  // }
}
