import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTE } from '../../models/constants';
import { Observable } from 'rxjs';
import { Menu } from '../../models/menu';
import { Orders } from '../../models/orders';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  sideMenu(): Observable<Menu> {
    let url: string = `${API_ROUTE.MENU}`;
    return this.http.get<Menu>(url);
  }

  orders(): Observable<Orders[]> {
    let url: string = `${API_ROUTE.ORDERS}`;
    return this.http.get<Orders[]>(url);
  }
}
