import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { DishesListComponent } from './dishes-list/dishes-list.component';

import { DishesRoutingModule } from './dishes-routing.module';
import { DishCreateComponent } from './dish-create/dish-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DishesRoutingModule,
  ],
  declarations: [
      DishDetailsComponent,
      DishesListComponent,
      DishCreateComponent
    ]
})
export class DishesModule { }
