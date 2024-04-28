import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SettingsComponent } from './components/settings/settings.component';
import { InProgressComponent } from './components/in-progress/in-progress.component';
import { CompletedComponent } from './components/completed/completed.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'in-progress',
            component: InProgressComponent,
      },
      {
        path: 'completed',
            component: CompletedComponent,
      },
      {
        path: 'settings',
            component: SettingsComponent,
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
