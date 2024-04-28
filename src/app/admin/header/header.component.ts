import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

@Output() toggleSideBarButton: EventEmitter<any> = new EventEmitter()

  toggleSideBar(){
  this.toggleSideBarButton.emit();
  }

}
