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
  //filteredOrders: Orders[] = [];
  searchValue: any;
  text = 'Day of';
  sameDayOrdersCount = 0;
  nextDayOrdersCount = 0;
  nextWeekOrdersCount = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getOrderList();
  }

  
  getOrderList() {
    this.adminService.orders().subscribe((data) => {
      let filteredOrdersCount = 0;
      let sameDayCount = 0;
      let nextDayCount = 0;
      let nextWeekCount = 0;
      if (this.deliveryFilter) {
        let day: any = '';
        var today = new Date();
        if (this.deliveryFilter == 'sameDay') {
          day = today;
          this.text = 'Same Day';
        } else if (this.deliveryFilter == 'nextDay') {
          day = new Date(today);
          this.text = 'Next Day';
          day.setDate(today.getDate() + 1);
        } else if (this.deliveryFilter == 'nextWeek') {
          day = new Date(today);
          day.setDate(today.getDate() + 7);
          this.text = 'Next Week';
        }
        this.orderList = data.filter(
          (item: any) => {
            if (item.delivery_date?.split('T')[0] === this.formatDate(day)) {
              filteredOrdersCount++; 
              if (this.deliveryFilter == 'sameDay') {
                sameDayCount++;
              } else if (this.deliveryFilter == 'nextDay') {
                nextDayCount++;
              } else if (this.deliveryFilter == 'nextWeek') {
                nextWeekCount++;
              }
              return true;
          
            } else {
              return false;
            }
           
          }
        );
        this.sameDayOrdersCount = sameDayCount;
        this.nextDayOrdersCount = nextDayCount;
        this.nextWeekOrdersCount = nextWeekCount;
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


    // setTimeout(() => {
    //   window.location.reload();
    // }, 6000);
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
}
