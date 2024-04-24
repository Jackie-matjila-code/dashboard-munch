import { Menu } from '../../models/menu';
import { AdminService } from './../services/admin.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  menu!: Menu | any;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    this.adminService.sideMenu().subscribe((data) => {
      this.menu = data;
      console.log(this.menu);
    });
  }
}
