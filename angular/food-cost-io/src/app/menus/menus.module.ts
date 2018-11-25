import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import { MenusListComponent } from './menus-list/menus-list.component';
import { MenuDetailsComponent } from './menu-details/menu-details.component';

@NgModule({
  imports: [
    CommonModule,
    MenusRoutingModule
  ],
  declarations: [MenusListComponent, MenuDetailsComponent]
})
export class MenusModule { }
