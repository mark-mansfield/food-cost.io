import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { MenusListComponent } from './menus-list/menus-list.component';
import { MenuDetailsComponent } from './menu-details/menu-details.component';
const routes: Routes = [
  {
    path: 'list',
    component: MenusListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'details',
    component: MenuDetailsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule {}
